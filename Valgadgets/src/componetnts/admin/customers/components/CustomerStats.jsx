import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  ShoppingBag,
  Wallet,
  TrendingUp,
  UserX,
} from 'lucide-react';

export default function CustomerStats({ customers = [] }) {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter((c) => c.status === 'Active').length;

  const suspendedCustomers = customers.filter(
    (c) => c.status === 'Suspended',
  ).length;

  const vipCustomers = customers.filter((c) => c.vip).length;

  const totalOrders = customers.reduce(
    (sum, c) => sum + (c.totalOrders || 0),
    0,
  );

  const totalRevenue = customers.reduce(
    (sum, c) => sum + (c.totalSpent || 0),
    0,
  );

  const averageSpend =
    totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers) : 0;

  const today = new Date().toISOString().split('T')[0];

  const newToday = customers.filter((c) => c.joined === today).length;

  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active',
      value: activeCustomers.toLocaleString(),
      icon: UserCheck,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'New Today',
      value: newToday.toLocaleString(),
      icon: UserPlus,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'VIP Customers',
      value: vipCustomers.toLocaleString(),
      icon: Crown,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: Wallet,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Average Spend',
      value: `₦${averageSpend.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Suspended',
      value: suspendedCustomers.toLocaleString(),
      icon: UserX,
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className='bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>{stat.title}</p>

                <h2 className='mt-2 text-3xl font-bold text-[#1E2A20]'>
                  {stat.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
