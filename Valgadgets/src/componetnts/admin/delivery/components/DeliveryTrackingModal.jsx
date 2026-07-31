import {
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  Navigation,
  Phone,
  User,
  X,
} from 'lucide-react';

export default function DeliveryTrackingModal({ open, onClose, delivery }) {
  if (!open || !delivery) return null;

  const trackingSteps = [
    {
      title: 'Order Confirmed',
      time: '09:00 AM',
      completed: true,
    },
    {
      title: 'Rider Assigned',
      time: '09:15 AM',
      completed: true,
    },
    {
      title: 'Package Picked Up',
      time: '10:05 AM',
      completed: true,
    },
    {
      title: 'In Transit',
      time: '11:20 AM',
      completed:
        delivery.status === 'In Transit' || delivery.status === 'Delivered',
    },
    {
      title: 'Delivered',
      time: '--',
      completed: delivery.status === 'Delivered',
    },
  ];

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center p-6 border-b'>
          <div>
            <h2 className='text-2xl font-bold'>Delivery Tracking</h2>

            <p className='text-gray-500'>Track package progress</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <div className='p-6 space-y-8'>
          {/* Tracking Summary */}

          <div className='grid lg:grid-cols-3 gap-5'>
            <div className='border rounded-2xl p-5'>
              <p className='text-gray-500 text-sm'>Tracking Number</p>

              <h3 className='font-bold text-xl mt-2'>{delivery.tracking}</h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <p className='text-gray-500 text-sm'>Current Status</p>

              <h3 className='font-bold text-xl text-[#2F4832] mt-2'>
                {delivery.status}
              </h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <p className='text-gray-500 text-sm'>Estimated Arrival</p>

              <h3 className='font-bold text-xl mt-2'>Today 5:30 PM</h3>
            </div>
          </div>

          {/* Live Map */}

          <div className='rounded-3xl overflow-hidden border'>
            <div className='bg-gray-100 h-72 flex flex-col justify-center items-center'>
              <Navigation size={60} className='text-[#2F4832]' />

              <h3 className='mt-4 text-xl font-bold'>Live GPS Tracking</h3>

              <p className='text-gray-500 mt-2'>
                Google Maps integration placeholder
              </p>
            </div>
          </div>

          {/* Addresses */}

          <div className='grid lg:grid-cols-2 gap-5'>
            <div className='border rounded-2xl p-5'>
              <div className='flex gap-3 items-start'>
                <MapPin className='text-green-600 mt-1' size={22} />

                <div>
                  <h4 className='font-bold'>Pickup Address</h4>

                  <p className='text-gray-500 mt-2'>{delivery.pickup}</p>
                </div>
              </div>
            </div>

            <div className='border rounded-2xl p-5'>
              <div className='flex gap-3 items-start'>
                <MapPin className='text-red-500 mt-1' size={22} />

                <div>
                  <h4 className='font-bold'>Delivery Address</h4>

                  <p className='text-gray-500 mt-2'>{delivery.destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rider */}

          <div className='border rounded-3xl p-6'>
            <h3 className='font-bold text-xl mb-5'>Assigned Rider</h3>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 rounded-full bg-[#2F4832] text-white flex items-center justify-center'>
                  <User size={28} />
                </div>

                <div>
                  <h4 className='font-bold'>
                    {delivery.rider || 'Not Assigned'}
                  </h4>

                  <p className='text-gray-500'>Motorcycle Rider</p>
                </div>
              </div>

              <button className='px-5 py-3 rounded-xl bg-[#2F4832] text-white hover:bg-[#243927] flex items-center gap-2'>
                <Phone size={18} />
                Call Rider
              </button>
            </div>
          </div>

          {/* Timeline */}

          <div>
            <h3 className='text-xl font-bold mb-6'>Delivery Timeline</h3>

            <div className='space-y-5'>
              {trackingSteps.map((step, index) => (
                <div key={index} className='flex gap-5'>
                  <div>
                    {step.completed ? (
                      <div className='w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center'>
                        <CheckCircle size={22} />
                      </div>
                    ) : (
                      <div className='w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center'>
                        <Clock size={20} />
                      </div>
                    )}

                    {index !== trackingSteps.length - 1 && (
                      <div className='w-[2px] h-10 bg-gray-200 mx-auto'></div>
                    )}
                  </div>

                  <div className='pb-6'>
                    <h4 className='font-semibold'>{step.title}</h4>

                    <p className='text-gray-500 text-sm mt-1'>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}

          <div className='grid md:grid-cols-4 gap-4'>
            <div className='border rounded-xl p-4 text-center'>
              <Truck size={22} className='mx-auto text-[#2F4832]' />

              <p className='text-gray-500 text-sm mt-2'>Vehicle</p>

              <p className='font-bold'>Motorcycle</p>
            </div>

            <div className='border rounded-xl p-4 text-center'>
              <Clock size={22} className='mx-auto text-yellow-600' />

              <p className='text-gray-500 text-sm mt-2'>Distance</p>

              <p className='font-bold'>12.5 km</p>
            </div>

            <div className='border rounded-xl p-4 text-center'>
              <Navigation size={22} className='mx-auto text-blue-600' />

              <p className='text-gray-500 text-sm mt-2'>Duration</p>

              <p className='font-bold'>32 mins</p>
            </div>

            <div className='border rounded-xl p-4 text-center'>
              <CheckCircle size={22} className='mx-auto text-green-600' />

              <p className='text-gray-500 text-sm mt-2'>Delivery Fee</p>

              <p className='font-bold'>₦{delivery.fee?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
