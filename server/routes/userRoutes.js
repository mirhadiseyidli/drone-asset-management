const express = require('express');
const { getUserProfile, getUsers, deleteUsers, editUser, createUser, getClientId, getClientSecret, findMe, getUser } = require('../controllers/userController');
const { authMiddleware, checkRole } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, checkRole(["admin", "member"]), findMe);
router.get('/', authMiddleware, checkRole(["admin", "member"]), getUsers);
router.get('/:id', authMiddleware, checkRole(["admin", "member"]), getUser, getUserProfile);
router.delete('/:id', authMiddleware, checkRole(["admin", "member"]), getUser, deleteUsers);
router.get('/:id', authMiddleware, checkRole(["admin"]), editUser);
router.post('/', authMiddleware, checkRole(["admin"]), createUser);
router.get('/api-tokens', authMiddleware, checkRole(["admin"]), getClientId);
router.get('/api-tokens', authMiddleware, checkRole(["admin"]), getClientSecret);

module.exports = router;
