import { Star, ShoppingCart, TrendingUp, Eye } from 'lucide-react';

export default function TopProducts() {
  const products = [
    {
      id: 1,
      name: 'iPhone 16 Pro Max',
      category: 'Smartphones',
      image: 'https://picsum.photos/200?1',
      sold: 452,
      revenue: 678000000,
      stock: 38,
      rating: 4.9,
      views: 14582,
    },
    {
      id: 2,
      name: 'MacBook Pro M4',
      category: 'Laptops',
      image: 'https://picsum.photos/200?2',
      sold: 218,
      revenue: 524000000,
      stock: 15,
      rating: 4.8,
      views: 9735,
    },
    {
      id: 3,
      name: 'Samsung S25 Ultra',
      category: 'Smartphones',
      image: 'https://picsum.photos/200?3',
      sold: 385,
      revenue: 412000000,
      stock: 52,
      rating: 4.8,
      views: 11842,
    },
    {
      id: 4,
      name: 'Apple Watch Ultra 2',
      category: 'Wearables',
      image: 'https://picsum.photos/200?4',
      sold: 264,
      revenue: 138500000,
      stock: 61,
      rating: 4.9,
      views: 8245,
    },
    {
      id: 5,
      name: 'Sony WH-1000XM6',
      category: 'Accessories',
      image: 'https://picsum.photos/200?5',
      sold: 510,
      revenue: 91800000,
      stock: 102,
      rating: 4.7,
      views: 13681,
    },
  ];

  return (
    <div className='bg-white rounded-3xl border shadow-sm'>
      {/* Header */}

      <div className='flex items-center justify-between p-6 border-b'>
        <div>
          <h2 className='text-2xl font-bold'>Top Selling Products</h2>

          <p className='text-gray-500 mt-1'>
            Best performing products this month
          </p>
        </div>

        <button
          className='
            px-5
            py-2
            rounded-xl
            bg-[#2F4832]
            text-white
            hover:bg-[#243927]
            transition
          '>
          View Products
        </button>
      </div>

      {/* Products */}

      <div className='divide-y'>
        {products.map((product) => (
          <div
            key={product.id}
            className='
              p-5
              hover:bg-gray-50
              transition
            '>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              {/* Product */}

              <div className='flex items-center gap-5'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-20 h-20 rounded-2xl object-cover border'
                />

                <div>
                  <h3 className='font-bold text-lg'>{product.name}</h3>

                  <p className='text-gray-500 text-sm'>{product.category}</p>

                  <div className='flex items-center gap-1 mt-2 text-yellow-500'>
                    <Star size={16} fill='currentColor' />

                    <span className='font-medium text-gray-700'>
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics */}

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='text-center'>
                  <ShoppingCart
                    size={18}
                    className='mx-auto text-[#2F4832] mb-1'
                  />

                  <p className='font-bold text-lg'>{product.sold}</p>

                  <p className='text-xs text-gray-500'>Sold</p>
                </div>

                <div className='text-center'>
                  <TrendingUp
                    size={18}
                    className='mx-auto text-green-600 mb-1'
                  />

                  <p className='font-bold text-lg text-[#2F4832]'>
                    ₦{(product.revenue / 1000000).toFixed(1)}M
                  </p>

                  <p className='text-xs text-gray-500'>Revenue</p>
                </div>

                <div className='text-center'>
                  <Eye size={18} className='mx-auto text-blue-600 mb-1' />

                  <p className='font-bold text-lg'>
                    {product.views.toLocaleString()}
                  </p>

                  <p className='text-xs text-gray-500'>Views</p>
                </div>

                <div className='text-center'>
                  <p className='font-bold text-lg text-orange-600'>
                    {product.stock}
                  </p>

                  <p className='text-xs text-gray-500'>In Stock</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
