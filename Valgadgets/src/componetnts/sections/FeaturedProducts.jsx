import { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import SkeletonCard from '../ui/SkeletonCard';

export default function FeaturedProducts({ onQuickView }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();

        const formatted = data.products.map((item) => {
          const basePrice = item.price * 1500;

          return {
            id: item.id,
            name: item.title || 'Unnamed Product',
            brand: item.brand || 'Unknown Brand',
            image: item.thumbnail || '',

            price: basePrice,
            oldPrice: basePrice + 5002,

            rating: item.rating || 0,
            reviews: item.stock || 0,

            // optional flash sale support (safe default)
            flashPrice: item.discountPercentage
              ? Math.round(basePrice * (1 - item.discountPercentage / 100))
              : null,
          };
        });

        setProducts(formatted);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  const handleViewAll = () => {
    setExpanded(true);
    setVisibleCount(20);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const hasMore = visibleCount < products.length;

  return (
    <section id='products' className='py-20 bg-[#969696]'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* HEADER */}
        <div className='flex items-center justify-between mb-10'>
          <div>
            <h2 className='text-3xl font-bold text-[#1A1A1A]'>
              Featured Products
            </h2>
            <p className='text-gray-500 mt-1'>
              Top deals selected for you in Nigeria
            </p>
          </div>

          {!expanded ? (
            <button
              onClick={handleViewAll}
              className='text-[#2F4832] font-semibold hover:underline'>
              View All →
            </button>
          ) : (
            <button
              onClick={() => {
                setExpanded(false);
                setVisibleCount(8);
              }}
              className='text-[#2F4832] font-semibold hover:underline'>
              Show Less ←
            </button>
          )}
        </div>

        {/* GRID */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
        </div>

        {/* LOAD MORE */}
        {!loading && expanded && hasMore && (
          <div className='flex justify-center mt-10'>
            <button
              onClick={handleLoadMore}
              className='px-8 py-3 bg-[#2F4832] text-white rounded-xl font-semibold hover:opacity-90 transition'>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
