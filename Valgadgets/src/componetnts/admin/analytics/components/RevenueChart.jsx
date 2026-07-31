import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function RevenueChart({ range }) {
  const data = [
    { month: 'Jan', revenue: 2800000 },
    { month: 'Feb', revenue: 3500000 },
    { month: 'Mar', revenue: 4200000 },
    { month: 'Apr', revenue: 3900000 },
    { month: 'May', revenue: 5100000 },
    { month: 'Jun', revenue: 6100000 },
    { month: 'Jul', revenue: 7200000 },
    { month: 'Aug', revenue: 6800000 },
    { month: 'Sep', revenue: 7600000 },
    { month: 'Oct', revenue: 8900000 },
    { month: 'Nov', revenue: 9700000 },
    { month: 'Dec', revenue: 11200000 },
  ];

  return (
    <div className='bg-white rounded-3xl shadow-sm border p-6'>
      {/* Header */}

      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-2xl font-bold'>Revenue Overview</h2>

          <p className='text-gray-500 mt-1'>Monthly revenue performance</p>
        </div>

        <div className='text-right'>
          <p className='text-sm text-gray-500'>Total Revenue</p>

          <h3 className='text-3xl font-bold text-[#2F4832]'>₦73.4M</h3>
        </div>
      </div>

      {/* Chart */}

      <div className='h-[380px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='revenueGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#2F4832' stopOpacity={0.35} />

                <stop offset='95%' stopColor='#2F4832' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#E5E7EB'
            />

            <XAxis
              dataKey='month'
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => `₦${value / 1000000}M`}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₦${Number(value).toLocaleString()}`,
                'Revenue',
              ]}
              contentStyle={{
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,.12)',
              }}
            />

            <Area
              type='monotone'
              dataKey='revenue'
              stroke='#2F4832'
              strokeWidth={4}
              fill='url(#revenueGradient)'
              activeDot={{
                r: 7,
                fill: '#FFB800',
                stroke: '#2F4832',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
