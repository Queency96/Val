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

export default function SalesChart() {
  const data = [
    { month: 'Jan', sales: 120 },
    { month: 'Feb', sales: 165 },
    { month: 'Mar', sales: 180 },
    { month: 'Apr', sales: 210 },
    { month: 'May', sales: 245 },
    { month: 'Jun', sales: 280 },
    { month: 'Jul', sales: 325 },
    { month: 'Aug', sales: 305 },
    { month: 'Sep', sales: 340 },
    { month: 'Oct', sales: 390 },
    { month: 'Nov', sales: 425 },
    { month: 'Dec', sales: 510 },
  ];

  return (
    <div className='bg-white rounded-3xl shadow-sm border p-6'>
      {/* Header */}

      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-2xl font-bold'>Sales Performance</h2>

          <p className='text-gray-500 mt-1'>
            Number of completed orders each month
          </p>
        </div>

        <div className='text-right'>
          <p className='text-sm text-gray-500'>Total Sales</p>

          <h3 className='text-3xl font-bold text-[#2F4832]'>3,495</h3>
        </div>
      </div>

      {/* Chart */}

      <div className='h-[380px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} barCategoryGap={18}>
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

            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`${value} Orders`, 'Sales']}
              contentStyle={{
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,.12)',
              }}
            />

            <Bar dataKey='sales' radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.sales >= 400 ? '#FFB800' : '#2F4832'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
