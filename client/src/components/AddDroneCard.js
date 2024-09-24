import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function AddDroneCard({ onClose }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [suggestionDropdown, setSuggestionDropdown] = useState(true);
    const [droneData, setDroneData] = useState({
        name: '',
        asset_type: 'Drone',
        asset_serial: '',
        asset_status: 'In Stock',
        assigned_to: '',
        sales_order: '',
        cost_center: '',
        available_date: '',
        approval_requested: false,
        approval_requester: '',
        drone_value: ''
    });

    const resetForm = () => {
        setDroneData({
            name: '',
            asset_type: 'Drone',
            asset_serial: '',
            asset_status: 'In Stock',
            assigned_to: '',
            sales_order: '',
            cost_center: '',
            available_date: '',
            approval_requested: false,
            approval_requester: '',
            drone_value: ''
        });
        setSearchTerm('');
        setFilteredUsers([]);
    };

    const onCloseModal = () => {
        resetForm();
        onClose()
    }

    const router = useRouter();

    // Fetch the users for the assigned_to field
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('http://localhost:5002/api/users', {
                    withCredentials: true, // httpOnly cookies
                });
                setUsers(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                  // If token is expired it will return Unathorized 401 response and status
                  try {
                    const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
                      withCredentials: true, // httpOnly cookies
                    });
                    if (refreshResponse) {
                      // Retry the original request with the new access token
                      const response = await api.get('http://localhost:5002/api/users', {
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
                  console.error('Error fetching users:', error);
                }
            }
        };
        fetchUsers();
    }, []);

    // Filter users based on searchTerm
    useEffect(() => {
        let filtered;

        if (searchTerm.trim()) {
            filtered = users.filter((user) =>
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
            setSuggestionDropdown(true);
        } 
        if (suggestionDropdown === false) {
            setFilteredUsers([]);
        }
    }, [searchTerm, users]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDroneData({
            ...droneData,
            [name]: value,
        });
    };

    const handleAssignedToChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAssignedToSelect = (email) => {
        const selectedUser = users.find((user) => user.email === email);
        console.log(selectedUser)
        setDroneData({ ...droneData, assigned_to: selectedUser ? selectedUser.email : null });
        setSearchTerm(email); // Update search term to the selected email
        setSuggestionDropdown(false)
        setFilteredUsers([]);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:5002/api/drones/drone', droneData, {
                withCredentials: true,
            });
            if (response.status === 201) {
                onCloseModal();
                window.location.reload()
                // Reload drone list or perform any other necessary action
            } else {
                console.error('Failed to add drone');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
              // If token is expired it will return Unathorized 401 response and status
              try {
                const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
                  withCredentials: true, // httpOnly cookies
                });
                if (refreshResponse) {
                    // Retry the original request with the new access token
                    const response = await api.post('http://localhost:5002/api/drones/drone', droneData, {
                        withCredentials: true,
                    });
                    if (response.status === 201) {
                        closeModal();
                        // Reload drone list or perform any other necessary action
                    } else {
                        console.error('Failed to add drone');
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
              console.error('Error occured while adding the drone:', error);
            }
        }
    };

    return (
        <div className='z-10'>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[10px]">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className="font-bold mb-4">Add New Drone</h2>
                        <button
                            onClick={onCloseModal}
                            className="mb-4 rounded"
                        >
                            <Image
                                src="/images/closebutton.png"
                                alt='Close Add Drone'
                                width={12}
                                height={12}
                                className="rounded-lg"
                            />
                        </button>
                    </div>
                    <form onSubmit={handleAdd}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Drone Name"
                            value={droneData.name}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <input
                            type="text"
                            name="asset_serial"
                            placeholder="Asset Serial"
                            value={droneData.asset_serial}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <select
                            name="asset_status"
                            value={droneData.asset_status}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                            required
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="In Use">In Use</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>

                        {/* Assigned to (with search) */}
                        <div className="relative mb-2">
                            <input
                                type="text"
                                placeholder="Search user by email"
                                value={searchTerm}
                                onChange={handleAssignedToChange}
                                className="border p-2 w-full"
                            />
                            {filteredUsers.length > 0 && (
                                <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-y-auto">
                                    {filteredUsers.map((user) => (
                                        <li
                                            key={user._id}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleAssignedToSelect(user.email)}
                                        >
                                            {user.email}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <input
                            type="text"
                            name="sales_order"
                            placeholder="Sales Order"
                            value={droneData.sales_order}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            name="cost_center"
                            placeholder="Cost Center"
                            value={droneData.cost_center}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="date"
                            name="available_date"
                            placeholder="Available Date"
                            value={droneData.available_date}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <input
                            type="number"
                            name="drone_value"
                            placeholder="Drone Value"
                            value={droneData.drone_value}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-black px-2 py-1 mt-2 rounded font-bold"
                        >
                            Add Drone
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
