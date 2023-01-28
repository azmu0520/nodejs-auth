const mongoose = require('mongoose');
// id, name, e-mail, last login time, registration time, status (active/blocked)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  login_time: {
    type: Date,
    default: Date.now,
  },
  registration_time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', userSchema);
