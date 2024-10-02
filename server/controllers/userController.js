const User = require('../database/schemas/userSchema');
const userCredentials = require('../database/schemas/userCredentialsSchema');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

require('dotenv').config();

// These should be role based: [ Admin ]

const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(res.user);
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

const deleteUsers = (getUser, async (req, res) => {
  let user;
  try {
    user = await User.deleteOne({ _id: res.user.id }).select('-password');
    res.status(200).json('Deleted the user');
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

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

const findMe = async (req, res) => {
  try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

const getClientId = async (req, res) => {
  const id = req.user._id;

  try {
    const client_key = generateClientKey();
    const userCreds = await userCredentials.findOneAndUpdate(
      { user: id },
      { client_key: client_key},
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Client ID is created' });
  } catch (error) {
    res.status(400).json({ message: err.message });
  };
};

const getClientSecret = async (req, res) => {
  const id = req.user._id;

  try {
    const client_secret = generateClientSecret(req.user);
    const userSecret = await userCredentials.findOneAndUpdate(
      { user: id },
      { client_secret: client_secret},
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Client Secret is created' });
  } catch (error) {
    res.status(400).json({ message: err.message });
  };
};

function generateClientKey() {
  return crypto.randomBytes(16).toString('hex'); // Generates a 30-character ID
};

// Function to generate a client secret
function generateClientSecret() {
  return crypto.randomBytes(16).toString('hex'); // Generates a 30-character secret
};

async function getUser(req, res, next) {
  let found_user;
  try {
    found_user = await User.findOne({ _id: req.params.id }).select('-password');
    if (found_user == null) {
      return res.status(404).json({ message: 'Cannot find the user' });
    };
  } catch (err) {
    return res.status(500).json({ message: err.message });
  };

  res.user = found_user;
  next();
};

async function getUserCredentials(req, res) {
  let found_user;
  try {
    found_user = await userCredentials.findOne({ user: req.user._id });
    if (found_user == null) {
      return res.status(404).json({ message: 'Cannot find the user' });
    };
    return res.status(200).json(found_user)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  };
};

module.exports = { 
  getUserProfile,
  getUsers,
  deleteUsers,
  editUser,
  createUser,
  getClientId,
  getClientSecret,
  findMe,
  getUser,
  getUserCredentials
};
