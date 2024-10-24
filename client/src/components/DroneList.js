import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import DroneCard from './DroneCard';
import api from '../services/api';
import Image from 'next/image';

const DroneList = () => {
  const [drones, setDrones] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    column: 'asset_status',
    direction: 'asc', // 'none' | 'asc' | 'desc'
  });
  let [selectedDroneId, setSelectedDroneId] = useState(null);
  let [isDroneSelected, setIsDroneSelected] = useState(false);
  let [selectedDrone, setSelectedDrone] = useState(null);
  const radioGroupRef = useRef(null);
  const viewButtonRef = useRef(null);
  const deleteButtonRef = useRef(null); 
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleSort = (column) => {
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'none') {
        setSortConfig({ column, direction: 'asc' });
      } else if (sortConfig.direction === 'asc') {
        setSortConfig({ column, direction: 'desc' });
      } else {
        setSortConfig({ column: null, direction: 'none' }); // Reset sorting
      }
    } else {
      setSortConfig({ column, direction: 'asc' });
    }
  };

  const sortedDrones = React.useMemo(() => {
    let sortableDrones = [...drones];

    if (sortConfig.column) {
      sortableDrones.sort((a, b) => {
        if (typeof a[sortConfig.column] === 'string') {
          if (sortConfig.direction === 'asc') {
            return a[sortConfig.column].localeCompare(b[sortConfig.column]);
          } else if (sortConfig.direction === 'desc') {
            return b[sortConfig.column].localeCompare(a[sortConfig.column]);
          }
        }
        return 0;
      });
    }

    return sortableDrones;
  }, [drones, sortConfig]);

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

  const paginatedDrones = sortedDrones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(drones.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row gap-2 pr-8 pt-8 items-center justify-end'>
        <button 
            onClick={() => handleDelete(selectedDroneId)}
            className={`flex bg-black text-white px-2.5 py-1.5 rounded text-[10px] items-center justify-center disabled:bg-gray-400 hover:bg-gray-700 active:bg-gray-500 ${!selectedDroneId ? 'invisible' : ''}`}
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
            className={`flex bg-black text-white px-2.5 py-1.5 rounded text-[10px] items-center justify-center disabled:bg-gray-400 hover:bg-gray-700 active:bg-gray-500 ${!selectedDroneId ? 'invisible' : ''}`}
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
      <div className="flex flex-col p-8 bg-gray-50 w-full h-full">
        <div className='bg-white rounded-lg shadow-md p-6 overflow-x-auto overflow-y-auto'>
          <h2 className="text-md font-semibold mb-4">Drone List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 font-semibold text-gray-600 uppercase text-[12px]">
                <th className="px-2 py-2 text-center"></th>
                {['name', 'asset_type', 'asset_serial', 'asset_status', 'assigned_to', 'sales_order', 'cost_center', 'available_date', 'approval_requested', 'approval_requester', 'drone_value'].map((column) => (
                  <th
                    key={column}
                    className="px-2 py-2 text-left cursor-pointer"
                    onClick={() => handleSort(column)}
                  >
                    <span className="relative">
                      <span className="whitespace-normal">{column.replace('_', ' ')}</span>
                      {sortConfig.column === column && (
                        <span className={`absolute ml-1 transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}>
                          ▲
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedDrones.map((drone) => (
                <tr
                  key={drone._id}
                  className={`hover:bg-gray-100 transition-colors text-[12px] border-b border-gray-200 ${selectedDroneId === drone._id ? 'bg-gray-200' : ''}`}
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
                      const month = ('0' + (date.getMonth() + 1)).slice(-2);
                      const day = ('0' + date.getDate()).slice(-2);
                      const year = date.getFullYear();
                      return `${month}-${day}-${year}`;
                    })()}
                  </td>
                  <td className="px-2 py-2 text-left">{drone.approval_requested ? 'Yes' : 'No'}</td>
                  <td className="px-2 py-2 text-left">{drone.approval_requester ? `${drone.approval_requester.first_name} ${drone.approval_requester.last_name}` : '--'}</td>
                  <td className="px-2 py-2 text-left">${drone.drone_value}</td>
                </tr>
              ))}
              {paginatedDrones.length < itemsPerPage &&
                Array.from({ length: itemsPerPage - paginatedDrones.length }).map((_, index) => (
                  <tr key={`empty-${index}`} className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200 text-[12px]">
                    <td className="px-2 py-2"></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                    <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4 text-[12px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-1 py-1 mx-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
        >
          Previous
        </button>

        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-1 py-1 mx-1 text-black"
          >
            {currentPage - 1}
          </button>
        )}

        <span className="px-1 py-1 mx-1 font-bold">{currentPage}</span>

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-1 py-1 mx-1 text-black"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-1 py-1 mx-1 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
        >
          Next
        </button>
      </div>
          </div>
        );
      };

export default DroneList;
