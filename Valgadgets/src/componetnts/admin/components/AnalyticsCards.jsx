import {
  DollarSign,
  ShoppingCart,
  Users,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  TrendingUp,
} from 'lucide-react';

export default function AnalyticsCards({
  totalRevenue = 50,
  totalOrders = 20,
  totalCustomers = 70,
  pendingOrders = 80,
  paidOrders = 40,
  deliveredOrders = 80,
  cancelledOrders = 90,
}) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-700',
      border: 'border-green-200',
    },
    {
      title: 'Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-700',
      border: 'border-blue-200',
    },
    {
      title: 'Customers',
      value: totalCustomers,
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      border: 'border-purple-200',
    },
    {
      title: 'Pending',
      value: pendingOrders,
      icon: Clock3,
      color: 'bg-yellow-100 text-yellow-700',
      border: 'border-yellow-200',
    },
    {
      title: 'Paid',
      value: paidOrders,
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
    },
    {
      title: 'Delivered',
      value: deliveredOrders,
      icon: Truck,
      color: 'bg-cyan-100 text-cyan-700',
      border: 'border-cyan-200',
    },
    {
      title: 'Cancelled',
      value: cancelledOrders,
      icon: XCircle,
      color: 'bg-red-100 text-red-700',
      border: 'border-red-200',
    },
    {
      title: 'Growth',
      value: '+18%',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-700',
      border: 'border-indigo-200',
    },
  ];

  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`bg-white border ${card.border} rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>{card.title}</p>

                <h2 className='mt-2 text-3xl font-bold'>{card.value}</h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}>
                <Icon size={28} />
              </div>
            </div>

            <div className='mt-6 flex items-center justify-between text-xs'>
              <span className='text-green-600 font-semibold'>↑ 12.5%</span>

              <span className='text-gray-400'>vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
