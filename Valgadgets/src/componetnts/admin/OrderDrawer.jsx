import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function OrderDrawer({ open, order, onClose, onStatusChange }) {
  if (!open || !order) return null;

  const subtotal =
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const shipping = order.shippingFee || 0;
  const discount = order.discount || 0;

  const total = order.total || subtotal + shipping - discount;

  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'
      />

      {/* Drawer */}

      <aside className='fixed right-0 top-0 h-screen w-full md:w-[520px] bg-white shadow-2xl z-50 flex flex-col'>
        {/* Header */}

        <div className='border-b px-6 py-5 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Order #{order.id}</h2>

            <p className='text-sm text-gray-500'>Order Details</p>
          </div>

          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-gray-100'>
            <X size={22} />
          </button>
        </div>

        {/* Scrollable */}

        <div className='flex-1 overflow-y-auto p-6 space-y-6'>
          {/* Customer */}

          <div className='bg-gray-50 rounded-xl p-5'>
            <h3 className='font-semibold mb-4'>Customer</h3>

            <div className='space-y-3 text-sm'>
              <div className='flex items-center gap-3'>
                <User size={18} />
                {order.customer?.name || 'Unknown'}
              </div>

              <div className='flex items-center gap-3'>
                <Phone size={18} />
                {order.customer?.phone || '--'}
              </div>

              <div className='flex items-center gap-3'>
                <Mail size={18} />
                {order.customer?.email || '--'}
              </div>

              <div className='flex items-start gap-3'>
                <MapPin size={18} />
                <span>{order.customer?.address || '--'}</span>
              </div>
            </div>
          </div>

          {/* Order */}

          <div className='bg-gray-50 rounded-xl p-5'>
            <h3 className='font-semibold mb-4'>Order Information</h3>

            <div className='space-y-4 text-sm'>
              <div className='flex justify-between'>
                <span className='flex items-center gap-2'>
                  <Calendar size={16} />
                  Date
                </span>

                <span>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : '--'}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='flex items-center gap-2'>
                  <CreditCard size={16} />
                  Payment
                </span>

                <span className='capitalize'>{order.method}</span>
              </div>

              <div className='flex justify-between'>
                <span className='flex items-center gap-2'>
                  <Clock size={16} />
                  Status
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusClasses[order.status] || 'bg-gray-100 text-gray-600'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Status */}

          <div>
            <h3 className='font-semibold mb-3'>Update Status</h3>

            <select
              value={order.status}
              onChange={(e) => onStatusChange?.(order.id, e.target.value)}
              className='w-full border rounded-lg p-3'>
              <option value='pending'>Pending</option>

              <option value='paid'>Paid</option>

              <option value='processing'>Processing</option>

              <option value='shipped'>Shipped</option>

              <option value='delivered'>Delivered</option>

              <option value='cancelled'>Cancelled</option>
            </select>
          </div>

          {/* Products */}

          <div>
            <h3 className='font-semibold mb-4'>Products</h3>

            <div className='space-y-3'>
              {order.items?.map((item) => (
                <div key={item.id} className='flex gap-3 border rounded-xl p-3'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-20 h-20 rounded-lg object-cover'
                  />

                  <div className='flex-1'>
                    <h4 className='font-medium'>{item.name}</h4>

                    <p className='text-xs text-gray-500'>{item.brand}</p>

                    <div className='mt-2 flex justify-between text-sm'>
                      <span>
                        Qty:
                        <strong> {item.quantity}</strong>
                      </span>

                      <span className='font-semibold'>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}

          <div className='bg-[#2F4832] rounded-xl p-5 text-white'>
            <h3 className='font-semibold mb-4'>Payment Summary</h3>

            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span>Subtotal</span>

                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className='flex justify-between'>
                <span>Shipping</span>

                <span>₦{shipping.toLocaleString()}</span>
              </div>

              <div className='flex justify-between'>
                <span>Discount</span>

                <span>-₦{discount.toLocaleString()}</span>
              </div>

              <hr className='border-white/20' />

              <div className='flex justify-between text-xl font-bold'>
                <span>Total</span>

                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t p-5 flex gap-3'>
          <button className='flex-1 bg-[#2F4832] text-white py-3 rounded-xl hover:bg-[#223628]'>
            <Package size={18} className='inline mr-2' />
            Print Invoice
          </button>

          <button className='flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700'>
            <CheckCircle size={18} className='inline mr-2' />
            Notify Customer
          </button>
        </div>
      </aside>
    </>
  );
}
