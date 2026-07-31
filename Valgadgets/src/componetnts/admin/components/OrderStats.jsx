import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

export default function OrderStats({ orders }) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending',
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === 'Processing',
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered',
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => (order.payment === 'Paid' ? sum + order.total : sum),
    0,
  );

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: pendingOrders,
      icon: Clock3,
      color: 'bg-yellow-500',
    },
    {
      title: 'Processing',
      value: processingOrders,
      icon: Truck,
      color: 'bg-orange-500',
    },
    {
      title: 'Delivered',
      value: deliveredOrders,
      icon: CheckCircle2,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-[#2F4832]',
    },
  ];

  return (
    <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-5'>
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className='
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-5
              hover:shadow-lg
              transition
            '>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>{stat.title}</p>

                <h2 className='mt-2 text-3xl font-bold text-gray-800'>
                  {stat.value}
                </h2>
              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-white
                  ${stat.color}
                `}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
