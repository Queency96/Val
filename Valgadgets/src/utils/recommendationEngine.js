export const getRecommendations = (products) => {
  const history = JSON.parse(localStorage.getItem('viewed_products')) || [];

  if (history.length === 0) {
    // fallback → random trending
    return products.sort(() => 0.5 - Math.random()).slice(0, 8);
  }

  const categoryCount = {};

  history.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  const ranked = products
    .map((p) => ({
      ...p,
      score: categoryCount[p.category] || 0,
    }))
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, 8);
};
