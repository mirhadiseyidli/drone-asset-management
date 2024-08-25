const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  asset_type: {
    type: String,
    required: true,
  },
  asset_serial: {
    type: String,
    required: true,
    unique: true,
  },
  asset_status: {
    type: String,
    required: true,
    enum: ['in stock', 'in use', 'available', 'unavailable'],
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  sales_order: {
    type: String,
    required: false,
  },
  cost_center: {
    type: String,
    required: false,
  },
  available_date: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Drone', droneSchema);
