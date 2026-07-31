import { Users, UserPlus, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function CustomerInsights() {
  const stats = [
    {
      title: 'Total Customers',
      value: '8,426',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'New Customers',
      value: '248',
      icon: UserPlus,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Returning',
      value: '6,384',
      icon: UserCheck,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Inactive',
      value: '1,794',
      icon: UserX,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const topCustomers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      orders: 42,
      spent: 3450000,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Mary Johnson',
      email: 'mary@gmail.com',
      orders: 37,
      spent: 2810000,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'David James',
      email: 'david@gmail.com',
      orders: 29,
      spent: 1960000,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'Grace Williams',
      email: 'grace@gmail.com',
      orders: 24,
      spent: 1725000,
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  ];

  return (
    <div className='bg-white rounded-3xl shadow-sm border p-6'>
      {/* Header */}

      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-2xl font-bold'>Customer Insights</h2>

          <p className='text-gray-500 mt-1'>Customer growth and top spenders</p>
        </div>

        <button className='px-5 py-2 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white transition'>
          View Customers
        </button>
      </div>

      {/* Stats */}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className='rounded-2xl border p-5 hover:shadow-md transition'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>{item.title}</p>

                  <h3 className='text-2xl font-bold mt-2'>{item.value}</h3>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Customers */}

      <div>
        <div className='flex items-center gap-2 mb-5'>
          <TrendingUp size={20} className='text-[#2F4832]' />

          <h3 className='font-bold text-lg'>Top Customers</h3>
        </div>

        <div className='space-y-4'>
          {topCustomers.map((customer) => (
            <div
              key={customer.id}
              className='flex items-center justify-between border rounded-2xl p-4 hover:shadow-md transition'>
              <div className='flex items-center gap-4'>
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className='w-14 h-14 rounded-full object-cover'
                />

                <div>
                  <h4 className='font-semibold'>{customer.name}</h4>

                  <p className='text-sm text-gray-500'>{customer.email}</p>
                </div>
              </div>

              <div className='hidden md:block text-center'>
                <p className='text-sm text-gray-500'>Orders</p>

                <p className='font-bold'>{customer.orders}</p>
              </div>

              <div className='text-right'>
                <p className='text-sm text-gray-500'>Total Spent</p>

                <p className='font-bold text-[#2F4832]'>
                  ₦{customer.spent.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
