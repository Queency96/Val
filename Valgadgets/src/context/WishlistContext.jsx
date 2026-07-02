import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

const normalizeProduct = (product) => ({
  id: product?.id,
  name: product?.name || product?.title,
  brand: product?.brand || 'Unknown',
  image: product?.image || product?.thumbnail,
  price: product?.price || 0,
  oldPrice: product?.oldPrice || null,
  rating: product?.rating || 0,
  reviews: product?.reviews || 0,
});

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // LOAD
  useEffect(() => {
    const raw = localStorage.getItem('wishlist');

    console.log('📦 Raw localStorage wishlist:', raw);

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      console.log('📥 Parsed wishlist:', parsed);
      setWishlist(parsed);
    } catch (err) {
      console.error('❌ Failed to parse wishlist:', err);
      localStorage.removeItem('wishlist');
    }
  }, []);

  // SAVE
  useEffect(() => {
    console.log('💾 Saving wishlist to localStorage:', wishlist);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ADD
  const addToWishlist = (product) => {
    const item = normalizeProduct(product);

    console.log('➕ addToWishlist:', item);

    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);

      if (exists) {
        console.log('⚠️ Already in wishlist');
        return prev;
      }

      const updated = [...prev, item];
      console.log('✅ Added new wishlist item:', updated);
      return updated;
    });
  };

  // REMOVE
  const removeFromWishlist = (id) => {
    console.log('🗑 removeFromWishlist:', id);

    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      console.log('✅ After remove:', updated);
      return updated;
    });
  };

  // CHECK
  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // TOGGLE
  const toggleWishlist = (product) => {
    const id = product?.id;

    console.log('🔁 toggleWishlist:', product);

    if (!id) {
      console.warn('❌ No product id');
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === id);

      if (exists) {
        const updated = prev.filter((p) => p.id !== id);
        console.log('❌ Removed:', updated);
        return updated;
      }

      const item = normalizeProduct(product);
      const updated = [...prev, item];
      console.log('❤️ Added:', updated);
      return updated;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside provider');
  return context;
};