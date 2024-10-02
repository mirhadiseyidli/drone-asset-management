const mongoose = require('mongoose');

const droneStatSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true,
  },
  total_drones: {
    type: Number,
    required: true,
  },
  drones_in_use: {
    type: Number,
    required: true,
  },
  drones_in_stock: {
    type: Number,
    required: true,
  },
  drones_available: {
    type: Number,
    required: true,
  },
  drones_unavailable: {
    type: Number,
    required: true,
  },
  total_drone_value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('DroneStat', droneStatSchema);
