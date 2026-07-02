import { useEffect, useState, useRef } from 'react';
import { Clock, Zap } from 'lucide-react';
import FlashSaleCard from '../ui/FlashSaleCard';
import { useCart } from '../../context/CartContext';

export default function FlashSales({ onQuickView }) {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  const { addToCart } = useCart();

  const startXRef = useRef(0);

  const itemsPerView = 4;

  /* ---------------- SECTION COUNTDOWN ---------------- */

  const [endTime] = useState(() => {
    const end = new Date();
    end.setHours(end.getHours() + 24);
    return end;
  });

  const calculateTime = () => {
    const diff = endTime.getTime() - Date.now();

    if (diff <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=12');

        const data = await res.json();

        const formatted = data.products.map((item) => {
          const basePrice = item.price * 1500;

          const flashPrice = Math.round(
            basePrice * (1 - item.discountPercentage / 100),
          );

          return {
            id: item.id,
            name: item.title,
            brand: item.brand || 'Unknown',
            image: item.thumbnail,

            price: basePrice,
            flashPrice,
            oldPrice: basePrice,

            rating: item.rating || 0,
            reviews: item.stock || 0,

            stock: Math.floor(Math.random() * 20 + 1),

            flashEndsAt:
              Date.now() + Math.floor(Math.random() * 22 + 2) * 60 * 60 * 1000,
          };
        });

        setProducts(formatted);
      } catch (error) {
        console.error('Error fetching flash sale products:', error);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- REMOVE EXPIRED PRODUCTS ---------------- */

  useEffect(() => {
    const cleanup = setInterval(() => {
      setProducts((prev) =>
        prev.filter((product) => product.flashEndsAt > Date.now()),
      );
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  /* ---------------- ACTIVE PRODUCTS ---------------- */

  const activeProducts = products.filter(
    (product) => product.flashEndsAt > Date.now(),
  );

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    if (!activeProducts.length) return;

    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1 >= activeProducts.length ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(slider);
  }, [activeProducts.length]);

  /* ---------------- MOBILE SWIPE ---------------- */

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!activeProducts.length) return;

    const endX = e.changedTouches[0].clientX;

    if (startXRef.current - endX > 50) {
      setIndex((prev) => (prev + 1 >= activeProducts.length ? 0 : prev + 1));
    }

    if (endX - startXRef.current > 50) {
      setIndex((prev) => (prev === 0 ? activeProducts.length - 1 : prev - 1));
    }
  };

  /* ---------------- VISIBLE PRODUCTS ---------------- */

  const visibleProducts = [];

  for (let i = 0; i < itemsPerView; i++) {
    if (!activeProducts.length) break;

    visibleProducts.push(activeProducts[(index + i) % activeProducts.length]);
  }

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <section className='py-16 bg-gradient-to-br from-black via-[#111] to-black text-white'>
      {' '}
      <div className='max-w-7xl mx-auto px-6'>
        {/* HEADER */}

        <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-10'>
          <div className='flex items-center gap-3'>
            <Zap className='text-yellow-400' />

            <div>
              <h2 className='text-3xl font-bold text-yellow-400'>
                Flash Sales
              </h2>

              <p className='text-gray-400 text-sm'>
                Limited-time deals. Grab yours before they're gone.
              </p>
            </div>
          </div>

          <div className='bg-white/10 px-5 py-3 rounded-xl flex items-center gap-2'>
            <Clock size={18} />

            <span className='font-semibold'>
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}

        {activeProducts.length === 0 ? (
          <div className='text-center py-16 text-gray-400'>
            No active flash sales right now.
          </div>
        ) : (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {visibleProducts.map((product) => (
              <FlashSaleCard
                key={`${product.id}-${index}`}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={(item) =>
                  addToCart({
                    ...item,
                    price:
                      item.flashEndsAt > Date.now()
                        ? item.flashPrice
                        : item.price,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
