import { useEffect, useState, useRef } from 'react';
import { Trash2, Plus, Edit, UploadCloud } from 'lucide-react';

const emptyProduct = {
  id: null,
  name: '',
  brand: '',
  price: '',
  oldPrice: '',
  category: '',
  description: '',
  images: [],

  isFlashSale: false,
  flashPrice: '',
  flashStartAt: '',
  flashEndsAt: '',
};

export default function AdminProductCreate() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);

  // drag state
  const [dragIndex, setDragIndex] = useState(null);
  const isTouchDragging = useRef(false);

  // ======================
  // LOAD
  // ======================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('admin_products')) || [];
    setProducts(saved);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem('admin_products', JSON.stringify(data));
  };

  // ======================
  // INPUT
  // ======================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ======================
  // IMAGE UPLOAD
  // ======================
  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();

      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ======================
  // CORE REORDER FUNCTION (FIXED)
  // ======================
  const moveImage = (from, to) => {
    setForm((prev) => {
      const updated = [...prev.images];
      const item = updated[from];

      updated.splice(from, 1);
      updated.splice(to, 0, item);

      return { ...prev, images: updated };
    });
  };

  // ======================
  // DESKTOP DRAG
  // ======================
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDropItem = (index) => {
    if (dragIndex === null) return;
    moveImage(dragIndex, index);
    setDragIndex(null);
  };

  // ======================
  // MOBILE TOUCH DRAG (FIXED)
  // ======================
  const handleTouchStart = (index) => {
    setDragIndex(index);
    isTouchDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isTouchDragging.current) return;

    const touch = e.touches[0];

    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    const target = elements.find(
      (el) => el.dataset && el.dataset.index !== undefined,
    );

    if (!target) return;

    const targetIndex = Number(target.dataset.index);

    if (dragIndex !== null && targetIndex !== dragIndex) {
      moveImage(dragIndex, targetIndex);
      setDragIndex(targetIndex);
    }
  };

  const handleTouchEnd = () => {
    isTouchDragging.current = false;
    setDragIndex(null);
  };

  // ======================
  // RESET
  // ======================
  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || form.images.length === 0) {
      alert('Name, price and at least 1 image required');
      return;
    }

    const basePrice = Number(form.price);
    const oldPrice = Number(form.oldPrice || basePrice);

    const flashActive = form.isFlashSale;

    const productData = {
      ...form,
      id: editingId || Date.now(),
      price: basePrice,
      oldPrice,

      flashPrice: flashActive
        ? Number(form.flashPrice || basePrice * 0.8)
        : null,

      flashStartAt: flashActive ? new Date(form.flashStartAt).getTime() : null,

      flashEndsAt: flashActive ? new Date(form.flashEndsAt).getTime() : null,
    };

    let updated;

    if (editingId) {
      updated = products.map((p) => (p.id === editingId ? productData : p));
    } else {
      updated = [...products, productData];
    }

    setProducts(updated);
    saveToStorage(updated);
    resetForm();
  };

  // ======================
  // EDIT
  // ======================
  const editProduct = (p) => {
    setForm({
      ...p,
      images: Array.isArray(p.images) ? p.images : p.image ? [p.image] : [],

      flashStartAt: p.flashStartAt
        ? new Date(p.flashStartAt).toISOString().slice(0, 16)
        : '',

      flashEndsAt: p.flashEndsAt
        ? new Date(p.flashEndsAt).toISOString().slice(0, 16)
        : '',
    });

    setEditingId(p.id);
  };

  // ======================
  // DELETE
  // ======================
  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(updated);
  };

  // ======================
  // UI
  // ======================
  return (
    <section className='max-w-6xl mx-auto px-6 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Create Product</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-xl shadow mb-10 grid gap-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <input
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder='Product Name'
            className='border p-3 rounded'
          />

          <input
            name='brand'
            value={form.brand}
            onChange={handleChange}
            placeholder='Brand'
            className='border p-3 rounded'
          />

          <input
            name='price'
            type='number'
            value={form.price}
            onChange={handleChange}
            placeholder='Price'
            className='border p-3 rounded'
          />

          <input
            name='oldPrice'
            type='number'
            value={form.oldPrice}
            onChange={handleChange}
            placeholder='Old Price'
            className='border p-3 rounded'
          />
        </div>

        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Description'
          className='border p-3 rounded'
        />

        {/* IMAGE UPLOAD */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          className='border-2 border-dashed p-6 rounded-xl text-center cursor-pointer'>
          <UploadCloud className='mx-auto mb-2 text-[#FF0000]' />

          <p className=''>Upload Product Images</p>
          <p className='text-sm'>
            Allowed Formats:
            <span className='text-[#FF0000]'>.jpg, .jpeg, .png</span>
          </p>
          <p className='text-sm mt-2'>supported multiple images</p>

          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='image/*'
            hidden
            onChange={handleFileSelect}
          />

          <div
            className='flex gap-2 mt-4 flex-wrap justify-center'
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {form.images.map((img, i) => (
              <div
                key={i}
                data-index={i}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropItem(i)}
                onTouchStart={() => handleTouchStart(i)}
                className={`relative border rounded ${
                  dragIndex === i ? 'opacity-50' : ''
                }`}>
                <img src={img} className='w-16 h-16 object-cover rounded' />

                <button
                  type='button'
                  onClick={() => removeImage(i)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'>
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
          <p className='text-xs mt-2 text-[#FF0000]'>
            You can drag to reorder/reposittion the images
          </p>
        </div>

        {/* 🔥 FLASH SALE */}
        <div className='border p-4 rounded bg-gray-50'>
          <label className='flex items-center gap-2 mb-3'>
            <input
              type='checkbox'
              name='isFlashSale'
              checked={form.isFlashSale}
              onChange={handleChange}
            />
            Enable Flash Sale
          </label>

          {form.isFlashSale && (
            <div className='grid md:grid-cols-3 gap-3'>
              <input
                type='number'
                name='flashPrice'
                value={form.flashPrice}
                onChange={handleChange}
                placeholder='Flash Price'
                className='border p-3 rounded'
              />

              <input
                type='datetime-local'
                name='flashStartAt'
                value={form.flashStartAt}
                onChange={handleChange}
                className='border p-3 rounded'
              />

              <input
                type='datetime-local'
                name='flashEndsAt'
                value={form.flashEndsAt}
                onChange={handleChange}
                className='border p-3 rounded'
              />
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className='flex gap-3'>
          <button className='bg-[#2F4832] text-white px-6 py-3 rounded flex items-center gap-2'>
            <Plus size={18} />
            {editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button
              type='button'
              onClick={resetForm}
              className='bg-gray-400 text-white px-6 py-3 rounded'>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className='grid md:grid-cols-3 gap-6'>
        {products.map((p) => (
          <div
            key={p.id}
            className='bg-white rounded-xl shadow overflow-hidden'>
            <img src={p.images?.[0]} className='h-40 w-full object-cover' />

            <div className='p-4'>
              <h3 className='font-semibold'>{p.name}</h3>
              <p className='text-gray-500 text-sm'>{p.brand}</p>

              <p className='font-bold mt-2'>
                ₦{Number(p.price).toLocaleString()}
              </p>

              <div className='flex justify-between mt-4'>
                <button
                  onClick={() => editProduct(p)}
                  className='text-blue-500'>
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className='text-red-500'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
