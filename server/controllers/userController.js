const User = require('../database/schemas/userSchema');

// These should be role based: [ Admin ]

const getUserProfile = async (req, res) => {
  try {
    console.log(req.user.email);
    const user = await User.findOne({ email: req.user.email }).select('-password');
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUsers = async (req, res) => {
  let user;
  try {
    console.log(req.params.id)
    user = await User.findOne({ _id: req.params.id });
    console.log(user)
    await User.deleteOne({ _id: user._id });
    res.status(200).json('Deleted the user: ' + user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// More actions here

module.exports = { getUserProfile, getUsers, deleteUsers };
