const express = require('express');
const { getDrones, requestDrone, createDrone, deleteDrone } = require('../controllers/droneController');
const { authMiddleware, checkRole } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, checkRole(["admin", "member"]), getDrones);
router.post('/request/:id', authMiddleware, checkRole(["admin", "member"]), requestDrone);
router.post('/drone', authMiddleware, checkRole(["admin"]), createDrone);
router.delete('/drone', authMiddleware, checkRole(["admin"]), deleteDrone);

module.exports = router;
