const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const dbPath = path.resolve(__dirname, '../db_data/resource.json');
const writePath = path.resolve(__dirname, '../dist');

/**
 * 1.读取JSON文件
 * 2.创建写入路径目录
 * 3.创建文件写入单个JSON
 */
readfileByStream(dbPath);
function readfileByStream(dbPath) {
  let index = 0;
  const result = fs.createReadStream(dbPath, { encoding: 'utf-8' });
  result.on('close', () => {
    console.log('ReadfileByStream close');
  });
  // result.on('data', chunk => {
  //   console.log(`ReadfileByStream received ${chunk.length} bytes of data.`);
  // });
  result.on('end', () => {
    console.log('ReadfileByStream end.');
  });
  result.on('error', err => {
    console.log('ReadfileByStream error:', err);
  });
  result.on('readable', () => {
    const data = result.read();
    const p = path.resolve(writePath, `./${index}.json`);
    index += 1;
    data &&
      fsPromises
        .writeFile(p, data, { encoding: 'utf-8' })
        .then(() => {
          console.log(`写入成功==${index}==`);
        })
        .catch(err => {
          console.log('写入失败', err);
        });
  });
}

// async function clearDir(path) {
//   try {
//   } catch (error) {
//     const files = await fsPromise.readdir(path, { encoding: 'utf-8' });
//   }
// }
// (err, files) => {
//   if (err) {
//     console.log('读取失败', err);
//   } else {
//     fs.unlinkSync(writePath);
//   }
// };
// async function readDB(path) {
//   try {
//     return await fsPromise.readFile(path, { encoding: 'UTF-8' });
//   } catch (err) {
//     console.log('失败', err);
//   }
// }
// const result = readDB(dbPath);
