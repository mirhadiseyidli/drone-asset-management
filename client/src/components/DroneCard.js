import React from 'react';
import skydioX10Image from '../styles/images/skydioX10d.png';

const DroneCard = ({ drone, onRequest }) => {
  const handleRequest = () => {
    onRequest(drone._id);
  };

  return (
    <div className="drone-card">
      <img src={skydioX10Image} alt={`${drone.name}`} className="drone-card-image" />
      <h3>{drone.name}</h3>
      <p>Status: {drone.asset_status}</p>
      <button onClick={handleRequest}>
        {'View Details'}
      </button>
    </div>
  );
};

export default DroneCard;