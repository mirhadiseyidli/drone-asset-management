const mongoose = require('mongoose');

const userCredentialsSchema = new mongoose.Schema({
    client_id: {
      type: String,
      required: true,
      unique: true,
    },
    client_secret: {
      type: String,
      required: true,
      unique: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
  });
  
  module.exports = mongoose.model('userCredentials', userCredentialsSchema);