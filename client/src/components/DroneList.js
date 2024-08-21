import React, { useEffect, useState } from 'react';
import DroneCard from './DroneCard';
import api from '../services/api';

const DroneList = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        let response = await api.get('http://localhost:5002/api/drones', {
          withCredentials: true, // httpOnly cookies
        });
        console.log(response)
        setDrones(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If token is expired it will return Unathorized 401 response and status
          try {
            const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)_csrf\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(csrfToken) // Debugging
            console.log('Token expired, attempting to refresh token...'); // Debugging
            const refreshResponse = await api.post('http://localhost:5002/api/token/refresh-token', null, { // NOTE: This is where the issue with CSRF Token happens
              withCredentials: true, // httpOnly cookies
              headers: {
                'X-CSRF-Token': csrfToken, // Include the CSRF token in the headers
              },
            });
  
            if (refreshResponse.data.accessToken) {
              // Retry the original request with the new access token
              const response = await api.get('http://localhost:5002/api/drones', {
                withCredentials: true, // EhttpOnly cookies
              });
              setDrones(response.data);
            } else {
              // If refresh token is expired sent user to log in page. It will be 1 week just like session cookie so that they expire at the same time
              console.log('Refresh token expired or invalid. Please log in again.');
              // Redirect to login page or a pop-up implementation will be below
              //
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
  
    fetchDrones();
  }, []);

  const handleRequest = async (droneId) => {
    try {
      await api.post(`/drones/request/${droneId}`, null, {
        withCredentials: true,
      });
      console.log('Request for drone sent successfully');
    } catch (error) {
      console.error('Error sending drone request:', error);
    }
  };

  return (
    <div className="drone-list">
      <h2>Available Drones</h2>
      {drones.map((drone) => (
        <DroneCard key={drone._id} drone={drone} onRequest={handleRequest} />
      ))}
    </div>
  );
};

export default DroneList;
