const express = require('express');
const { getUserProfile, getUsers, deleteUsers } = require('../controllers/userController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
// router.get('/', getUsers);   this was a test for middleware, will remove
router.get('/:email', authMiddleware, getUserProfile);
router.delete('/:id', authMiddleware, deleteUsers);

module.exports = router;
