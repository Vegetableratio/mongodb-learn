// schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resourceSchema = new Schema({
  _id: ObjectId,
  id: Number,
  url: String,
  name: String,
  expire: Number,
  expire_cst: String,
  data: Schema.Types.Mixed,
});

const Blog = mongoose.model('Blog', blogSchema);
