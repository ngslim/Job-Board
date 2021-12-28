const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, default: 'Không xác định' },
  password: { type: String, default: 'Không xác định' },
  lastname: { type: String, default: 'Không xác định' },
  firstname: { type: String, default: 'Không xác định' },
  dob: { type: String, default: 'Không xác định' },
  address: { type: String, default: 'Không xác định' },
  school: { type: String, default: 'Không xác định' },
  phone: { type: String, default: 'Không xác định' },
  email: { type: String, default: 'Không xác định' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);
