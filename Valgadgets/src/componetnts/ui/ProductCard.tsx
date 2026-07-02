import { useState } from 'react';
import { Heart, Eye, Star, ShoppingCart, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onQuickView }) {
  const { startBuyNow } = useCheckout();
  const navigate = useNavigate();

  const location = useLocation();

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [wishAnim, setWishAnim] = useState(false);

  // ✅ SAFE PRODUCT (FIXED)
  const safeProduct = {
    id: product?.id,
    name: product?.name,
    brand: product?.brand,
    image: product?.image,
    price: product?.price,
    oldPrice: product?.oldPrice,
    rating: product?.rating,
    reviews: product?.reviews || 0,

    // optional flash support (safe fallback)
    flashPrice: product?.flashPrice || null,
  };

  // =====================
  // CART
  // =====================
  const handleAddToCart = () => {
    addToCart({
      ...safeProduct,
      price: safeProduct.flashPrice ?? safeProduct.price, // 🔥 FLASH LOGIC HERE
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  // =====================
  // WISHLIST
  // =====================
  const handleWishlist = () => {
    if (!safeProduct.id) return;

    toggleWishlist(safeProduct);

    setWishAnim(true);
    setTimeout(() => setWishAnim(false), 300);
  };

  const liked = isWishlisted(safeProduct.id);

  return (
    <div className='group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
      {/* IMAGE */}
      <div className='relative overflow-hidden'>
        <img
          src={safeProduct.image}
          alt={safeProduct.name}
          className='w-full h-64 object-cover group-hover:scale-105 transition duration-500'
        />

        <div className='absolute top-4 left-4'>
          <span className='bg-red-500 text-white text-xs px-3 py-1 rounded-full'>
            HOT DEAL
          </span>
        </div>

        {/* QUICK VIEW */}
        <div className='absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/10 backdrop-blur-sm'>
          <button
            onClick={() => onQuickView?.(safeProduct)}
            className='bg-white text-black px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition'>
            <Eye size={16} />
            Quick View
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className='p-5'>
        <p className='text-gray-500 text-sm'>{safeProduct.brand}</p>

        <h3 className='font-semibold text-lg line-clamp-1'>
          {safeProduct.name}
        </h3>

        {/* RATING */}
        <div className='flex items-center gap-1 mt-2'>
          <Star size={16} fill='gold' stroke='gold' />
          <span className='text-sm font-medium'>{safeProduct.rating}</span>
          <span className='text-gray-400 text-sm'>({safeProduct.reviews})</span>
        </div>

        {/* PRICE */}
        <div className='mt-4 flex items-end gap-2'>
          <span className='text-2xl font-bold'>
            ₦{(safeProduct.flashPrice ?? safeProduct.price).toLocaleString()}
          </span>

          {safeProduct.oldPrice && (
            <span className='line-through text-gray-400 text-sm'>
              ₦{safeProduct.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className='flex gap-2 mt-5'>
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#2F4832] text-white hover:opacity-90'
            }`}>
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add To Cart
              </>
            )}
          </button>

          <button
            onClick={() => {
              startBuyNow({
                ...product,
                price: product.flashPrice ?? product.price,
              });

              navigate('/checkout?mode=buy_now');
            }}
            className='flex-1 bg-[#FFB800] py-3 rounded-xl font-medium hover:opacity-90'>
            Buy Now
          </button>
        </div>

        {/* ACTION ICONS */}
        <div className='flex justify-between items-center mt-5 text-gray-600'>
          {/* WISHLIST */}
          <button
            onClick={handleWishlist}
            className={`transition transform ${
              wishAnim ? 'scale-125' : 'scale-100'
            }`}>
            <Heart
              size={20}
              className={
                liked ? 'fill-red-500 text-red-500' : 'hover:text-red-500'
              }
            />
          </button>

          {/* QUICK VIEW */}
          <Link
            to={`/products/${safeProduct.id}`}
            state={{
              from: location.pathname,
              scrollY: 'top',
            }}>
            <Eye size={20} className='hover:text-green-500 transition' />
          </Link>
        </div>
      </div>
    </div>
  );
}
