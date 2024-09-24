const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member',
  },
  google_id: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
