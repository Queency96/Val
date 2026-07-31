import { X, Phone, Mail, MapPin, Package } from 'lucide-react';

export default function ViewOrderModal({ open, order, onClose }) {
  if (!open || !order) return null;

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div>
            <h2 className='text-2xl font-bold'>Order #{order.id}</h2>

            <p className='text-sm text-gray-500'>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 p-6'>
          {/* Customer */}

          <div>
            <h3 className='font-bold text-lg mb-4'>Customer Information</h3>

            <div className='space-y-4'>
              <div className='flex gap-3 items-center'>
                <div className='w-12 h-12 rounded-full bg-[#2F4832] text-white flex items-center justify-center font-bold'>
                  {order.customer.name.charAt(0)}
                </div>

                <div>
                  <h4 className='font-semibold'>{order.customer.name}</h4>

                  <p className='text-gray-500 text-sm'>Customer</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Phone size={18} />

                <span>{order.customer.phone}</span>
              </div>

              <div className='flex items-center gap-3'>
                <Mail size={18} />

                <span>{order.customer.email}</span>
              </div>

              <div className='flex items-center gap-3'>
                <MapPin size={18} />

                <span>{order.customer.address}</span>
              </div>
            </div>

            {/* Order Summary */}

            <div className='mt-8 rounded-xl bg-gray-50 p-5 space-y-3'>
              <h3 className='font-bold'>Order Summary</h3>

              <div className='flex justify-between'>
                <span>Status</span>

                <span className='font-semibold capitalize'>{order.status}</span>
              </div>

              <div className='flex justify-between'>
                <span>Payment</span>

                <span className='font-semibold'>{order.method}</span>
              </div>

              <div className='flex justify-between'>
                <span>Subtotal</span>

                <span>₦{order.subtotal.toLocaleString()}</span>
              </div>

              <div className='flex justify-between'>
                <span>Delivery</span>

                <span>₦{order.deliveryFee.toLocaleString()}</span>
              </div>

              <div className='border-t pt-3 flex justify-between text-lg font-bold text-[#2F4832]'>
                <span>Total</span>

                <span>₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Products */}

          <div>
            <h3 className='font-bold text-lg mb-4'>Purchased Items</h3>

            <div className='space-y-4 max-h-[450px] overflow-y-auto'>
              {order.items.map((item, index) => (
                <div key={index} className='flex gap-4 rounded-xl border p-4'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-20 h-20 rounded-lg object-cover'
                  />

                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <Package size={18} />

                      <h4 className='font-semibold'>{item.name}</h4>
                    </div>

                    <p className='text-gray-500 mt-2'>Qty: {item.quantity}</p>

                    <p className='font-bold text-[#2F4832] mt-2'>
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-4 flex justify-end'>
          <button
            onClick={onClose}
            className='px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:opacity-90'>
            Close
          </button>

          
          <button
            onClick={handleSubmit}
            className='px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:opacity-90'>
            Save Changes
          </button>
          
        </div>
      </div>
    </div>
  );
}
