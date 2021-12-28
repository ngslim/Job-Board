const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  salary: { type: Number, default: '' },
  category: { type: String, default: '' },
  location: { type: String, default: '' },
  address: { type: String, default: '' },
  type: { type: String, default: '' },
  posted_by: { type: String, default: '' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', Job);
