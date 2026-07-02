import { useEffect, useState, useRef, useCallback } from 'react';
import ProductCard from '../ui/ProductCard';

export default function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const loadMore = async () => {
    if (!hasMore) return;

    setLoading(true);

    const res = await fetch(
      `https://dummyjson.com/products?limit=12&skip=${skip}`,
    );

    const data = await res.json();

    const formatted = data.products.map((item) => ({
      id: item.id,
      brand: item.brand,
      name: item.title,
      image: item.thumbnail,
      price: item.price * 1500,
      oldPrice: item.price * 1500 + 50000,
      rating: item.rating,
      reviews: item.stock,

      // optional flash sale fields
      flashPrice: item.discountPercentage
        ? item.price * 1500 * (1 - item.discountPercentage / 100)
        : null,

      oldPrice: item.price * 1500,
    }));

    setProducts((prev) => [...prev, ...formatted]);
    setSkip((prev) => prev + 12);

    if (data.products.length < 12) setHasMore(false);

    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const lastRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products.map((p, i) => {
        if (i === products.length - 1) {
          return (
            <div ref={lastRef} key={p.id}>
              <ProductCard product={p} />
            </div>
          );
        }

        return <ProductCard key={p.id} product={p} />;
      })}
    </div>
  );
}
