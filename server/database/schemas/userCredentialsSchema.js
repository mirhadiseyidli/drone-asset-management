const mongoose = require('mongoose');

const userCredentialsSchema = new mongoose.Schema({
  client_key: {
    type: String,
    required: false,
  },
  client_secret: {
    type: String,
    required: false,
  },
  user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
  }
});
  
  module.exports = mongoose.model('userCredentials', userCredentialsSchema);