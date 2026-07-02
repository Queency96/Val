import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../ui/ProductCard';
import SkeletonCard from '../ui/SkeletonCard';
import Categories from '../sections/Categories';

export default function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [skip, setSkip] = useState(0);
  const limit = 20;
  const [hasMore, setHasMore] = useState(true);

  // =========================
  // FETCH FUNCTION (SAFE)
  // =========================
  const fetchProducts = async (
    skipValue = 0,
    reset = false,
    cat = category,
  ) => {
    try {
      if (!cat) return;

      setLoading(reset);
      setLoadingMore(!reset);

      const res = await fetch(
        `https://dummyjson.com/products/category/${encodeURIComponent(
          cat,
        )}?limit=${limit}&skip=${skipValue}`,
      );

      const data = await res.json();

      const list = Array.isArray(data.products) ? data.products : [];

      const formatted = list.map((item) => {
        const basePrice = item.price * 1500;

        return {
          id: item.id,
          name: item.title,
          brand: item.brand || 'Unknown',
          image: item.thumbnail,

          price: basePrice,
          oldPrice: basePrice + 50000,

          flashPrice: item.discountPercentage
            ? Math.round(basePrice * (1 - item.discountPercentage / 100))
            : null,

          rating: item.rating || 0,
          reviews: item.stock || 0,
        };
      });

      setProducts((prev) => (reset ? formatted : [...prev, ...formatted]));

      setHasMore(list.length === limit);
      setSkip(skipValue + limit);
    } catch (err) {
      console.error('Category fetch error:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // =========================
  // FIXED EFFECT (IMPORTANT)
  // =========================
  useEffect(() => {
    if (!category) return;

    setProducts([]);
    setSkip(0);
    setHasMore(true);

    fetchProducts(0, true, category);
  }, [category]);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    fetchProducts(skip, false);
  };

  const title = category ? category.replace(/-/g, ' ') : 'Category';

  return (
    <section className='max-w-7xl mx-auto px-6 py-10'>
      <Categories />

      <div className='mb-8'>
        <h1 className='text-4xl font-bold capitalize'>{title}</h1>
        <p className='text-black/70 font-semibold mt-2'>
          Browse premium products in this category
        </p>
      </div>

      {/* GRID */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={`${product.id}-${category}`} product={product} />
          ))
        ) : (
          <p className='text-gray-500 col-span-full text-center'>
            No products found in this category.
          </p>
        )}

        {loadingMore &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`more-${i}`} />
          ))}
      </div>

      {/* LOAD MORE */}
      {!loading && hasMore && (
        <div className='flex justify-center mt-10'>
          <button
            onClick={loadMore}
            className='px-6 py-3 bg-[#2F4832] text-white rounded-xl font-semibold hover:opacity-90 transition'>
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
