const express = require('express');
const { getUserProfile, getUsers, deleteUsers } = require('../controllers/userController');
const { authMiddleware, checkRole } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, checkRole(["admin", "member"]), getUsers);
// router.get('/', getUsers);   this was a test for middleware, will remove
router.get('/:email', authMiddleware, checkRole(["admin", "member"]), getUserProfile);
router.delete('/:id', authMiddleware, checkRole(["admin"]), deleteUsers);

module.exports = router;
