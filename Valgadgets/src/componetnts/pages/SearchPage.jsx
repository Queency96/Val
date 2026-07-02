import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FILTER STATE
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
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

          // oldPrice: item.price * 1500,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearch();
  }, [query]);

  // 🔥 FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchBrand = brandFilter === 'all' || p.brand === brandFilter;

    const matchPrice =
      priceFilter === 'all' ||
      (priceFilter === 'low' && p.price < 500000) ||
      (priceFilter === 'mid' && p.price >= 500000 && p.price <= 1500000) ||
      (priceFilter === 'high' && p.price > 1500000);

    return matchBrand && matchPrice;
  });

  // get unique brands
  const brands = ['all', ...new Set(products.map((p) => p.brand))];

  return (
    <section className='max-w-7xl mx-auto px-6 py-10'>
      {/* TITLE */}
      <h1 className='text-2xl font-bold mb-6'>Search results for: "{query}"</h1>

      {/* FILTER BAR */}
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        {/* BRAND FILTER */}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className='border px-4 py-2 rounded-lg'>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* PRICE FILTER */}
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className='border px-4 py-2 rounded-lg'>
          <option value='all'>All Prices</option>
          <option value='low'>Below ₦500K</option>
          <option value='mid'>₦500K - ₦1.5M</option>
          <option value='high'>Above ₦1.5M</option>
        </select>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}