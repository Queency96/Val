import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const normalizeProduct = (product) => ({
  id: product?.id,
  name: product?.name || product?.title,
  brand: product?.brand || 'Unknown',
  image: product?.image || product?.thumbnail,
  price: product?.price || 0,
  oldPrice: product?.oldPrice || null,
  rating: product?.rating || 0,
  reviews: product?.reviews || 0,
  quantity: product?.quantity || 1,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    if (!product?.id) return;

    const normalized = normalizeProduct(product);

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === normalized.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === normalized.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [...prev, normalized];
    });
  };

  // Remove completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Total items
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Total amount
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,

        addToCart,
        removeFromCart,

        increaseQuantity,
        decreaseQuantity,

        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
