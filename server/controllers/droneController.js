const Drone = require('../database/schemas/droneSchema');

const getDrones = async (req, res) => {
  console.log(req.user)
  const drones = await Drone.find();
  res.status(200).json(drones);
};

const requestDrone = async (req, res) => {
  const { id } = req.params;
  const drone = await Drone.findById(id);

  if (drone.assignedTo) {
    // Handle approval workflow
    console.log('requesting approval')
  } else {
    // Submit a ticket to Freshservice
    console.log('submitting a ticket')
  }

  res.status(200).json({ message: 'Request submitted' });
};

const createDrone = async (req, res) => {
  let user;
  const { name,
          asset_type,
          asset_serial,
          asset_status,
          assigned_to,
          sales_order,
          cost_center,
          available_date
      } = req.body
  
  if (assigned_to) {
    console.log(assigned_to)
    user = await User.findOne({ email: assigned_to });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  }

  try {
    const drone = await Drone.create({ name,
      asset_type,
      asset_serial,
      asset_status,
      sales_order,
      cost_center,
      available_date
    })
    if (assigned_to) {
      drone.assigned_to = user._id;
    }
    res.status(201).json(drone);
  } catch (err) {
      res.status(400).json({ message: err.message });
  };
}

const deleteDrone = async (req, res) => {
  // Delete drone logic here
  const { asset_serial } = req.body

  try {
    const drone = await Drone.findOneAndDelete(asset_serial)
    res.status(200).json(drone);
  } catch (err) {
      res.status(400).json({ message: err.message });
  };
}

const editDrone = async (req, res) => {
  // Edit drone logic here
  const drone = await Drone.findOneAndUpdate()
}

module.exports = { getDrones, requestDrone, createDrone, deleteDrone };
