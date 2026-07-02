import { Heart, Bell, ShoppingCart, User, Search } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/ValGadgets_Logo.png';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [openAuth, setOpenAuth] = useState(false);
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // ✅ SAFE GLOBAL STATES
  const { wishlist = [] } = useWishlist();
  const { cart = [] } = useCart();

  const wishlistCount = wishlist.length;
  const cartCount = cart.length;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* TOP STRIP */}
      <div className='bg-black text-white text-sm py-2 text-center'>
        Free Delivery in Lagos • Pay on Delivery • 24/7 Support
      </div>

      {/* HEADER */}
      <header className='sticky top-0 z-50 bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6'>
          {/* LOGO */}
          <div
            className='flex items-center gap-3 cursor-pointer'
            onClick={() => navigate('/')}>
            <img
              src={Logo}
              alt='ValGadgets Logo'
              className='w-28 hover:opacity-80 transition'
            />

            <h1 className='text-xl font-bold text-[#2F4832] hover:opacity-80 transition'>
              Valgadgets
            </h1>
          </div>

          {/* SEARCH */}
          <div className='flex-1 max-w-2xl relative'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder='Search phones, laptops, TVs...'
              className='w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2F4832]'
            />
          </div>

          {/* ACTION ICONS */}
          <div className='flex items-center gap-5 text-gray-700'>
            {/* WISHLIST */}
            <button
              onClick={() => navigate('/wishlist')}
              className='relative hover:text-red-500 transition p-2 rounded-lg'>
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full'>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              onClick={() => navigate('/cart')}
              className='relative hover:text-[#2F4832] transition p-2 rounded-lg'>
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-gray-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full'>
                  {cartCount}
                </span>
              )}
            </button>

            {/* NOTIFICATIONS */}
            <button className='hover:text-yellow-500 transition p-2 rounded-lg'>
              <Bell size={20} />
            </button>

            {/* USER */}
            
            {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
            {user ? (
              <button
                onClick={logout}
                className='hover:text-[#2F4832] transition p-2 rounded-lg'>
                Logout
              </button>
            ) : (
              <button onClick={() => setOpenAuth(true)} className='p-2'>
                <User size={20} />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
