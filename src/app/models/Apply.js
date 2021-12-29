const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Apply = new Schema({
  job_id: { type: String, default: '' },
  job_owner: { type: String, default: '' },
  username: { type: String, default: '' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Apply', Apply);
