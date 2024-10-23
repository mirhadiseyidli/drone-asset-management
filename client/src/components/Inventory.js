import React, { useState } from 'react';
import DroneList from './DroneList';
import Image from 'next/image';
import AddDroneCard from './AddDroneCard';

export default function Inventory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='bg-white w-full h-full flex flex-col'>
            <header className="shadow-sm">
                <div className="flex items-center justify-between px-8 py-4">
                    <h1 className="text-md font-bold">Inventory</h1>
                    <button 
                        onClick={openModal}
                        className="flex bg-black text-white px-2.5 py-1.5 rounded text-[10px] items-center justify-center hover:bg-gray-700 active:bg-gray-500"
                    >
                        <Image
                            src="/images/add-drone.png"
                            alt='Add Drone'
                            width={12}
                            height={12}
                            className="rounded-lg invert mr-1"
                        />
                        Add Drone
                    </button>
                </div>
            </header>
            <div className='flex-grow bg-gray-50 w-full h-full'>
                <DroneList />
            </div>
            <div>
                {isModalOpen && (
                    <AddDroneCard onClose={closeModal}  />
                )}
            </div>
        </div>
    );
}
