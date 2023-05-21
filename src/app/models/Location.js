const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
  name: { type: String, default: '' },
});

module.exports = mongoose.model('Location', Location);
