const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const dbPath = path.resolve(__dirname, './db_data/resource.json');
const writePath = path.resolve(__dirname, './dist');
async function clearDir(path) {
  try {
    
  } catch (error) {
    
    const files = await fsPromise.readdir(path, { encoding: 'utf-8' });
  }
}
(err, files) => {
  if (err) {
    console.log('读取失败', err);
  } else {
    fs.unlinkSync(writePath);
  }
};
// async function readDB(path) {
//   try {
//     return await fsPromise.readFile(path, { encoding: 'UTF-8' });
//   } catch (err) {
//     console.log('失败', err);
//   }
// }
// const result = readDB(dbPath);

function readfileByStream(path) {
  const result = fs.createReadStream(path, { encoding: 'utf-8' });
  result.on('close', () => {
    console.log('close');
  });
  result.on('data', chunk => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });
  result.on('end', () => {
    console.log('There will be no more data.');
  });
  result.on('readable', () => {
    // console.log(`readable: ${result.read()}`);
    fs.writeFile(Date.now, result.read(), 'utf-8', err => {
      console.log('写入失败', err);
    });
  });
}
// readfileByStream(dbPath);
