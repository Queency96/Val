import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function StickyCheckoutBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, [location]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.flashPrice ?? item.price) * item.quantity,
    0,
  );

  const isHidden =
    location.pathname.includes('checkout') ||
    location.pathname.includes('admin');

  if (isHidden || totalItems === 0) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
      <div className='bg-white border-t shadow-lg px-4 py-3 flex items-center justify-between'>
        {/* LEFT */}
        <div>
          <p className='text-sm text-gray-500'>
            {totalItems} item{totalItems > 1 ? 's' : ''}
          </p>

          <p className='font-bold text-[#2F4832]'>
            ₦{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => navigate('/checkout')}
          className='bg-[#2F4832] text-white px-5 py-3 rounded-xl font-semibold'>
          Checkout
        </button>
      </div>
    </div>
  );
}
