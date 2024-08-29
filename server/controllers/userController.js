const User = require('../database/schemas/userSchema');
const userCredentials = require('../database/schemas/userCredentialsSchema')

const crypto = require('crypto');

// These should be role based: [ Admin ]

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUsers = async (req, res) => {
  let user;
  try {
    user = await User.findByIdAndDelete({ _id: user._id }).select('-password');
    res.status(200).json('Deleted the user: ' + user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id }, 
      { $set: updateFields }, 
      { new: true } 
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    };

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  };
};

const createUser = async (req, res) => {
  try {
    const { userData } = req.params;

    const user = await User.create(userData);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  };
};

const getClientId = async (req, res) => {
  const { id } = req.params;

  try {
    const client_id = generateClientId();
    const userCreds = userCredentials.findOneAndUpdate(
      { user: id },
      { client_id: client_id},
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Client ID is created' });
  } catch (error) {
    res.status(400).json({ message: err.message });
  };
};

const getClientSecret = async (req, res) => {
  const { id } = req.params;

  try {
    const client_secret = generateClientSecret(req.user);
    const userSecret = userCredentials.findOneAndUpdate(
      { user: id },
      { client_secret: client_secret},
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Client Secret is created' });
  } catch (error) {
    res.status(400).json({ message: err.message });
  };
};

function generateClientId() {
  return crypto.randomBytes(16).toString('hex'); // Generates a 30-character ID
};

// Function to generate a client secret
function generateClientSecret(user) {
  return jwt.sign(user, process.env.JWT_CLIENT_SECRET, { expiresIn: null }); // Generates a 30-character secret
};

module.exports = { 
  getUserProfile,
  getUsers,
  deleteUsers,
  editUser,
  createUser,
  getClientId,
  getClientSecret
};
