const express = require('express');
const { getUserProfile, getUsers, deleteUsers, editUser, createUser, getClientId, getClientSecret } = require('../controllers/userController');
const { authMiddleware, checkRole } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, checkRole(["admin", "member"]), getUsers);
router.get('/:email', authMiddleware, checkRole(["admin", "member"]), getUserProfile);
router.delete('/:id', authMiddleware, checkRole(["admin"]), deleteUsers);
router.get('/:id', authMiddleware, checkRole(["admin"]), editUser);
router.get('/', authMiddleware, checkRole(["admin"]), createUser);
router.get('/', authMiddleware, checkRole(["admin"]), getClientId);
router.get('/', authMiddleware, checkRole(["admin"]), getClientSecret);

module.exports = router;
