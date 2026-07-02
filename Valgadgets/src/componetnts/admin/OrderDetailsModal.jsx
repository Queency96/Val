import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  Printer,
  Download,
} from 'lucide-react';

export default function OrderDetailsModal({ order, onClose, onPrint }) {
  if (!order) return null;

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'paid':
        return 'bg-blue-100 text-blue-700';

      case 'processing':
        return 'bg-indigo-100 text-indigo-700';

      case 'shipped':
        return 'bg-purple-100 text-purple-700';

      case 'delivered':
        return 'bg-green-100 text-green-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const subtotal =
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const shipping = order.shippingFee || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + shipping - discount;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4'>
      <div className='bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl'>
        {/* HEADER */}

        <div className='sticky top-0 bg-white border-b p-6 flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold'>Order #{order.id}</h2>

            <p className='text-gray-500'>Customer Order Details</p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={() => onPrint?.(order)}
              className='flex items-center gap-2 bg-[#2F4832] text-white px-4 py-2 rounded-lg hover:bg-[#243928]'>
              <Printer size={18} />
              Print
            </button>

            <button className='flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50'>
              <Download size={18} />
              Invoice
            </button>

            <button
              onClick={onClose}
              className='p-2 rounded-lg hover:bg-gray-100'>
              <X />
            </button>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-6 p-6'>
          {/* CUSTOMER */}

          <div className='bg-gray-50 rounded-xl p-5'>
            <h3 className='font-bold text-lg mb-4'>Customer</h3>

            <p className='font-semibold'>{order.customer?.name}</p>

            <div className='space-y-3 mt-4'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Phone size={16} />
                {order.customer?.phone}
              </div>

              <div className='flex items-center gap-2 text-gray-600'>
                <Mail size={16} />
                {order.customer?.email || 'N/A'}
              </div>

              <div className='flex items-start gap-2 text-gray-600'>
                <MapPin size={16} />
                {order.customer?.address}
              </div>
            </div>
          </div>

          {/* ORDER */}

          <div className='bg-gray-50 rounded-xl p-5'>
            <h3 className='font-bold text-lg mb-4'>Order Information</h3>

            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span>Date</span>

                <span className='flex items-center gap-2'>
                  <Calendar size={15} />
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : '--'}
                </span>
              </div>

              <div className='flex justify-between'>
                <span>Payment</span>

                <span className='flex items-center gap-2'>
                  <CreditCard size={15} />
                  {order.method}
                </span>
              </div>

              <div className='flex justify-between'>
                <span>Shipping</span>

                <span className='flex items-center gap-2'>
                  <Truck size={15} />
                  Standard
                </span>
              </div>

              <div className='flex justify-between'>
                <span>Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                    order.status,
                  )}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT */}

          <div className='bg-[#2F4832] text-white rounded-xl p-5'>
            <h3 className='font-bold text-lg mb-4'>Payment Summary</h3>

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

              <hr className='border-white/30' />

              <div className='flex justify-between text-xl font-bold'>
                <span>Total</span>

                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}

        <div className='px-6 pb-6'>
          <h3 className='text-xl font-bold mb-4'>Ordered Products</h3>

          <div className='border rounded-xl overflow-hidden'>
            <table className='w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='text-left p-4'>Product</th>

                  <th className='text-left p-4'>Price</th>

                  <th className='text-left p-4'>Qty</th>

                  <th className='text-left p-4'>Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item) => (
                  <tr key={item.id} className='border-t'>
                    <td className='p-4'>
                      <div className='flex items-center gap-4'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-16 h-16 rounded-lg object-cover'
                        />

                        <div>
                          <p className='font-semibold'>{item.name}</p>

                          <p className='text-sm text-gray-500'>{item.brand}</p>
                        </div>
                      </div>
                    </td>

                    <td className='p-4'>₦{item.price.toLocaleString()}</td>

                    <td className='p-4'>{item.quantity}</td>

                    <td className='p-4 font-semibold'>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}

        <div className='border-t p-6 flex justify-end'>
          <button
            onClick={onClose}
            className='bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-black'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
