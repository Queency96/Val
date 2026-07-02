import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import Categories from '../sections/Categories';

const heroBanners = [
  {
    title: 'Big Tech Deals',
    subtitle: 'Up to 40% off electronics',
    bg: 'from-[#2F4832] to-[#1A1A1A]',
  },
  {
    title: 'Smartphones Week',
    subtitle: 'Latest gadgets in Nigeria',
    bg: 'from-[#FFB800] to-[#DCC8A3]',
  },
];

export default function AllCategories() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // SHUFFLE
  // =========================
  const shuffle = (array) => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch('https://dummyjson.com/products?limit=200');

      const data = await res.json();

      const formatted = data.products.map((item) => {
        const basePrice = item.price * 1500;

        return {
          id: item.id,
          name: item.title,
          brand: item.brand || 'Unknown Brand',
          category: item.category,
          image: item.thumbnail,

          price: basePrice,
          oldPrice: basePrice + 50000,

          rating: item.rating,
          reviews: item.stock,

          flashPrice: item.discountPercentage
            ? Math.round(basePrice * (1 - item.discountPercentage / 100))
            : null,
        };
      });

      const randomProducts = shuffle(formatted);

      setAllProducts(randomProducts);

      setFeaturedProducts(randomProducts);

      setTrendingProducts(shuffle([...randomProducts]).slice(0, 12));

      setVisibleCount(20);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VIEW PRODUCT
  // =========================
  const handleView = (product) => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    const safeViewed = Array.isArray(viewed)
      ? viewed.filter((p) => p && p.id)
      : [];

    const updated = [
      product,
      ...safeViewed.filter((p) => p.id !== product.id),
    ].slice(0, 20);

    localStorage.setItem('recentlyViewed', JSON.stringify(updated));

    navigate(`/products/${product.id}`);
  };

  // =========================
  // LOAD MORE
  // =========================
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 20, featuredProducts.length));
  };

  // =========================
  // TRENDING CARD
  // =========================
  const Card = ({ product }) => (
    <div className='min-w-[190px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 flex flex-col gap-2'>
      <div className='overflow-hidden rounded-xl'>
        <img
          src={product.image}
          alt={product.name}
          className='h-32 w-full object-cover hover:scale-105 transition duration-300'
        />
      </div>

      <h3 className='text-xs font-semibold line-clamp-2'>{product.name}</h3>

      <p className='text-[11px] text-gray-500'>{product.brand}</p>

      <p className='text-sm font-bold text-[#2F4832]'>
        ₦{product.price.toLocaleString()}
      </p>

      <button
        type='button'
        onClick={() => handleView(product)}
        className='mt-auto w-full rounded-lg bg-[#2F4832] py-2 text-xs font-semibold text-white hover:bg-[#243928] transition'>
        View Product
      </button>
    </div>
  );
  return (
    <div className=''>
      <section className='mx-auto px-6 py-10'>
        <section className='max-w-7xl mx-auto px-6'>
          {/* CATEGORIES */}
          <Categories />
        </section>
      </section>

      <section className='bg-black mx-auto px-6 py-10'>
        <section className='max-w-7xl mx-auto px-6'>
          {/* HERO */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            {heroBanners.map((banner, index) => (
              <div
                key={index}
                className={`p-10 rounded-3xl text-white bg-gradient-to-r ${banner.bg}`}>
                <h2 className='text-3xl font-bold'>{banner.title}</h2>

                <p className='mt-2 opacity-90'>{banner.subtitle}</p>

                <button className='mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition'>
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className='max-w-7xl mx-auto px-6 py-10'>
        {/* FEATURED PRODUCTS */}
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-2xl font-bold'>⭐ Featured Products</h2>

          <button
            onClick={fetchProducts}
            className='text-sm bg-[#2F4832] text-white px-4 py-2 rounded-lg hover:bg-[#243928]'>
            Refresh
          </button>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className='h-80 rounded-2xl bg-gray-200 animate-pulse'
                />
              ))
            : featuredProducts
                .slice(0, visibleCount)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
        </div>

        {/* LOAD MORE */}
        {!loading && visibleCount < featuredProducts.length && (
          <div className='flex justify-center mt-10 mb-14'>
            <button
              onClick={handleLoadMore}
              className='bg-[#2F4832] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#243928] transition'>
              Load More Products
            </button>
          </div>
        )}
      </section>
      {/* TRENDING PRODUCTS */}
      <div className=' mx-auto bg-black'>
        <section className='max-w-7xl mx-auto px-6 py-10 bg-black'>
          <h2 className='text-2xl font-bold mb-5 text-white'>🔥 Trending Products</h2>

          <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className='min-w-[190px] h-[260px] rounded-2xl bg-gray-200 animate-pulse'
                  />
                ))
              : trendingProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
