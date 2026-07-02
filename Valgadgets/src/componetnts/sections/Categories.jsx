import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const categoryIcons = {
  smartphones: '📱',
  laptops: '💻',
  tablets: '📟',
  'mobile-accessories': '🔋',
  'mens-watches': '⌚',
  'womens-watches': '⌚',
  sunglasses: '🕶️',
  beauty: '💄',
  fragrances: '🌸',
  groceries: '🛒',
  furniture: '🛋️',
  motorcycle: '🏍️',
  vehicle: '🚗',
  tops: '👕',
  'mens-shirts': '👔',
  'mens-shoes': '👞',
  'womens-bags': '👜',
  'womens-dresses': '👗',
  'womens-jewellery': '💍',
  'womens-shoes': '👠',
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ---------------- DRAG SCROLL ---------------- */
  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className='max-w-7xl mx-auto py-16 px-6'>
      {/* HEADER */}
      <div className='mb-10'>
        <h2 className='text-3xl font-bold text-[#1A1A1A] tracking-tight'>
          Shop By Category
        </h2>

        <p className='text-black/70 font-semibold  mt-2'>
          Explore gadgets, tech and essentials curated for you
        </p>
      </div>

      {/* WRAPPER */}
      <div className='relative'>
        {/* LEFT FADE */}
        <div className='pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#969696] via-[#969696]/80 to-transparent' />

        {/* RIGHT FADE */}
        <div className='pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#969696] via-[#969696]/80 to-transparent' />

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onMouseMove={onMouseMove}
          className='
            flex gap-5 overflow-x-auto
            scroll-smooth cursor-grab active:cursor-grabbing
            snap-x snap-mandatory
            py-2
            scrollbar-hide
          '>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className='
                    min-w-[230px] h-28
                    rounded-3xl
                    bg-gradient-to-r from-gray-200 to-gray-100
                    animate-pulse snap-center
                  '
                />
              ))
            : categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className='
                    group
                    min-w-[230px]
                    snap-center
                    flex items-center gap-4
                    px-5 py-5
                    rounded-3xl
                    border border-white/40
                    bg-white/70 backdrop-blur-xl
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    hover:bg-white
                    transition-all duration-300
                  '>
                  {/* ICON */}
                  <div
                    className='
                      text-3xl
                      bg-[#F6F3EC]
                      w-12 h-12
                      flex items-center justify-center
                      rounded-2xl
                      group-hover:scale-110
                      transition
                    '>
                    {categoryIcons[category.slug] || '📦'}
                  </div>

                  {/* TEXT */}
                  <div className='flex flex-col'>
                    <h3 className='text-sm font-semibold text-[#1A1A1A] capitalize'>
                      {category.name}
                    </h3>

                    <span className='text-xs text-gray-500'>
                      Browse products
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
