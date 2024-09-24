import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import DroneCard from './DroneCard';
import api from '../services/api';
import Image from 'next/image';

const DroneList = () => {
  const [drones, setDrones] = useState([]);
  let [selectedDroneId, setSelectedDroneId] = useState(null);
  let [isDroneSelected, setIsDroneSelected] = useState(false);
  let [selectedDrone, setSelectedDrone] = useState(null);
  const radioGroupRef = useRef(null);
  const viewButtonRef = useRef(null);
  const deleteButtonRef = useRef(null); 
  
  const router = useRouter();

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
            router.replace('/login');
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

  const handleRadioChange = (droneId) => {
    setSelectedDroneId(droneId);
    setIsDroneSelected(true);
  };

  const handleCloseCard = () => {
    setSelectedDrone(null);
  };

  const handleCardView = (droneId) => {
    const selected = drones.find((drone) => drone._id === droneId);
    setSelectedDrone(selected);
  };

  const handleRequest = async (drone) => {
    try {
      await api.post(`http://localhost:5002/api/drones/request/${drone}`, null, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired it will return Unathorized 401 response and status
        try {
          const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
            withCredentials: true, // httpOnly cookies
          });
          if (refreshResponse) {
            // Retry the original request with the new access token
            await api.post(`http://localhost:5002/api/drones/request/${drone}`, null, {
              withCredentials: true,
            });
          } else {
            // If refresh token is expired sent user to log in page. It will be 1 week just like session cookie so that they expire at the same time
            console.log('Refresh token expired or invalid. Please log in again.');
            router.replace('/login');
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      } else {
        console.error('Error sending drone request:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`http://localhost:5002/api/drones/drone/${id}`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired it will return Unathorized 401 response and status
        try {
          const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
            withCredentials: true, // httpOnly cookies
          });
          if (refreshResponse) {
            const response = await api.delete(`http://localhost:5002/api/drones/drone/${id}`, null, {
              withCredentials: true,
            });
            if (response.status === 200) {
              window.location.reload()
            }
          } else {
            // If refresh token is expired sent user to log in page. It will be 1 week just like session cookie so that they expire at the same time
            console.log('Refresh token expired or invalid. Please log in again.');
            router.replace('/login');
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      } else {
        console.error('Error deleting the drone:', error);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      radioGroupRef.current && !radioGroupRef.current.contains(event.target) &&
      viewButtonRef.current && !viewButtonRef.current.contains(event.target) &&
      deleteButtonRef.current && !deleteButtonRef.current.contains(event.target)
    ) {
      setSelectedDroneId(null);
      setIsDroneSelected(false);
      setSelectedDrone(null);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row gap-2 pb-4 items-center justify-end'>
        <button 
            onClick={() => handleDelete(selectedDroneId)}
            className={`flex bg-black text-white px-2.5 py-1.5 rounded text-[10px] items-center justify-center disabled:bg-gray-400 hover:bg-gray-700 ${!selectedDroneId ? 'invisible' : ''}`}
            disabled={!selectedDroneId}
            ref={deleteButtonRef}
        >
            <Image
                src="/images/delete-drone.png"
                alt='Deleted Drone'
                width={12}
                height={12}
                className="rounded-lg invert mr-1"
            />
            Delete Drone
        </button>
        <button 
            onClick={() => handleCardView(selectedDroneId)}
            className={`flex bg-black text-white px-2.5 py-1.5 rounded text-[10px] items-center justify-center disabled:bg-gray-400 hover:bg-gray-700 ${!selectedDroneId ? 'invisible' : ''}`}
            disabled={!selectedDroneId}
            ref={viewButtonRef}
        >
            <Image
                src="/images/view-drone.png"
                alt='View Drone'
                width={12}
                height={12}
                className="rounded-lg invert mr-1"
            />
            View Drone
        </button>
      </div>
      <div>
        {selectedDrone && (
          <DroneCard
            key={selectedDrone._id}
            drone={selectedDrone}
            onRequest={handleRequest}
            onClose={handleCloseCard}
          />
        )}
      </div>
      <div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 font-semibold text-gray-600 uppercase text-[10px]">
                <th className="px-2 py-2 text-center">
                </th>
                <th className="px-2 py-2 text-left">Drone Name</th>
                <th className="px-2 py-2 text-left">Asset Type</th>
                <th className="px-2 py-2 text-left">Asset Serial</th>
                <th className="px-2 py-2 text-left">Asset Status</th>
                <th className="px-2 py-2 text-left">Assigned To</th>
                <th className="px-2 py-2 text-left">Sales Order</th>
                <th className="px-2 py-2 text-left">Cost Center</th>
                <th className="px-2 py-2 text-left">Available Date</th>
                <th className="px-2 py-2 text-left">Approval Requested</th>
                <th className="px-2 py-2 text-left">Approval Requester</th>
                <th className="px-2 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {drones.map((drone) => (
                <tr
                  key={drone._id}
                  className={`hover:bg-gray-100 transition-colors text-[10px] border-b border-gray-200 ${selectedDroneId === drone._id ? 'bg-gray-200' : 'bg-gray-50'}`}
                >
                  <td className="px-2 py-2">
                    <input
                      type="radio"
                      value={drone._id}
                      checked={selectedDroneId === drone._id}
                      onChange={() => handleRadioChange(drone._id)}
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      ref={radioGroupRef}
                    />
                  </td>
                  <td className="px-2 py-2 text-left">{drone.name}</td>
                  <td className="px-2 py-2 text-left">{drone.asset_type}</td>
                  <td className="px-2 py-2 text-left">{drone.asset_serial}</td>
                  <td className="px-2 py-2 text-left">{drone.asset_status}</td>
                  <td className="px-2 py-2 text-left">{drone.assigned_to ? `${drone.assigned_to.first_name} ${drone.assigned_to.last_name}` : 'N/A'}</td>
                  <td className="px-2 py-2 text-left">{drone.sales_order}</td>
                  <td className="px-2 py-2 text-left">{drone.cost_center}</td>
                  <td className="px-2 py-2 text-left">
                    {(() => {
                      const date = new Date(drone.available_date);
                      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month and add leading zero if needed
                      const day = ('0' + date.getDate()).slice(-2); // Get day and add leading zero if needed
                      const year = date.getFullYear();
                      return `${month}-${day}-${year}`;
                    })()}
                  </td>
                  <td className="px-2 py-2 text-left">{drone.approval_requested ? 'Yes' : 'No'}</td>
                  <td className="px-2 py-2 text-left">{drone.approval_requester ? `${drone.approval_requester.first_name} ${drone.approval_requester.last_name}` : '--'}</td>
                  <td className="px-2 py-2 text-left">${drone.drone_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DroneList;
