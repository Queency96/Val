import { useEffect, useState } from 'react';
import { X, Bike, Phone, MapPin } from 'lucide-react';

const riders = [
  {
    id: 1,
    name: 'Samuel Rider',
    phone: '08034567890',
    vehicle: 'Motorcycle',
    location: 'Lekki',
  },
  {
    id: 2,
    name: 'Michael James',
    phone: '08123456789',
    vehicle: 'Motorcycle',
    location: 'Ikeja',
  },
  {
    id: 3,
    name: 'Daniel Moses',
    phone: '09087654321',
    vehicle: 'Van',
    location: 'Victoria Island',
  },
  {
    id: 4,
    name: 'David Johnson',
    phone: '07099887766',
    vehicle: 'Motorcycle',
    location: 'Surulere',
  },
];

export default function AssignRiderModal({ open, order, onClose, onAssign }) {
  const [selectedRider, setSelectedRider] = useState(null);

  useEffect(() => {
    if (order) {
      const rider = riders.find((r) => r.name === order.rider);

      setSelectedRider(rider?.id || null);
    }
  }, [order]);

  if (!open || !order) return null;

  const handleAssign = () => {
    const rider = riders.find((r) => r.id === Number(selectedRider));

    if (!rider) {
      alert('Please select a rider.');
      return;
    }

    onAssign?.({
      ...order,
      rider: rider.name,
      status: 'shipped',
    });

    onClose();
  };

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div>
            <h2 className='text-2xl font-bold'>Assign Rider</h2>

            <p className='text-sm text-gray-500'>Order #{order.id}</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className='p-6 space-y-4 max-h-[500px] overflow-y-auto'>
          {riders.map((rider) => (
            <div
              key={rider.id}
              onClick={() => setSelectedRider(rider.id)}
              className={`
                cursor-pointer
                border-2
                rounded-xl
                p-5
                transition

                ${
                  selectedRider === rider.id
                    ? 'border-[#2F4832] bg-green-50'
                    : 'border-gray-200 hover:border-[#2F4832]'
                }
              `}>
              <div className='flex justify-between'>
                <div>
                  <h3 className='font-bold text-lg'>{rider.name}</h3>

                  <div className='mt-2 space-y-2 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <Phone size={16} />

                      {rider.phone}
                    </div>

                    <div className='flex items-center gap-2'>
                      <Bike size={16} />

                      {rider.vehicle}
                    </div>

                    <div className='flex items-center gap-2'>
                      <MapPin size={16} />

                      {rider.location}
                    </div>
                  </div>
                </div>

                <div className='flex items-center'>
                  <div
                    className={`
                      w-6
                      h-6
                      rounded-full
                      border-2

                      ${
                        selectedRider === rider.id
                          ? 'bg-[#2F4832] border-[#2F4832]'
                          : 'border-gray-300'
                      }
                    `}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-4 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl border hover:bg-gray-100'>
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className='px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:opacity-90'>
            Assign Rider
          </button>
        </div>
      </div>
    </div>
  );
}
