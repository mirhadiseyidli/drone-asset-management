import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import api from '../services/api';
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        column: 'name',
        direction: 'asc', // 'none' | 'asc' | 'desc'
      });
    const [currentPage, setCurrentPage] = useState(1);
    const [showClientKey, setShowClientKey] = useState(false);
    const [showClientSecret, setShowClientSecret] = useState(false);
    const [clientKey, setClientKey] = useState('Generate a Client Key');
    const [clientSecret, setClientSecret] = useState('Generate a Client Secret')
    const usersPerPage = 10;
    const router = useRouter();

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const fetchUsers = async () => {
        try {
            const response = await api.get('http://localhost:5002/api/users', {
                withCredentials: true, // httpOnly cookies
            });
            console.log(response.data)
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
                  setUsers(response.data);
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
    
    useEffect(() => {
        fetchUsers();
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

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
    
        if (sortConfig.column) {
            sortableUsers.sort((a, b) => {
                let aValue = '';
                let bValue = '';
    
                if (sortConfig.column === 'name') {
                    aValue = `${a.first_name} ${a.last_name}`;
                    bValue = `${b.first_name} ${b.last_name}`;
                } else {
                    aValue = a[sortConfig.column];
                    bValue = b[sortConfig.column];
                }
    
                if (typeof aValue === 'string') {
                    return sortConfig.direction === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }
    
        return sortableUsers;
    }, [users, sortConfig]);

    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
      );
    
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
    };

    const handleGenerateKey = async (api_type) => {
        try {
            const response = await api.get(`http://localhost:5002/api/users/api-tokens/${api_type}`, {
                params: {
                    type: api_type  // Adding query parameter 'type=client_key'
                },
                withCredentials: true, // httpOnly cookies
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
                  const response = await api.get(`http://localhost:5002/api/users/${api_type}`, {
                    params: {
                        type: api_type  // Adding query parameter 'type=client_key'
                    },
                    withCredentials: true, // EhttpOnly cookies
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
              console.error('Error fetching users:', error);
            }
        }
    };

    const getUserCredentials = async () => {
        try {
            const response = await api.get('http://localhost:5002/api/users/user-credentials/', {
                withCredentials: true, // httpOnly cookies
            });
            setClientKey(response.data.client_key);
            setClientSecret(response.data.client_secret)
        } catch (error) {
            if (error.response && error.response.status === 401) {
              // If token is expired it will return Unathorized 401 response and status
              try {
                const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
                  withCredentials: true, // httpOnly cookies
                });
                if (refreshResponse) {
                  // Retry the original request with the new access token
                  const response = await api.get('http://localhost:5002/api/users/user-credentials', {
                    withCredentials: true, // EhttpOnly cookies
                  });
                  setClientKey(response.data.client_key);
                  setClientSecret(response.data.client_secret)
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

    useEffect(() => {
        getUserCredentials();
    }, []);

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <header className="shadow-sm">
                <div className="flex items-center justify-between px-8 py-4">
                    <h1 className="text-md font-bold">Admin Panel</h1>
                </div>
            </header>
            <div className="flex flex-col p-8 bg-gray-50 w-full h-full gap-6">
                {/* User Management Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-16 overflow-x-auto">
                    <h2 className="text-md font-semibold mb-4">User Management</h2>
                    <table className="min-w-full table-auto text-left text-[12px]">
                        <thead>
                            <tr className="border-b border-gray-200 font-semibold text-gray-600 uppercase text-[12px]">
                                {['name', 'email', 'role', 'actions'].map((column) => (
                                    <th
                                        key={column}
                                        className={`pr-2 py-2 cursor-pointer ${column === 'actions' ? 'text-right' : 'text-left'}`}
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
                            {paginatedUsers.map((user) => (
                                <tr className="border-b" key={user._id}>
                                    <td className="pr-2 py-2">{user.first_name} {user.last_name}</td>
                                    <td className="pr-2 py-2">{user.email}</td>
                                    <td className="pr-2 py-2">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                    <td className="pr-2 py-2 text-right">
                                        <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-700 active:bg-gray-500">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedUsers.length < usersPerPage &&
                                Array.from({ length: usersPerPage - paginatedUsers.length }).map((_, index) => (
                                    <tr key={`empty-${index}`} className="bg-gray-50 border-b border-gray-200 text-[12px]">
                                        <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                                        <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                                        <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                                        <td className="px-2 py-2 text-left"><p className='invisible'>--</p></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 text-[12px]">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-1 py-1 mx-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page + 1}
                                onClick={() => handlePageChange(page + 1)}
                                className={`px-1 py-1 mx-1 ${currentPage === page + 1 ? 'text-blue' : 'text-black'}`}
                            >
                                {page + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-1 py-1 mx-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* API Keys Section */}
                <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                    <h2 className="text-md font-semibold mb-4">API Keys</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center relative w-full">
                                <div className='pr-2'>
                                    <h3 className="text-sm font-medium">Client Secret</h3>
                                    <p className="text-gray-600 mt-1 text-[12px]">
                                        {showClientKey ? (clientKey || 'Generate a Client Key') : '*'.repeat((clientKey || 'Generate a Client Key').length)}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 pr-2">
                                    <button
                                        onClick={() => setShowClientKey(!showClientKey)}
                                        className="px-4 py-0.5 border rounded-md hover:bg-gray-700 active:bg-gray-500 bg-black"
                                    >
                                        <FontAwesomeIcon icon={showClientKey ? faEyeSlash : faEye} className='w-4 h-4 invert'/>
                                    </button>
                                    <button
                                        onClick={() => handleGenerateKey('client-key')}
                                        className="flex min-w-48 border border-black justify-center items-center bg-black text-white px-4 py-1 rounded text-[12px] hover:bg-gray-700 active:bg-gray-500"
                                    >
                                        <Image
                                            src="/images/api-key.png"
                                            alt="API Key"
                                            width={16}
                                            height={16}
                                            className="mr-2 invert"
                                        />
                                        <span>Generate New Key</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center relative w-full">
                                <div className='pr-2'>
                                    <h3 className="text-sm font-medium">Client Secret</h3>
                                    <p className="text-gray-600 mt-1 text-[12px]">
                                        {showClientSecret ? (clientSecret || 'Generate a Client Secret') : '*'.repeat((clientSecret || 'Generate a Client Secret').length)}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 pr-2">
                                    <button
                                        onClick={() => setShowClientSecret(!showClientSecret)}
                                        className="px-4 py-0.5 border rounded-md hhover:bg-gray-700 active:bg-gray-500 bg-black"
                                    >
                                        <FontAwesomeIcon icon={showClientSecret ? faEyeSlash : faEye} className='w-4 h-4 invert'/>
                                    </button>
                                    <button
                                        onClick={() => handleGenerateKey('client-secret')}
                                        className="flex min-w-48 border border-black justify-center items-center bg-black text-white px-4 py-1 rounded text-[12px] hover:bg-gray-700 active:bg-gray-500"
                                    >
                                        <Image
                                            src="/images/api-key.png"
                                            alt="API Key"
                                            width={16}
                                            height={16}
                                            className="mr-2 invert"
                                        />
                                        <span>Generate New Secret</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
