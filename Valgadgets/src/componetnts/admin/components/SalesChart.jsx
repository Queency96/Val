import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export default function SalesChart({ orders = [] }) {
  // =========================
  // DAYS OF WEEK
  // =========================
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Count orders by weekday
  const chartData = days.map((day, index) => {
    const count = orders.filter((order) => {
      if (!order.createdAt) return false;

      return new Date(order.createdAt).getDay() === index;
    }).length;

    return {
      day,
      orders: count,
    };
  });

  const colors = [
    '#2F4832',
    '#3F5E42',
    '#4D7050',
    '#5E8661',
    '#6F9A72',
    '#81AF84',
    '#93C497',
  ];

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-6'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Weekly Sales</h2>

          <p className='text-gray-500 text-sm'>Orders received this week</p>
        </div>

        <div className='text-right'>
          <h3 className='text-3xl font-bold text-[#2F4832]'>{orders.length}</h3>

          <p className='text-sm text-gray-500'>Total Orders</p>
        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width='100%' height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='day' />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey='orders' radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={entry.day} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
