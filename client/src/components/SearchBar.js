import React from 'react';
import Image from 'next/image';

export default function SearchBar({ onSearch }) {

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex relative w-1/3 h-7">
        <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
            placeholder="Search drones..."
            onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            {/* Magnifying glass icon */}
            <Image
            src='/images/search.png'
            alt="Search"
            width={18}
            height={18}
            className='rounded-full object-cover bg-white'
            />
        </div>
    </div>
  );
}
