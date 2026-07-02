import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();

        const formatted = data.products.map((item) => {
          const basePrice = item.price * 1500;

          return {
            id: item.id,
            name: item.title,
            brand: item.brand,
            category: item.category || 'general',
            image: item.thumbnail,

            price: basePrice,
            oldPrice: basePrice + 30000,

            rating: item.rating || 0,
            reviews: item.stock || 0,
          };
        });

        setProducts(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // VIEW TRACKING (AI MEMORY)
  // =========================
  const handleView = (product) => {
    console.log('VIEW CLICKED:', product.id);

    const existing =
      JSON.parse(localStorage.getItem('viewed_products')) || [];

    const updated = [product, ...existing].slice(0, 20);

    localStorage.setItem('viewed_products', JSON.stringify(updated));

    navigate(`/products/${product.id}`);
  };

  // =========================
  // AI PERSONALIZATION ENGINE
  // =========================
  const recommended = useMemo(() => {
    if (!products.length) return [];

    const viewed =
      JSON.parse(localStorage.getItem('viewed_products')) || [];

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const preferredCategories = new Map();

    viewed.forEach((v) => {
      preferredCategories.set(
        v.category,
        (preferredCategories.get(v.category) || 0) + 2,
      );
    });

    cart.forEach((c) => {
      preferredCategories.set(
        c.category,
        (preferredCategories.get(c.category) || 0) + 3,
      );
    });

    const scored = products.map((p) => {
      let score = 0;

      score += preferredCategories.get(p.category) || 0;
      score += p.rating || 0;
      score += (p.reviews || 0) / 100;
      score += Math.random() * 0.5;

      return { ...p, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [products]);

  // =========================
  // CARD UI
  // =========================
  const Card = ({ product }) => (
    <div className="min-w-[180px] bg-white rounded-xl border shadow-sm hover:shadow-md transition p-3 flex flex-col gap-2">

      <img
        src={product.image}
        className="h-28 w-full object-cover rounded-lg"
        alt={product.name}
      />

      <p className="text-xs font-semibold line-clamp-2">
        {product.name}
      </p>

      <p className="text-[11px] text-gray-500">
        {product.brand}
      </p>

      <p className="text-sm font-bold text-[#2F4832]">
        ₦{product.price.toLocaleString()}
      </p>

      {/* FIXED VIEW BUTTON */}
      <button
        type="button"
        onClick={() => handleView(product)}
        className="w-full text-xs font-semibold bg-[#2F4832] text-white py-1.5 rounded-md hover:bg-[#1f2f22] transition"
      >
        View Product
      </button>

    </div>
  );

  // =========================
  // UI
  // =========================
  return (
    <section className="py-14 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Recommended For You 🤖
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered suggestions based on your activity
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {recommended.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}