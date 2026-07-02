const reorderImages = (from, to) => {
  setForm((prev) => {
    const updated = [...prev.images];
    const moved = updated[from];

    updated.splice(from, 1);
    updated.splice(to, 0, moved);

    return {
      ...prev,
      images: updated,
    };
  });
};
