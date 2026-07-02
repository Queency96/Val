import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';

export default function BrandProducts() {
  const { brandName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandProducts();
  }, [brandName]);

  const fetchBrandProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();

      // Filter products by brand
      const filteredProducts = data.products.filter(
        (item) =>
          item.brand &&
          item.brand.toLowerCase() === decodeURIComponent(brandName).toLowerCase()
      );

      const formatted = filteredProducts.map((item) => {
        const basePrice = item.price * 1500;

        return {
          id: item.id,
          name: item.title || 'Unnamed Product',
          brand: item.brand || 'Unknown Brand',
          image: item.thumbnail || '',

          price: basePrice,
          oldPrice: basePrice + 5000,

          rating: item.rating || 0,
          reviews: item.stock || 0,

          flashPrice: item.discountPercentage
            ? Math.round(basePrice * (1 - item.discountPercentage / 100))
            : null,
        };
      });

      setProducts(formatted);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold capitalize">
          {decodeURIComponent(brandName)}
        </h1>

        <p className="text-gray-500 mt-2">
          {products.length} Product{products.length !== 1 ? 's' : ''} Found
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no products for this brand.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}