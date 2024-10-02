const express = require('express');
const { getUserProfile, getUsers, deleteUsers, editUser, createUser, getClientId, getClientSecret, findMe, getUser, getUserCredentials } = require('../controllers/userController');
const { authMiddleware, checkRole } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/api-tokens/client-key', authMiddleware, checkRole(["admin", "member"]), getClientId);
router.get('/api-tokens/client-secret', authMiddleware, checkRole(["admin", "member"]), getClientSecret);
router.get('/user-credentials', authMiddleware, checkRole(["admin", "member"]), getUserCredentials);
router.get('/me', authMiddleware, checkRole(["admin", "member"]), findMe);
router.get('/', authMiddleware, checkRole(["admin", "member"]), getUsers);
router.post('/', authMiddleware, checkRole(["admin"]), createUser);
router.get('/:id', authMiddleware, checkRole(["admin", "member"]), getUser, getUserProfile);
router.delete('/:id', authMiddleware, checkRole(["admin", "member"]), getUser, deleteUsers);
router.get('/:id', authMiddleware, checkRole(["admin"]), editUser);

module.exports = router;
