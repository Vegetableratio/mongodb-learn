const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/yyets';
const options = {
  keepAlice: 120,
  // useNewUrlParser: true,
};
mongoose
  .connect(url, options)
  .then(() => {
    console.log('连接成功');
  })
  .catch(err => console.err('连接失败', err));

const Schema = mongoose.Schema;
const resourceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: Number,
  url: String,
  name: String,
  expire: Number,
  expire_cst: String,
  data: Schema.Types.Mixed,
});
const ResourceModel = mongoose.model('resource', resourceSchema);

// function save() {
//   const blog = {
//     _id: 132,
//     id: 22,
//     url: 'baidu.com',
//     name: '小王',
//     expire: 2021,
//     expire_cst: '2021',
//     data: '123',
//   };
//   ResourceModel.create([blog]).then(userDoc => {
//     console.log('保存成功', userDoc);
//   });
// }
// save();
ResourceModel.findOne({ "url": "http://www.rrys2020.com/resource/10004" }, (err, userDoc) => {
  if (err) {
    console.log('查询错误', err);
  } else {
    console.log('userDoc=', userDoc);
  }
});
