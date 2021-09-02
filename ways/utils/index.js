const fsPromises = require('fs/promises')
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

module.exports = {
  writeFile: _writeFile,
};
