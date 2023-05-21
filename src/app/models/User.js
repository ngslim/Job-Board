const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  lastname: { type: String, default: '' },
  firstname: { type: String, default: '' },
  dob: { type: String, default: '' },
  address: { type: String, default: '' },
  school: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);
