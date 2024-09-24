import React from 'react';
import Image from 'next/image';

export default function Navbar({ onSectionChange, selectedSection }) {
  
  return (
    <nav className="flex flex-col h-screen z-10">
      <div className='w-64 h-full flex flex-col bg-white z-10 shadow-md'>
          <button onClick={() => onSectionChange('Dashboard')} className='flex w-full items-center px-6 py-4 text-left text-gray-700 shadow-sm'>
            <Image
              src="/images/logo.png"
              alt="Skydio logo"
              width={35}
              height={35}
            />
            <h1 className="text-md text-center ml-1">
              Skydio
            </h1>
          </button>
        <div className='w-full flex flex-col flex-grow mt-16 items-center justify-center'>
          <ul className='w-full flex flex-col text-black p-2 items-center justify-center text-center text-[10px] font-semibold'>
            <li className='w-full max-w-xs peer'>
              <button onClick={() => onSectionChange('Dashboard')} className={`flex w-full items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900
                ${selectedSection === 'Dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}>
                <div className='flex items-center justify-center'>
                  <Image
                    src="/images/dashboard.png"
                    alt="Dashboard"
                    width={18}
                    height={18}
                    className='mr-4'
                  />
                  <p>Dashboard</p>
                </div>
              </button>
            </li>
            <li className='w-full max-w-xs'>
              <button onClick={() => onSectionChange('Inventory')} className={`flex w-full items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900
                ${selectedSection === 'Inventory' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}>
                <div className='flex items-center justify-center'>
                  <Image
                    src="/images/inventory.png"
                    alt="Inventory"
                    width={18}
                    height={18}
                    className='mr-4'
                  />
                  <p>Inventory</p>
                </div>
              </button>
            </li>
            <li className='w-full max-w-xs'>
              <button onClick={() => onSectionChange('Requests')} className={`flex w-full items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900
                ${selectedSection === 'Requests' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}>
                <div className='flex items-center justify-center'>
                  <Image
                    src="/images/requests.png"
                    alt="Requests"
                    width={18}
                    height={18}
                    className='mr-4'
                  />
                  <p>Requests</p>
                </div>
              </button>
            </li>
            <li className='w-full max-w-xs'>
              <button onClick={() => onSectionChange('Approvals')} className={`flex w-full items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900
                ${selectedSection === 'Approvals' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}>
                <div className='flex items-center justify-center'>
                  <Image
                    src="/images/approvals.png"
                    alt="Approvals"
                    width={18}
                    height={18}
                    className='mr-4'
                  />
                  <p>Approvals</p>
                </div>
              </button>
            </li>
          </ul>
          <ul className='w-full mt-auto text-black items-center justify-center text-center p-2 text-[10px] font-semibold'>
            <li className='w-full max-w-xs'>
              <button onClick={() => onSectionChange('Admin Panel')} className={`flex w-full items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900
                ${selectedSection === 'Admin Panel' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}>
                <div className='flex items-center justify-center'>
                  <Image
                    src="/images/admin.png"
                    alt="Admin Panel"
                    width={18}
                    height={18}
                    className='mr-4'
                  />
                  <p>Admin Panel</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
