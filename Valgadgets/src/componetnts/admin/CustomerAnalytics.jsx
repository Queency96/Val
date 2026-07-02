import {
  Users,
  UserPlus,
  UserCheck,
  ShoppingBag,
  TrendingUp,
  Crown,
} from 'lucide-react';


export default function CustomerAnalytics({ orders = [] }) {
  // =========================
  // CUSTOMER LIST
  // =========================
  const customerMap = {};

  orders.forEach((order) => {
    const phone = order.customer?.phone || order.customer?.email || order.id;

    if (!customerMap[phone]) {
      customerMap[phone] = {
        name: order.customer?.name || 'Unknown Customer',
        phone: order.customer?.phone || '--',
        email: order.customer?.email || '--',
        orders: 0,
        spent: 0,
      };
    }

    customerMap[phone].orders += 1;
    customerMap[phone].spent += order.total || 0;
  });

  const customers = Object.values(customerMap);

  // =========================
  // ANALYTICS
  // =========================
  const totalCustomers = customers.length;

  const repeatCustomers = customers.filter((c) => c.orders > 1).length;

  const newCustomers = customers.filter((c) => c.orders === 1).length;

  const averageSpend =
    totalCustomers === 0
      ? 0
      : customers.reduce((a, b) => a + b.spent, 0) / totalCustomers;

  const topCustomers = [...customers]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 8);

  return (
    <div className='space-y-8'>
      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
        <div className='bg-white rounded-2xl shadow-sm border p-5'>
          <Users className='text-[#2F4832] mb-3' size={30} />

          <p className='text-gray-500 text-sm'>Customers</p>

          <h2 className='text-3xl font-bold mt-1'>{totalCustomers}</h2>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border p-5'>
          <UserPlus className='text-blue-600 mb-3' size={30} />

          <p className='text-gray-500 text-sm'>New Customers</p>

          <h2 className='text-3xl font-bold mt-1'>{newCustomers}</h2>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border p-5'>
          <UserCheck className='text-green-600 mb-3' size={30} />

          <p className='text-gray-500 text-sm'>Repeat Buyers</p>

          <h2 className='text-3xl font-bold mt-1'>{repeatCustomers}</h2>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border p-5'>
          <TrendingUp className='text-orange-500 mb-3' size={30} />

          <p className='text-gray-500 text-sm'>Avg. Spend</p>

          <h2 className='text-3xl font-bold mt-1'>
            ₦{averageSpend.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* =========================
          TOP CUSTOMERS
      ========================== */}

      <div className='bg-white rounded-2xl border shadow-sm'>
        <div className='flex items-center gap-3 px-6 py-5 border-b'>
          <Crown className='text-yellow-500' size={24} />

          <div>
            <h2 className='text-xl font-bold'>Top Customers</h2>

            <p className='text-sm text-gray-500'>Highest spending customers</p>
          </div>
        </div>

        {topCustomers.length === 0 ? (
          <div className='py-14 text-center text-gray-500'>
            No customer data available.
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='text-left px-6 py-4'>Customer</th>

                  <th className='text-left px-6 py-4'>Phone</th>

                  <th className='text-center px-6 py-4'>Orders</th>

                  <th className='text-right px-6 py-4'>Total Spent</th>
                </tr>
              </thead>

              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={index} className='border-t hover:bg-gray-50'>
                    <td className='px-6 py-5'>
                      <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-full bg-[#2F4832] text-white flex items-center justify-center font-bold'>
                          {customer.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className='font-semibold'>{customer.name}</p>

                          <p className='text-sm text-gray-500'>
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-5'>{customer.phone}</td>

                    <td className='text-center px-6 py-5'>
                      <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full'>
                        <ShoppingBag size={16} />

                        {customer.orders}
                      </div>
                    </td>

                    <td className='text-right px-6 py-5 font-bold text-green-700'>
                      ₦{customer.spent.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
