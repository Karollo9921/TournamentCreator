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
  },
  password: {
    type: String,
    required: true
  },
  dateOfJoin: {
    type: String,
    default: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
            + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
  },  
  createdTournaments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
      }
    ]
});

module.exports = mongoose.model('User', userSchema);