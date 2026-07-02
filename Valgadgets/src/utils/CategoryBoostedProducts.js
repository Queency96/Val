export const getCategoryBoostedProducts = (products, category) => {
  return products
    .map((p) => ({
      ...p,
      boost: p.category === category ? 10 : 1,
    }))
    .sort((a, b) => b.boost - a.boost);
};
