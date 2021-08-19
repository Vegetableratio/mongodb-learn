const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';
const options = {
  keepAlice: 120,
};
mongoose
  .connect(url, options)
  .then(() => {})
  .catch(err => {
    console.err(err);
  });
