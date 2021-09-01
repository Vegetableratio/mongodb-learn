const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const async = require('async');
const writePath = path.resolve(__dirname, '../dist');
const dbData = require('../db/resource.json');
const length = dbData.length; // 17517
const errArry = []; // 错误日志

const main = async () => {
  deleteFile(writePath);
  if (!fs.existsSync(writePath)) {
    await fsPromises.mkdir(writePath);
  }
  console.log(`共${length}个任务`);
  console.log(`Did the queue start ? ${queue.started}`);
  const l = dbData.map(dataItem => {
    return handleData(dataItem);
  });
  _writeFile(path.resolve(__dirname, `../log/l.json`), JSON.stringify(l, null, 2));
  // dbData.forEach((dataItem, index) => {
  //   const { cnname, enname } = dataItem.data.data.info;
  //   /**
  //    * windows路径保留符号
  //     <（小于）
  //     >（大于）
  //     ： (冒号)
  //     "（双引号）
  //     /（正斜杠）
  //     \ (反斜杠)
  //     | (竖线或管道)
  //     ? （问号）
  //     * (星号)
  //    */
  //   const name = `${index + 1}：${cnname}_${enname}`.replace(/[\<\>\:\"\/\\\|\?\*\t\n\r]/g, '');
  //   const task = {
  //     data: JSON.stringify(dataItem, null, 2),
  //     fileName: path.resolve(writePath, `./${name}.json`),
  //     name,
  //     index,
  //   };
  //   queue.push(task, (error, { task, remaining }) => {
  //     if (error) {
  //       console.log(`An error occurred while processing task ${task.index}`, error);
  //       error.name = task.name;
  //       errArry.push(error);
  //     }
  //   });
  // });
  console.log(`Did the queue start ? ${queue.started}`);
};

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
    fs.rmdirSync(path);
  }
};

const queue = async.queue((task, completed) => {
  const { fileName, data } = task;
  _writeFile(fileName, data)
    .then(() => {
      const remaining = queue.length();
      completed(null, { task, remaining });
    })
    .catch(error => {
      const remaining = queue.length();
      completed(error, { task, remaining });
    });
}, 1);

queue.drain(() => {
  console.log('Successfully processed all items');
  _writeFile(path.resolve(__dirname, `../log/error.json`), JSON.stringify(errArry))
    .then(() => {
      console.log('write errFile sucess');
    })
    .catch(err => {
      console.log('write errFile error', err);
    });
});

const _writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fsPromises
      .writeFile(path, data, { encoding: 'utf-8' })
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const nameList = dbData.map((dataItem, index) => {
  const { cnname, enname } = dataItem.data.data.info;
  return `${index + 1}：${cnname}_${enname}`;
});
_writeFile(path.resolve(__dirname, `../log/nameList.json`), JSON.stringify(nameList))
  .then(res => {
    console.log('sucess');
  })
  .catch(error => {
    console.log('error', error);
  });
// 数据处理
const handleData = dataItem => {
  const {
    data: {
      data: { info, list },
    },
  } = dataItem;
  const newList = list.map(listItem => {
    const { season_cn, items, formats } = listItem;
    const newList = [];
    formats.forEach(format => {
      if (format !== `APP`) {
        const fileCollect = {};
        items[format].forEach(detail => {
          detail.files &&
            detail.files.forEach(file => {
              fileCollect[format] ? null : (fileCollect[format] = {});
              fileCollect[format][file.way_cn]
                ? fileCollect[format][file.way_cn].push(file.address)
                : (fileCollect[format][file.way_cn] = []);
            });
        });
        newList.push(fileCollect);
      }
    });

    const newItem = { season_cn, downLoadLink: newList };
    return newItem;
  });
  const data = { info, newList };
  return data;
};
length ? main() : null;
