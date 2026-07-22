import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, UploadCloud, Save } from 'lucide-react';

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

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(emptyProduct);
  const [products, setProducts] = useState([]);

  const [dragIndex, setDragIndex] = useState(null);

  // ======================
  // LOAD PRODUCT
  // ======================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('admin_products')) || [];

    setProducts(saved);

    const product = saved.find((p) => String(p.id) === String(id));

    if (product) {
      setForm({
        ...product,
        images: Array.isArray(product.images)
          ? product.images
          : product.image
            ? [product.image]
            : [],

        flashStartAt: product.flashStartAt
          ? new Date(product.flashStartAt).toISOString().slice(0, 16)
          : '',

        flashEndsAt: product.flashEndsAt
          ? new Date(product.flashEndsAt).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [id]);

  // ======================
  // SAVE STORAGE
  // ======================
  const saveToStorage = (data) => {
    localStorage.setItem('admin_products', JSON.stringify(data));
  };

  // ======================
  // INPUT HANDLER
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
  // DESKTOP DRAG
  // ======================
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDropReorder = (index) => {
    if (dragIndex === null) return;

    const updated = [...form.images];
    const dragged = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(index, 0, dragged);

    setForm((prev) => ({
      ...prev,
      images: updated,
    }));

    setDragIndex(null);
  };

  // ======================
  // MOBILE TOUCH DRAG (FIXED)
  // ======================
  const handleTouchStart = (index) => {
    setDragIndex(index);
  };

  const findIndexFromElement = (el) => {
    let node = el;

    while (node && node !== document.body) {
      if (node.dataset && node.dataset.index !== undefined) {
        return Number(node.dataset.index);
      }
      node = node.parentElement;
    }

    return null;
  };

  const handleTouchMove = (e) => {
    if (dragIndex === null) return;

    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!target) return;

    const targetIndex = findIndexFromElement(target);

    if (targetIndex !== null && targetIndex !== dragIndex) {
      const updated = [...form.images];
      const dragged = updated[dragIndex];

      updated.splice(dragIndex, 1);
      updated.splice(targetIndex, 0, dragged);

      setForm((prev) => ({
        ...prev,
        images: updated,
      }));

      setDragIndex(targetIndex);
    }
  };

  const handleTouchEnd = () => {
    setDragIndex(null);
  };

  // ======================
  // UPDATE PRODUCT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProducts = products.map((p) => {
      if (String(p.id) !== String(id)) return p;

      return {
        ...form,
        id: p.id,

        price: Number(form.price),
        oldPrice: Number(form.oldPrice || form.price),

        flashPrice: form.isFlashSale
          ? Number(form.flashPrice || form.price * 0.8)
          : null,

        flashStartAt: form.isFlashSale
          ? new Date(form.flashStartAt).getTime()
          : null,

        flashEndsAt: form.isFlashSale
          ? new Date(form.flashEndsAt).getTime()
          : null,
      };
    });

    setProducts(updatedProducts);
    saveToStorage(updatedProducts);

    navigate('/admin/products');
  };

  // ======================
  // UI
  // ======================
  return (
    <section className='max-w-5xl mx-auto px-6 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-xl shadow grid gap-4'>
        {/* BASIC */}
        <div className='grid md:grid-cols-2 gap-4'>
          <input
            name='name'
            value={form.name}
            onChange={handleChange}
            className='border p-3 rounded'
            placeholder='Product Name'
          />

          <input
            name='brand'
            value={form.brand}
            onChange={handleChange}
            className='border p-3 rounded'
            placeholder='Brand'
          />

          <input
            name='price'
            type='number'
            value={form.price}
            onChange={handleChange}
            className='border p-3 rounded'
            placeholder='Price'
          />

          <input
            name='oldPrice'
            type='number'
            value={form.oldPrice}
            onChange={handleChange}
            className='border p-3 rounded'
            placeholder='Old Price'
          />
        </div>

        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          className='border p-3 rounded'
          placeholder='Description'
        />

        {/* IMAGE UPLOAD */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          className='border-2 border-dashed p-6 rounded-xl text-center cursor-pointer'>
          <UploadCloud className='mx-auto mb-2' />

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
                onDrop={() => handleDropReorder(i)}
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
        </div>

        {/* FLASH SALE */}
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
                className='border p-3 rounded'
                placeholder='Flash Price'
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

        {/* SAVE */}
        <button className='bg-[#2F4832] text-white px-6 py-3 rounded flex items-center gap-2'>
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </section>
  );
}
