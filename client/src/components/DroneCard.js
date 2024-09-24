import React from 'react';
import Image from 'next/image';

export default function DroneCard({ drone, onRequest, onClose }) {

  return (
    <div className='z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className="relative flex max-w-sm w-full max-h-fit items-center justify-start text-center text-black rounded-xl p-6 bg-white shadow-sm shadow-white">
        <div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white rounded-sm w-4 h-4 flex items-center justify-center hover:bg-gray-100"
          >
            <Image
              src="/images/closebutton.png"
              alt='Close Button'
              width={100}
              height={100}
              className="rounded-lg z-10"
              priority
            />
          </button>
        </div>
        <div className="w-full p-2 mx-auto bg-white relative">
          <div className='flex w-full'>
            <div className='flex flex-row gap-2 items-center text-start w-full justify-between'>
              <h1 className="text-md font-bold">{drone.name}</h1>
              <span className='px-2 py-1 font-semibold bg-black text-white rounded-3xl text-[10px]'>
                <p>
                  {drone.asset_status.toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-4 py-10 font-semibold text-[10px]'>
            <div className='flex flex-col gap-2 items-start justify-start text-start'>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/serial-number.png"
                  alt="Serial Number"
                  width={18}
                  height={18}
                />
                <p>{drone.asset_serial}</p>
              </span>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/department.png"
                  alt="Department"
                  width={18}
                  height={18}
                  className=''
                />
                <p>{drone.cost_center}</p>
              </span>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/assignment-date.png"
                  alt="Assignment Date"
                  width={18}
                  height={18}
                  className=''
                />
                <p>
                  {(() => {
                    if (!drone.assignment_date) return '--';
                    const date = new Date(drone.assignment_date);
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month with leading zero
                    const day = ('0' + date.getDate()).slice(-2); // Get day with leading zero
                    const year = date.getFullYear();
                    return `${month}-${day}-${year}`;
                  })()}
                </p>
              </span>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/assigned-to-small.png"
                  alt="Assigned To Small"
                  width={18}
                  height={18}
                  className=''
                />
                <p>{drone.assigned_to.first_name} {drone.assigned_to.last_name}</p>
              </span>
            </div>
            <div className='flex flex-col gap-2 items-start justify-start text-start'>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/inventory.png"
                  alt="Inventory"
                  width={18}
                  height={18}
                  className=''
                />
                <p>{drone.asset_type}</p>
              </span>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/sales-order.png"
                  alt="Sales Order"
                  width={18}
                  height={18}
                  className=''
                />
                <p>{drone.sales_order}</p>
              </span>
              <span className='flex flex-row items-center gap-1 w-full'>
                <Image
                  src="/images/availability.png"
                  alt="Availability"
                  width={18}
                  height={18}
                  className=''
                />
                <p>
                  {(() => {
                    if (!drone.available_date) return 'N/A';
                    const date = new Date(drone.available_date);
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month with leading zero
                    const day = ('0' + date.getDate()).slice(-2); // Get day with leading zero
                    const year = date.getFullYear();
                    return `${month}-${day}-${year}`;
                  })()}
                </p>
              </span>
            </div>
          </div>
          <div className='flex justify-end'>
            <button onClick={onRequest} className="flex items-center justify-center px-2 py-1 bg-black text-white border border-black rounded font-bold text-[10px] hover:bg-gray-700 active:bg-gray-900">
              {'Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// name: {
//   type: String,
//   required: true,
// },
// asset_type: {
//   type: String,
//   required: true,
// },
// asset_serial: {
//   type: String,
//   required: true,
//   unique: true,
// },
// asset_status: {
//   type: String,
//   required: true,
//   enum: ['in stock', 'in use', 'available', 'unavailable'],
// },
// assigned_to: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   default: null,
// },
// sales_order: {
//   type: String,
//   required: false,
// },
// cost_center: {
//   type: String,
//   required: false,
// },
// available_date: {
//   type: Date,
//   required: true,
// },
// approval_requested: {
//   type: Boolean,
//   required: false,
// },
// approval_requester: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User',
//   default: null,