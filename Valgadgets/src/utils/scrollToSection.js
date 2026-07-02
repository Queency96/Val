// src/utils/scrollToSection.js
export const scrollToSection = (id) => {
  const el = document.getElementById(id);

  if (!el) {
    console.warn(`Section not found: ${id}`);
    return;
  }

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};