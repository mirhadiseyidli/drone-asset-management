import React, { useEffect, useState } from 'react';
import DroneCard from './DroneCard';
import api from '../services/api';

const DroneList = () => {
  const [drones, setDrones] = useState([]);

  const fetchDrones = async () => {
    try {
      let response = await api.get('http://localhost:5002/api/drones', {
        withCredentials: true, // httpOnly cookies
      });
      setDrones(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired it will return Unathorized 401 response and status
        try {
          const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
            withCredentials: true, // httpOnly cookies
          });
          if (refreshResponse) {
            // Retry the original request with the new access token
            const response = await api.get('http://localhost:5002/api/drones', {
              withCredentials: true, // EhttpOnly cookies
            });
            setDrones(response.data);
          } else {
            // If refresh token is expired sent user to log in page. It will be 1 week just like session cookie so that they expire at the same time
            console.log('Refresh token expired or invalid. Please log in again.');
            // Redirect to login page or a pop-up implementation will be below
            // Probably a pop up button to get back to login or auto refresh after notification
            //
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      } else {
        console.error('Error fetching drones:', error);
      }
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  const handleRequest = async (drone) => {
    try {
      console.log(drone)
      await api.post(`http://localhost:5002/api/drones/request/${drone}`, null, {
        withCredentials: true,
      });
      console.log('Request for drone sent successfully');
    } catch (error) {
      console.error('Error sending drone request:', error);
    }
  };

  return (
    <div>
      <div className='drone-list-title'>
        <h2>Available Drones</h2>
      </div>
      <div className="drone-list">
        {drones.map((drone) => (
          <DroneCard key={drone._id} drone={drone} onRequest={handleRequest} />
        ))}
      </div>
    </div>
  );
};

export default DroneList;
