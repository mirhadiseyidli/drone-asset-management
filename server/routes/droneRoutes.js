const express = require('express');
const { getDrones, requestDrone } = require('../controllers/droneController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getDrones);
router.post('/request/:id', authMiddleware, requestDrone);

module.exports = router;
