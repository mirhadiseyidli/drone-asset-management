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
    enum: ['In Stock', 'In Use', 'Available', 'Unavailable'],
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
  assignment_date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  available_date: {
    type: Date,
    required: true,
  },
  approval_requested: {
    type: Boolean,
    required: false,
  },
  approval_requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  drone_value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Drone', droneSchema);
