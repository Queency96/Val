import { Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../ui/ProductCard';
import { useCart } from '../../context/CartContext';
import Breadcrumbs from '../ui/Breadcrumbs';

export default function Wishlist({ onQuickView }) {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleMoveToCart = (product) => {
    addToCart(product); // global cart
    removeFromWishlist(product.id); // global wishlist
  };

  return (
    <section className='max-w-7xl mx-auto px-6 py-10'>
      <Breadcrumbs product={null} />
      <h1 className='text-4xl font-bold mb-8'>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className='text-center py-20'>
          <h2 className='text-2xl font-semibold'>Your wishlist is empty</h2>
          <p className='text-gray-500 mt-2'>Save products you love.</p>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishlist.map((product) => (
            <div key={product.id} className='relative'>
              {/* remove button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className='absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow'>
                <Trash2 size={18} />
              </button>

              {/* ✅ FIX: use onQuickView */}
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
