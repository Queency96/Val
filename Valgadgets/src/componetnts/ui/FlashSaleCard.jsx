import { useEffect, useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function FlashSaleCard({ product, onQuickView, onAddToCart }) {
  const { isWishlisted } = useWishlist();

  const liked = isWishlisted(product.id);

  function getTimeLeft() {
    const diff = product.flashEndsAt - Date.now();

    if (diff <= 0) {
      return {
        expired: true,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      expired: false,
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [product.flashEndsAt]);

  const isFlashSaleActive = product.flashEndsAt > Date.now();

  const displayPrice = isFlashSaleActive ? product.flashPrice : product.price;

  const discount =
    product.oldPrice && product.flashPrice
      ? Math.floor(
          ((product.oldPrice - product.flashPrice) / product.oldPrice) * 100,
        )
      : 0;

  const format = (n) => String(n).padStart(2, '0');

  return (
    <div className='relative bg-white rounded-2xl overflow-hidden shadow-lg'>
      {/* DISCOUNT BADGE */}
      {isFlashSaleActive && discount > 0 && (
        <div className='absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10'>
          <Zap size={12} />-{discount}%
        </div>
      )}

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-52 object-cover'
      />

      {/* COUNTDOWN */}
      {isFlashSaleActive && (
        <div className='absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded z-10'>
          {format(timeLeft.hours)}:{format(timeLeft.minutes)}:
          {format(timeLeft.seconds)}
        </div>
      )}

      {/* CONTENT */}
      <div className='p-4'>
        <h3 className='font-semibold line-clamp-1'>{product.name}</h3>

        <div className='mt-2 flex gap-2 items-end'>
          <span className='text-lg font-bold text-[#2F4832]'>
            ₦{displayPrice.toLocaleString()}
          </span>

          {isFlashSaleActive && (
            <span className='text-sm line-through text-gray-400'>
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(product)}
          className='mt-4 w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2'>
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
