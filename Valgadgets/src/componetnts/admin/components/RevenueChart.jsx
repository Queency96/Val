import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function RevenueChart({ orders = [], revenue = 0 }) {
  // =========================
  // BUILD MONTHLY DATA
  // =========================
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyRevenue = months.map((month, index) => {
    const total = orders
      .filter((order) => {
        if (!order.createdAt) return false;

        const date = new Date(order.createdAt);

        return date.getMonth() === index;
      })
      .reduce((sum, order) => sum + (order.total || 0), 0);

    return {
      month,
      revenue: total,
    };
  });

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-6'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Revenue Overview</h2>

          <p className='text-gray-500 text-sm mt-1'>
            Monthly revenue generated
          </p>
        </div>

        <div className='text-right'>
          <p className='text-sm text-gray-500'>Total Revenue</p>

          <h3 className='text-3xl font-bold text-[#2F4832]'>
            ₦{revenue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* CHART */}

      <ResponsiveContainer width='100%' height={350}>
        <AreaChart data={monthlyRevenue}>
          <defs>
            <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#2F4832' stopOpacity={0.8} />

              <stop offset='95%' stopColor='#2F4832' stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='month' />

          <YAxis />

          <Tooltip
            formatter={(value) => `₦${Number(value).toLocaleString()}`}
          />

          <Area
            type='monotone'
            dataKey='revenue'
            stroke='#2F4832'
            fill='url(#colorRevenue)'
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
