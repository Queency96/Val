import { X, Printer } from 'lucide-react';

export default function InvoiceModal({ open, order, onClose }) {
  if (!open || !order) return null;

  const subtotal =
    order.subtotal ??
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = order.deliveryFee ?? 0;

  const total = subtotal + deliveryFee;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-8 py-5'>
          <div>
            <h2 className='text-2xl font-bold'>Invoice</h2>

            <p className='text-sm text-gray-500'>
              Invoice for Order #{order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Invoice */}

        <div id='invoice-content' className='p-8 space-y-8'>
          {/* Company */}

          <div className='flex justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-[#2F4832]'>Val Gadgets</h1>

              <p className='text-gray-500 mt-2'>Premium Electronics Store</p>

              <p className='text-sm text-gray-500'>Lagos, Nigeria</p>

              <p className='text-sm text-gray-500'>support@valgadgets.com</p>

              <p className='text-sm text-gray-500'>+234 800 000 0000</p>
            </div>

            <div className='text-right'>
              <h3 className='text-3xl font-bold'>INVOICE</h3>

              <p className='text-gray-500 mt-2'>Invoice #: INV-{order.id}</p>

              <p className='text-gray-500'>Order #: {order.id}</p>

              <p className='text-gray-500'>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Customer */}

          <div className='grid md:grid-cols-2 gap-10'>
            <div>
              <h4 className='font-bold mb-3'>Bill To</h4>

              <div className='space-y-1 text-gray-600'>
                <p>{order.customer.name}</p>

                <p>{order.customer.phone}</p>

                <p>{order.customer.email}</p>

                <p>{order.customer.address}</p>
              </div>
            </div>

            <div>
              <h4 className='font-bold mb-3'>Payment Details</h4>

              <div className='space-y-2 text-gray-600'>
                <p>
                  Method:
                  <span className='font-semibold ml-2'>{order.method}</span>
                </p>

                <p>
                  Status:
                  <span className='font-semibold ml-2 capitalize'>
                    {order.payment || 'Paid'}
                  </span>
                </p>

                <p>
                  Order Status:
                  <span className='font-semibold ml-2 capitalize'>
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Items */}

          <table className='w-full border mt-4'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='text-left p-3'>Product</th>

                <th className='text-center p-3'>Qty</th>

                <th className='text-right p-3'>Price</th>

                <th className='text-right p-3'>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className='border-t'>
                  <td className='p-3'>{item.name}</td>

                  <td className='text-center'>{item.quantity}</td>

                  <td className='text-right pr-3'>
                    ₦{item.price.toLocaleString()}
                  </td>

                  <td className='text-right pr-3 font-semibold'>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}

          <div className='flex justify-end'>
            <div className='w-full max-w-sm space-y-3'>
              <div className='flex justify-between'>
                <span>Subtotal</span>

                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className='flex justify-between'>
                <span>Delivery</span>

                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className='border-t pt-3 flex justify-between text-xl font-bold'>
                <span>Total</span>

                <span className='text-[#2F4832]'>
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className='border-t pt-6 text-center text-gray-500 text-sm'>
            Thank you for shopping with Val Gadgets.
            <br />
            We appreciate your business.
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-8 py-5 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl border hover:bg-gray-100'>
            Close
          </button>

          <button
            onClick={handlePrint}
            className='flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:opacity-90'>
            <Printer size={18} />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
