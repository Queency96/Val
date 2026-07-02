import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { buyNowItem, clearBuyNow } = useCheckout(); // ✅ FIXED (USED PROPERLY)

  const [method, setMethod] = useState('pod');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  // ======================
  // BUY NOW LOGIC (FIXED)
  // ======================
  const isBuyNow = !!buyNowItem;

  const itemsToCheckout = isBuyNow ? [buyNowItem] : cart;

  const summaryItems = itemsToCheckout;

  const summaryTotal = summaryItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  // ======================
  // INPUT HANDLER
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // PLACE ORDER
  // ======================
  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill all required fields');
      return;
    }

    if (!summaryItems.length) {
      alert('No items in checkout');
      return;
    }

    setLoading(true);

    const order = {
      id: Date.now(),
      items: summaryItems,
      total: summaryTotal,
      method,
      customer: form,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('orders')) || [];

    localStorage.setItem('orders', JSON.stringify([order, ...existing]));

    clearCart();

    // ✅ FIXED: context cleanup
    if (isBuyNow) {
      clearBuyNow();
    }

    setLoading(false);
    alert('Order placed successfully 🎉');
    navigate('/order-success');
  };

  // ======================
  // FLUTTERWAVE PAYMENT
  // ======================
  const payWithFlutterwave = () => {
    if (!window.FlutterwaveCheckout) {
      alert('Flutterwave script not loaded');
      return;
    }

    window.FlutterwaveCheckout({
      public_key: 'YOUR_FLUTTERWAVE_PUBLIC_KEY',
      tx_ref: Date.now().toString(),
      amount: summaryTotal,
      currency: 'NGN',
      payment_options: 'card,banktransfer,ussd',

      customer: {
        email: form.email,
        phone_number: form.phone,
        name: form.name,
      },

      callback: function () {
        placeOrder();
      },

      onclose: function () {
        console.log('Payment closed');
      },
    });
  };

  // ======================
  // UI
  // ======================
  return (
    <section className='max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10'>
      {/* LEFT FORM */}
      <div>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

        <input
          name='name'
          placeholder='Full Name'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        <input
          name='phone'
          placeholder='Phone Number'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        <input
          name='email'
          placeholder='Email (for payment)'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        <textarea
          name='address'
          placeholder='Delivery Address'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        {/* PAYMENT METHODS */}
        <h2 className='font-semibold mt-6 mb-3'>Payment Method</h2>

        <div className='space-y-2'>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              checked={method === 'pod'}
              onChange={() => setMethod('pod')}
            />
            Pay on Delivery (Cash)
          </label>

          <label className='flex items-center gap-2'>
            <input
              type='radio'
              checked={method === 'transfer'}
              onChange={() => setMethod('transfer')}
            />
            Bank Transfer
          </label>

          <label className='flex items-center gap-2'>
            <input
              type='radio'
              checked={method === 'flutterwave'}
              onChange={() => setMethod('flutterwave')}
            />
            Pay with Card (Flutterwave)
          </label>
        </div>

        {/* BANK DETAILS */}
        {method === 'transfer' && (
          <div className='bg-blue-50 p-4 rounded-xl mt-4'>
            <p className='font-semibold'>Bank Transfer Details</p>
            <p>Bank: GTBank</p>
            <p>Account: 0123456789</p>
            <p>Name: Valgadgets Ltd</p>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={method === 'flutterwave' ? payWithFlutterwave : placeOrder}
          disabled={loading}
          className='w-full mt-6 bg-[#2F4832] text-white py-3 rounded-xl'>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {/* RIGHT SUMMARY */}
      <div className='bg-gray-50 p-6 rounded-xl'>
        <h2 className='text-xl font-bold mb-4'>Order Summary</h2>

        {summaryItems.map((item) => (
          <div key={item.id} className='flex justify-between mb-2'>
            <span>
              {item.name} × {item.quantity || 1}
            </span>
            <span>₦{(item.price * (item.quantity || 1)).toLocaleString()}</span>
          </div>
        ))}

        <hr className='my-4' />

        <div className='flex justify-between font-bold text-lg'>
          <span>Total</span>
          <span>₦{summaryTotal.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}
