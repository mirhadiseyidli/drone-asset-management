import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../services/api';
import DashboardCard from './DashboardCard';

export default function Dashboard() {
    const [drones, setDrones] = useState([]);
    const [inUseFilter, setInUseFilter] = useState([]);
    const [inStockFilter, setInStockFilter] = useState([]);
    const [availableFilter, setAvailableFilter] = useState([]);
    const [unavailableFilter, setUnavailableFilter] = useState([]);
    const [totalDroneValue, setTotalDroneValue] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [lastMonthData, setLastMonthData] = useState([]);

    const fetchDrones = async () => {
        try {
          let response = await api.get('http://localhost:5002/api/drones', {
            withCredentials: true, // httpOnly cookies
          });
          setDrones(response.data);
          const inUseFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'in use');
          setInUseFilter(inUseFilteredDrones); 

          const inStockFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'in stock');
          setInStockFilter(inStockFilteredDrones);

          const totalDroneValueAddedList = response.data.reduce((acc, drone) => acc + (drone.drone_value || 0), 0);
          setTotalDroneValue(totalDroneValueAddedList);

          let stats = await api.get('http://localhost:5002/api/drones/stats', {
            withCredentials: true, // httpOnly cookies
          });
          console.log(stats)
          setMonthData(stats.data.currentStats);
          setLastMonthData(stats.data.lastMonthStats)

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

                const inUseFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'in use');
                setInUseFilter(inUseFilteredDrones); 

                const inStockFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'in stock');
                setInStockFilter(inStockFilteredDrones); 

                const availableFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'available');
                setAvailableFilter(availableFilteredDrones); 

                const unavailableFilteredDrones = response.data.filter(drone => drone.asset_status.toLowerCase() === 'unavailable');
                setUnavailableFilter(unavailableFilteredDrones); 

                const totalDroneValueAddedList = response.data.reduce((acc, drone) => acc + (drone.drone_value || 0), 0);
                setTotalDroneValue(totalDroneValueAddedList);

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

    const dataFields = [
        { name: 'Total Drones', key: 'total_drones' },
        { name: 'Drones In Use', key: 'drones_in_use' },
        { name: 'Drones In Stock', key: 'drones_in_stock' },
        { name: 'Drones Available', key: 'drones_available' },
        { name: 'Drones Unavailable', key: 'drones_unavailable' },
        { name: 'Total Drone Value', key: 'total_drone_value' }
    ];


    return (
        <div className='bg-white w-full h-full flex flex-col'>
            <header className="shadow-sm">
                <div className="flex items-center justify-between px-8 py-4">
                    <h1 className="text-md font-bold">Dashboard</h1>
                </div>
            </header>
            <div className="flex-grow p-8 bg-gray-50 w-full h-full">
                <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {dataFields.map(field => (
                        <DashboardCard
                            key={field.key}
                            card_name={field.name}
                            amount={monthData[field.key] || 0}
                            monthData={monthData}
                            lastMonthData={lastMonthData}
                            monthDataDetail={monthData[field.key] || 0}
                            lastMonthDataDetail={lastMonthData[field.key] || 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
