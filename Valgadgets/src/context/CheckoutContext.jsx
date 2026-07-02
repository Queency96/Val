import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [buyNowItem, setBuyNowItem] = useState(null);

  const startBuyNow = (product) => {
    setBuyNowItem({
      ...product,
      quantity: 1,
    });
  };

  const clearBuyNow = () => {
    setBuyNowItem(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        buyNowItem,
        startBuyNow,
        clearBuyNow,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
