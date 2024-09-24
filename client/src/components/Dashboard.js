import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../services/api';

export default function Dashboard() {
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

    return (
        <div className='bg-white w-full h-full flex flex-col'>
            <header className="shadow-sm">
                <div className="flex items-center justify-between px-8 py-4">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                </div>
            </header>
            <div className="flex-grow p-8 bg-gray-50 w-full h-full">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Total Drones</h3>
                            <Image
                                src="/images/total-drones.png"
                                alt='Total Drones'
                                width={16}
                                height={16}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="p-6">
                            <div className="text-2xl font-bold">{drones.length}</div>
                            <p className="text-xs text-muted-foreground">+5 from last month</p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Drones In Use</h3>
                        <Image
                            src="/images/drones-in-use.png"
                            alt='Drones In Use'
                            width={16}
                            height={16}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="p-6" data-id="70">
                        <div className="text-2xl font-bold">120</div>
                        <p className="text-xs text-muted-foreground">+10 from last month</p>
                    </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Drones In Stock</h3>
                        <Image
                            src="/images/drones-in-stock.png"
                            alt='Drones In Stock'
                            width={16}
                            height={16}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="p-6">
                        <div className="text-2xl font-bold">30</div>
                        <p className="text-xs text-muted-foreground">-5 from last month</p>
                    </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Total Value</h3>
                        <Image
                            src="/images/total-value.png"
                            alt='Total Value'
                            width={16}
                            height={16}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="p-6">
                        <div className="text-2xl font-bold">$750,000</div>
                        <p className="text-xs text-muted-foreground">+2% from last month</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
