import { useState } from 'react';

export const useCartAnimation = () => {
  const [animating, setAnimating] = useState(false);

  const trigger = () => {
    setAnimating(true);

    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  return { animating, trigger };
};
