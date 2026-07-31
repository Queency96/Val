import { useState } from 'react';
import { Bike, User, Phone, Star, X } from 'lucide-react';

export default function AssignRiderModal({ open, onClose, delivery }) {
  const [selectedRider, setSelectedRider] = useState('');

  if (!open || !delivery) return null;

  const riders = [
    {
      id: 1,
      name: 'Samuel Johnson',
      phone: '08034567891',
      rating: 4.9,
      deliveries: 1248,
      vehicle: 'Honda Bike',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Michael David',
      phone: '08123456789',
      rating: 4.8,
      deliveries: 978,
      vehicle: 'TVS Bike',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Emmanuel Peter',
      phone: '09012345678',
      rating: 4.7,
      deliveries: 785,
      vehicle: 'Box Van',
      status: 'Busy',
    },
    {
      id: 4,
      name: 'James Williams',
      phone: '07098765432',
      rating: 4.9,
      deliveries: 1465,
      vehicle: 'Motorcycle',
      status: 'Available',
    },
  ];

  const assignRider = () => {
    const rider = riders.find((r) => String(r.id) === selectedRider);

    if (!rider) {
      alert('Please select a rider.');
      return;
    }

    alert(`${rider.name} has been assigned to Delivery #${delivery.id}`);

    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center'>
              <Bike className='text-blue-600' size={28} />
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Assign Rider</h2>

              <p className='text-gray-500'>
                Select a rider for Delivery #{delivery.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center'>
            <X size={20} />
          </button>
        </div>

        {/* Delivery Summary */}

        <div className='px-6 pt-6'>
          <div className='bg-gray-50 rounded-2xl p-5 border'>
            <div className='grid md:grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-gray-500'>Customer</p>

                <h4 className='font-semibold'>{delivery.customer?.name}</h4>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Tracking</p>

                <h4 className='font-semibold'>{delivery.tracking}</h4>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Delivery Address</p>

                <h4 className='font-semibold'>{delivery.address}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Riders */}

        <div className='p-6 max-h-[420px] overflow-y-auto space-y-4'>
          {riders.map((rider) => (
            <label
              key={rider.id}
              className={`block border rounded-2xl p-5 cursor-pointer transition ${
                selectedRider === String(rider.id)
                  ? 'border-[#2F4832] bg-green-50'
                  : 'hover:border-gray-300'
              }`}>
              <div className='flex items-start gap-4'>
                <input
                  type='radio'
                  name='rider'
                  value={rider.id}
                  checked={selectedRider === String(rider.id)}
                  onChange={(e) => setSelectedRider(e.target.value)}
                  className='mt-2'
                />

                <div className='w-14 h-14 rounded-full bg-[#2F4832] text-white flex items-center justify-center'>
                  <User size={24} />
                </div>

                <div className='flex-1'>
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='font-bold text-lg'>{rider.name}</h3>

                      <div className='flex items-center gap-2 mt-1 text-gray-500'>
                        <Phone size={14} />

                        <span>{rider.phone}</span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rider.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {rider.status}
                    </span>
                  </div>

                  <div className='grid grid-cols-3 gap-5 mt-5 text-sm'>
                    <div>
                      <p className='text-gray-500'>Rating</p>

                      <div className='flex items-center gap-1 font-semibold'>
                        <Star
                          size={16}
                          fill='currentColor'
                          className='text-yellow-500'
                        />

                        {rider.rating}
                      </div>
                    </div>

                    <div>
                      <p className='text-gray-500'>Deliveries</p>

                      <p className='font-semibold'>{rider.deliveries}</p>
                    </div>

                    <div>
                      <p className='text-gray-500'>Vehicle</p>

                      <p className='font-semibold'>{rider.vehicle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-5 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl border hover:bg-gray-100'>
            Cancel
          </button>

          <button
            onClick={assignRider}
            className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white font-semibold'>
            Assign Rider
          </button>
        </div>
      </div>
    </div>
  );
}
