import { X, Activity, ShoppingBag, CreditCard, Truck } from 'lucide-react';

export default function CustomerActivityModal({ open, customer, onClose }) {
  if (!open || !customer) return null;

  // Replace with API data later
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Placed a new order',
      description: 'Order #10245 - iPhone 16 Pro',
      time: 'Today • 10:25 AM',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      description: '₦245,000 paid via Flutterwave',
      time: 'Today • 10:28 AM',
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Order Shipped',
      description: 'Tracking ID: VG2039485',
      time: 'Yesterday • 03:45 PM',
    },
    {
      id: 4,
      type: 'order',
      title: 'Wishlist Updated',
      description: 'Added Samsung S25 Ultra',
      time: '2 days ago',
    },
    {
      id: 5,
      type: 'payment',
      title: 'Refund Processed',
      description: '₦35,000 refunded',
      time: '5 days ago',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={20} className='text-blue-600' />;

      case 'payment':
        return <CreditCard size={20} className='text-green-600' />;

      case 'delivery':
        return <Truck size={20} className='text-orange-600' />;

      default:
        return <Activity size={20} className='text-gray-600' />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100';

      case 'payment':
        return 'bg-green-100';

      case 'delivery':
        return 'bg-orange-100';

      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-[#2F4832]/10 flex items-center justify-center'>
              <Activity size={24} className='text-[#2F4832]' />
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Customer Activity</h2>

              <p className='text-sm text-gray-500'>
                {customer.name}'s activity timeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Timeline */}

        <div className='overflow-y-auto max-h-[70vh] p-8'>
          <div className='relative border-l-2 border-gray-200 ml-6'>
            {activities.map((activity) => (
              <div key={activity.id} className='relative pl-10 pb-10'>
                {/* Circle */}

                <div
                  className={`absolute -left-5 w-10 h-10 rounded-full flex items-center justify-center ${getColor(
                    activity.type,
                  )}`}>
                  {getIcon(activity.type)}
                </div>

                {/* Card */}

                <div className='bg-gray-50 rounded-2xl p-5 hover:shadow-md transition'>
                  <div className='flex justify-between items-start gap-4'>
                    <div>
                      <h3 className='font-semibold text-lg'>
                        {activity.title}
                      </h3>

                      <p className='text-gray-600 mt-1'>
                        {activity.description}
                      </p>
                    </div>

                    <span className='text-xs text-gray-500 whitespace-nowrap'>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-5 flex justify-between items-center'>
          <p className='text-sm text-gray-500'>
            Showing recent customer activities.
          </p>

          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white transition'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
