const result = require('../db/resource.json');
const length = result.length;
let arr = [];
result.forEach(item => {
  if (item.name.indexOf('推定有罪') !== -1) arr.push(item);
});
console.log(JSON.stringify(arr)); // 17517
