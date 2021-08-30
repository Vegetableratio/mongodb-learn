const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const queue = require('async').queue;
const writePath = path.resolve(__dirname, '../dist');
const dbData = require('../db/resource.json');
const { abort } = require('process');
const length = dbData.length; // 17517
const tasks = [];

const main = async () => {
  console.log(`共${length}个任务`);
  if (!fs.existsSync(writePath)) {
    await fsPromises.mkdir(writePath);
  } else {
    deleteFile(writePath);
  }
  dbData.forEach((dataItem, index) => {
    q.push({ data: JSON.stringify(dataItem), fileName: path.resolve(writePath, `./${index}.json`) }, err => {
      console.log('err=', err);
    });
  });
};
// const createFile = ({ data, fileName }) => {
//   return fsPromises.writeFile(fileName, data, { encoding: 'utf-8' });
// };
const deleteFile = path => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFile(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
};
const q = queue(({ fileName, data }, cb) => {
  fsPromises.writeFile(fileName, data, { encoding: 'utf-8' });
  cb();
}, 10);

length ? main() : null;
