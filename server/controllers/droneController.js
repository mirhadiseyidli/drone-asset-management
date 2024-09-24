const Drone = require('../database/schemas/droneSchema');
const User = require('../database/schemas/userSchema');
const slackActions = require('../utils/slackActions');

const crypto = require('crypto');

const getDrones = async (req, res) => {
  try {
    const drones = await Drone.find().populate([{ path: 'assigned_to' }, { path: 'approval_requester' }]);
    console.log(drones)
    res.status(200).json(drones);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Drones' });
  }
};

const requestDrone = async (req, res) => {
  const { id } = req.params;
  const drone = await Drone.findOne({ id: id }).populate('assigned_to').populate('approval_requester');
  const requestingUser = await User.findOne({ google_id: req.user.id})
  console.log(requestingUser)
  const assignedUser = drone.assigned_to;

  if (drone.assigned_to) {
      try {
          const hash = generateHash();
          const channelName = `drone-request-${drone._id}-${hash}`;
          const assigned_user_slack_id = await slackActions.getUserIdByEmail(assignedUser.email);
          const requesting_user_slack_id = await slackActions.getUserIdByEmail(requestingUser.email);
          const channelId = await slackActions.createChannel(channelName);
          await slackActions.inviteUsersToChannel(channelId, [requesting_user_slack_id, assigned_user_slack_id]);
          await slackActions.postApprovalMessage(channelId, requestingUser, id);
          drone.approval_requested = true;
          drone.approval_requester = requestingUser._id;
          await drone.save();

          res.status(200).json({ message: 'Approval request submitted' });
      } catch (error) {
          res.status(500).json({ message: 'Failed to create approval workflow' });
      }
  } else {
      // Submit a ticket to Freshservice
      console.log('submitting a ticket');
      res.status(200).json({ message: 'Ticket submitted' });
  }

  res.status(200).json({ message: 'Request submitted' });
};

const createDrone = async (req, res) => {
  console.log(req.body)
  try {
    const { assigned_to, approval_requester, ...droneData } = req.body;
    console.log(assigned_to)
    console.log(approval_requester)
    let user;
    let requester;

    if (assigned_to) {
      user = await User.findOne({ email: assigned_to });
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      droneData.assigned_to = user._id;
    }

    if (approval_requester) {
      requester = await User.findOne({ email: approval_requester });
      if (!requester) {
        return res.status(404).json({ message: 'User not found' });
      }
      droneData.approval_requester = user._id;
    }

    const drone = await Drone.create(droneData);
    console.log('done')
    res.status(201).json(drone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDrone = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  try {
    const drone = await Drone.findOneAndDelete({ _id: id })
    res.status(200).json(drone);
  } catch (err) {
      res.status(400).json({ message: err.message });
  };
}

const editDrone = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.params;

  try {
    const drone = await Drone.findOneAndUpdate(
      { _id: id }, 
      { $set: updateFields }, 
      { new: true } 
    );

    if (!drone) {
      return res.status(404).json({ message: 'Drone not found' });
    }

    res.status(200).json(drone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function generateHash() {
  return crypto
      .randomBytes(5)
      .toString('hex');
}

module.exports = { getDrones, requestDrone, createDrone, deleteDrone, editDrone };
