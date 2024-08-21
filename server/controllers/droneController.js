const Drone = require('../database/schemas/droneSchema');

const getDrones = async (req, res) => {
  const drones = await Drone.find();
  console.log(drones);
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
  // Create drone logic here
  const drone = await Drone.create()
}

const deleteDrone = async (req, res) => {
  // Delete drone logic here
  const drone = await Drone.deleteOne()
}

const editDrone = async (req, res) => {
  // Edit drone logic here
  const drone = await Drone.findOneAndUpdate()
}

module.exports = { getDrones, requestDrone };
