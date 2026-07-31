import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  Gamepad2,
} from 'lucide-react';

export default function TopCategories() {
  const categories = [
    {
      name: 'Smartphones',
      icon: Smartphone,
      sales: 1248,
      revenue: 18450000,
      percentage: 92,
      color: 'bg-blue-500',
    },
    {
      name: 'Laptops',
      icon: Laptop,
      sales: 842,
      revenue: 16200000,
      percentage: 80,
      color: 'bg-[#2F4832]',
    },
    {
      name: 'Accessories',
      icon: Headphones,
      sales: 1750,
      revenue: 8450000,
      percentage: 72,
      color: 'bg-purple-500',
    },
    {
      name: 'Smart Watches',
      icon: Watch,
      sales: 634,
      revenue: 6120000,
      percentage: 60,
      color: 'bg-yellow-500',
    },
    {
      name: 'Tablets',
      icon: Tablet,
      sales: 438,
      revenue: 4830000,
      percentage: 45,
      color: 'bg-pink-500',
    },
    {
      name: 'Gaming',
      icon: Gamepad2,
      sales: 321,
      revenue: 3910000,
      percentage: 38,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className='bg-white rounded-3xl shadow-sm border p-6'>
      {/* Header */}

      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-2xl font-bold'>Top Selling Categories</h2>

          <p className='text-gray-500 mt-1'>
            Best performing product categories
          </p>
        </div>

        <button
          className='
            px-4
            py-2
            rounded-xl
            bg-[#2F4832]
            hover:bg-[#243927]
            text-white
            transition
          '>
          View Report
        </button>
      </div>

      {/* Categories */}

      <div className='space-y-6'>
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.name}
              className='
                rounded-2xl
                border
                p-5
                hover:shadow-md
                transition
              '>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-2xl
                      ${category.color}
                      text-white
                      flex
                      items-center
                      justify-center
                    `}>
                    <Icon size={26} />
                  </div>

                  <div>
                    <h3 className='font-bold text-lg'>{category.name}</h3>

                    <p className='text-gray-500 text-sm'>
                      {category.sales.toLocaleString()} Products Sold
                    </p>
                  </div>
                </div>

                <div className='text-right'>
                  <p className='text-2xl font-bold text-[#2F4832]'>
                    ₦{category.revenue.toLocaleString()}
                  </p>

                  <p className='text-sm text-gray-500'>Revenue</p>
                </div>
              </div>

              {/* Progress */}

              <div className='mt-5'>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-500'>Performance</span>

                  <span className='font-semibold'>{category.percentage}%</span>
                </div>

                <div className='w-full h-3 rounded-full bg-gray-100 overflow-hidden'>
                  <div
                    className={`${category.color} h-full rounded-full transition-all duration-700`}
                    style={{
                      width: `${category.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
