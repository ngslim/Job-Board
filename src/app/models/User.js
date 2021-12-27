const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, default: 'NAN' },
  password: { type: String, default: 'NAN' },
  email: { type: String, default: 'NAN' },
});

module.exports = mongoose.model('User', User);
