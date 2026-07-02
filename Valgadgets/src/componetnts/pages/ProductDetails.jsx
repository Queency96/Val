import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
  const { startBuyNow } = useCheckout();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [added, setAdded] = useState(false);

  // 🔥 ZOOM STATES
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // =========================
  // SCROLL TOP
  // =========================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();

        const formatted = {
          id: data.id,
          brand: data.brand,
          name: data.title,
          image: data.thumbnail,
          images: data.images || [],
          price: data.price * 1500,
          oldPrice: data.price * 1500 + 50000,
          rating: data.rating,
          reviews: data.stock,
          description: data.description,
          discountPercentage: data.discountPercentage,

          flashPrice: data.discountPercentage
            ? Math.round(
                Number(data.price || 0) *
                  1500 *
                  (1 - data.discountPercentage / 100),
              )
            : null,
        };

        setProduct(formatted);

        setSelectedImage(
          formatted.images?.length > 0 ? formatted.images[0] : formatted.image,
        );
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // RECENTLY VIEWED
  // =========================
  useEffect(() => {
    if (!product) return;

    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    const safeViewed = Array.isArray(viewed)
      ? viewed.filter((p) => p && typeof p === 'object' && p.id)
      : [];

    const updated = [
      product,
      ...safeViewed.filter((p) => p.id !== product.id),
    ].slice(0, 20);

    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  }, [product]);

  // =========================
  // ZOOM HANDLER
  // =========================
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPos({ x, y });
  };

  // =========================
  // WHATSAPP
  // =========================

  const handleWhatsAppChat = () => {
    if (!product) return;

    const phoneNumber = '2348077489665';

    const productLink = `${window.location.origin}/products/${product.id}`;

    const message = [
      'Hello 👋',
      '',
      'I would like to order this product:',
      '',
      `🛍️ Name: ${product.name}`,
      `🏷️ Brand: ${product.brand || 'N/A'}`,
      `📂 Category: ${product.category || 'N/A'}`,
      `💰 Price: ₦${Number(product.price || 0).toLocaleString()}`,
      `⭐ Rating: ${product.rating ?? 'N/A'}`,
      '',
      `🔗 ${window.location.origin}/products/${product.id}`,
      '',
      'Please assist me with the purchase.',
    ].join('\n');
    
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  //   const handleWhatsAppChat = () => {
  //     if (!product) return;

  //     const phoneNumber = '2348077489665';

  //     const message = `
  // Hello 👋

  // I’m interested in this product:

  // 🛍️ Product: ${product.name}
  // 💰 Price: ₦${product.price.toLocaleString()}

  // Please I want to place an order.
  // `;

  //     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  //     window.open(url, '_blank');
  //   };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      ...product,
      price: product.flashPrice ?? product.price,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section className='max-w-7xl mx-auto px-6 py-12 animate-pulse'>
        <div className='h-[500px] bg-gray-200 rounded-2xl' />
      </section>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!product) {
    return (
      <div className='text-center py-20'>
        Product not found or failed to load
      </div>
    );
  }

  return (
    <section className='max-w-7xl mx-auto px-6 py-10'>
      <Breadcrumbs product={product} />

      <div className='grid lg:grid-cols-2 gap-12'>
        {/* LEFT */}
        <div>
          {/* 🔥 ZOOM IMAGE */}
          <div
            className='bg-white rounded-2xl overflow-hidden border relative cursor-zoom-in'
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoomPos({ x: 50, y: 50 })}
            onClick={() => setZoomOpen(true)}>
            <img
              src={selectedImage}
              alt={product.name}
              className='w-full h-[520px] object-cover'
              style={{
                transform: 'scale(1.5)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
          </div>

          {/* THUMBNAILS */}
          <div className='flex gap-3 mt-4 overflow-x-auto'>
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className='border rounded-xl overflow-hidden'>
                <img src={img} className='w-20 h-20 object-cover' />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <p className='text-[#2F4832] font-semibold'>{product.brand}</p>

          <h1 className='text-4xl font-bold mt-2'>{product.name}</h1>

          <p className='text-gray-600 mt-4'>{product.description}</p>

          <div className='flex items-center gap-2 mt-4'>
            <Star size={18} fill='gold' stroke='gold' />
            <span className='font-semibold'>{product.rating}</span>
            <span className='text-gray-400'>({product.reviews})</span>
          </div>

          <div className='mt-6 bg-gray-50 p-4 rounded-2xl border'>
            {product.flashPrice ? (
              <>
                <h2 className='text-3xl font-bold text-red-600'>
                  ₦{product.flashPrice.toLocaleString()}
                </h2>
                <span className='line-through text-gray-400'>
                  ₦{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <h2 className='text-3xl font-bold'>
                  ₦{product.price.toLocaleString()}
                </h2>
                <span className='line-through text-gray-400'>
                  ₦{product.oldPrice.toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className='mt-8 space-y-3'>
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-semibold transition ${
                added ? 'bg-green-600 text-white' : 'bg-[#2F4832] text-white'
              }`}>
              {added ? 'Added to Cart ✓' : 'Add To Cart'}
            </button>

            <button
              onClick={() => {
                startBuyNow({
                  ...product,
                  price: product.flashPrice ?? product.price,
                });

                navigate('/checkout?mode=buy_now');
              }}
              className='w-full bg-[#FFB800] py-4 rounded-xl'>
              Buy Now
            </button>

            <button
              onClick={handleWhatsAppChat}
              className='w-full bg-green-500 text-white py-4 rounded-xl'>
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE ZOOM MODAL */}
      {zoomOpen && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
          onClick={() => setZoomOpen(false)}>
          <img
            src={selectedImage}
            alt='zoom'
            className='max-w-[95%] max-h-[90%] object-contain'
          />
        </div>
      )}
    </section>
  );
}
