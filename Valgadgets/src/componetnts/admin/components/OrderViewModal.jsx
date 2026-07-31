import {
  X,
  User,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  Package,
} from 'lucide-react';

export default function OrderViewModal({ open, order, onClose }) {
  if (!open || !order) return null;

  return (
    <div className='fixed inset-0 z-[999] bg-black/50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}

        <div className='sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold'>Order #{order.id}</h2>

            <p className='text-gray-500 text-sm'>Order Details</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <div className='p-6 space-y-8'>
          {/* Customer */}

          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='border rounded-2xl p-5'>
              <h3 className='font-bold mb-4'>Customer</h3>

              <div className='space-y-3'>
                <div className='flex gap-3'>
                  <User size={18} />
                  <span>{order.customer?.name}</span>
                </div>

                <div className='flex gap-3'>
                  <Phone size={18} />
                  <span>{order.customer?.phone}</span>
                </div>

                <div className='flex gap-3'>
                  <MapPin size={18} />
                  <span>{order.customer?.address}</span>
                </div>
              </div>
            </div>

            <div className='border rounded-2xl p-5'>
              <h3 className='font-bold mb-4'>Order Info</h3>

              <div className='space-y-3'>
                <div className='flex gap-3'>
                  <Calendar size={18} />
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <div className='flex gap-3'>
                  <CreditCard size={18} />
                  <span>{order.method}</span>
                </div>

                <div className='flex gap-3'>
                  <Truck size={18} />
                  <span className='capitalize'>{order.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}

          <div>
            <h3 className='font-bold mb-4'>Ordered Products</h3>

            <div className='space-y-4'>
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-4 items-center border rounded-2xl p-4'>
                  <img
                    src={item.image}
                    alt=''
                    className='w-20 h-20 rounded-xl object-cover'
                  />

                  <div className='flex-1'>
                    <h4 className='font-semibold'>{item.name}</h4>

                    <p className='text-sm text-gray-500'>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className='font-bold text-[#2F4832]'>
                    ₦{item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}

          <div className='border rounded-2xl p-6'>
            <h3 className='font-bold mb-4'>Payment Summary</h3>

            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>₦{order.subtotal?.toLocaleString()}</span>
              </div>

              <div className='flex justify-between'>
                <span>Delivery</span>
                <span>₦{order.deliveryFee?.toLocaleString()}</span>
              </div>

              <div className='flex justify-between text-xl font-bold text-[#2F4832] border-t pt-4'>
                <span>Total</span>

                <span>₦{order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
