import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../ui/Breadcrumbs';

export default function CartPage() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  return (
    <section className='max-w-7xl mx-auto px-6 py-10'>
      {' '}
      <Breadcrumbs product={null} />
      {/* HEADER */}
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-4xl font-bold'>My Cart</h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className='text-red-500 font-medium hover:underline'>
            Clear Cart
          </button>
        )}
      </div>
      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className='text-center py-20'>
          <ShoppingBag size={60} className='mx-auto text-gray-400 mb-4' />

          <h2 className='text-2xl font-semibold'>Your cart is empty</h2>

          <p className='text-gray-500 mt-2'>Add products to see them here</p>

          <Link
            to='/'
            className='inline-block mt-6 bg-[#2F4832] text-white px-6 py-3 rounded-xl'>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* CART ITEMS */}
          <div className='lg:col-span-2 space-y-4'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm'>
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-24 h-24 object-cover rounded-xl'
                />

                {/* DETAILS */}
                <div className='flex-1'>
                  <h3 className='font-semibold'>{item.name}</h3>

                  <p className='text-gray-500 text-sm'>{item.brand}</p>

                  <div className='mt-2'>
                    <p className='font-bold'>₦{item.price.toLocaleString()}</p>

                    <p className='text-sm text-gray-500'>
                      Subtotal: ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className='p-2 bg-gray-100 rounded-lg'>
                    <Minus size={16} />
                  </button>

                  <span className='w-8 text-center font-medium'>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className='p-2 bg-gray-100 rounded-lg'>
                    <Plus size={16} />
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-500 hover:text-red-700 p-2'>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className='bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            <div className='space-y-3 text-gray-600'>
              <div className='flex justify-between'>
                <span>Products</span>
                <span>{cart.length}</span>
              </div>

              <div className='flex justify-between'>
                <span>Quantity</span>
                <span>{cartCount}</span>
              </div>

              <hr />

              <div className='flex justify-between text-lg'>
                <span>Total</span>

                <span className='font-bold text-black'>
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className='w-full mt-6 bg-[#2F4832] text-white py-3 rounded-xl font-semibold hover:opacity-90'>
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
