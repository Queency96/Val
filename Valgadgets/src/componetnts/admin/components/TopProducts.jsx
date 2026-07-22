import { Trophy } from 'lucide-react';

export default function TopProducts({ orders = [] }) {
  // =========================
  // BUILD PRODUCT STATS
  // =========================
  const products = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (!products[item.id]) {
        products[item.id] = {
          id: item.id,
          name: item.name,
          image: item.image,
          quantity: 0,
          revenue: 0,
        };
      }

      products[item.id].quantity += item.quantity || 1;
      products[item.id].revenue += (item.price || 0) * (item.quantity || 1);
    });
  });

  const list = Object.values(products)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  const maxSales = Math.max(...list.map((p) => p.quantity), 1);

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center'>
          <Trophy className='text-yellow-600' size={22} />
        </div>

        <div>
          <h2 className='text-xl font-bold'>Top Selling Products</h2>

          <p className='text-sm text-gray-500'>Best performing products</p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>No sales yet.</div>
      ) : (
        <div className='space-y-5'>
          {list.map((product, index) => (
            <div key={product.id} className='flex items-center gap-4'>
              {/* Rank */}
              <div className='w-8 text-center font-bold text-gray-500'>
                #{index + 1}
              </div>

              {/* Image */}
              <img
                src={product.image || 'https://via.placeholder.com/70'}
                alt={product.name}
                className='w-14 h-14 rounded-xl object-cover border'
              />

              {/* Info */}
              <div className='flex-1'>
                <h3 className='font-semibold line-clamp-1'>{product.name}</h3>

                <div className='flex justify-between text-sm mt-1'>
                  <span className='text-gray-500'>{product.quantity} sold</span>

                  <span className='font-semibold text-[#2F4832]'>
                    ₦{product.revenue.toLocaleString()}
                  </span>
                </div>

                {/* Progress */}
                <div className='mt-2 h-2 bg-gray-200 rounded-full overflow-hidden'>
                  <div
                    className='bg-[#2F4832] h-full rounded-full transition-all'
                    style={{
                      width: `${(product.quantity / maxSales) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
