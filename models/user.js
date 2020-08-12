const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('User', userSchema);