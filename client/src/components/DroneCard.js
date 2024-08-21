import React from 'react';

const DroneCard = ({ drone, onRequest }) => {
  const handleRequest = () => {
    onRequest(drone._id);
  };

  return (
    <div className="drone-card">
      <h3>{drone.name}</h3>
      <p>Status: {drone.status}</p>
      <button onClick={handleRequest}>
        {drone.assignedTo ? 'Request Approval' : 'Submit Ticket'}
      </button>
    </div>
  );
};

export default DroneCard;
