import { X, Package, Calendar, CreditCard } from 'lucide-react';

export default function CustomerOrdersModal({ open, customer, onClose }) {
  if (!open || !customer) return null;

  const orders = customer.orders || [];

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden'>
        {/* HEADER */}

        <div className='flex items-center justify-between px-8 py-6 border-b'>
          <div>
            <h2 className='text-2xl font-bold'>Customer Orders</h2>

            <p className='text-gray-500 mt-1'>
              {customer.name}'s order history
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* BODY */}

        <div className='p-8 max-h-[70vh] overflow-y-auto'>
          {orders.length === 0 ? (
            <div className='text-center py-20'>
              <Package size={70} className='mx-auto text-gray-300 mb-5' />

              <h3 className='text-xl font-semibold'>No Orders Yet</h3>

              <p className='text-gray-500 mt-2'>
                This customer hasn't placed any order.
              </p>
            </div>
          ) : (
            <div className='space-y-6'>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className='border rounded-2xl p-6 hover:shadow-lg transition'>
                  {/* TOP */}

                  <div className='flex flex-col lg:flex-row lg:justify-between gap-4'>
                    <div>
                      <h3 className='text-xl font-bold'>Order #{order.id}</h3>

                      <div className='flex items-center gap-2 text-gray-500 mt-2'>
                        <Calendar size={16} />
                        {order.date}
                      </div>
                    </div>

                    <div className='text-right'>
                      <p className='text-2xl font-bold text-[#2F4832]'>
                        ₦{order.total.toLocaleString()}
                      </p>

                      <span
                        className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Cancelled'
                              ? 'bg-red-100 text-red-700'
                              : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* PAYMENT */}

                  <div className='flex items-center gap-2 mt-5 text-gray-600'>
                    <CreditCard size={18} />

                    <span>
                      Payment:
                      <strong className='ml-2'>
                        {order.payment || 'Card'}
                      </strong>
                    </span>
                  </div>

                  {/* ITEMS */}

                  <div className='mt-6'>
                    <h4 className='font-semibold mb-4'>Ordered Items</h4>

                    <div className='space-y-4'>
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between border rounded-xl p-4'>
                          <div className='flex items-center gap-4'>
                            <img
                              src={item.image || 'https://picsum.photos/100'}
                              alt={item.name}
                              className='w-16 h-16 rounded-xl object-cover'
                            />

                            <div>
                              <h5 className='font-semibold'>{item.name}</h5>

                              <p className='text-sm text-gray-500'>
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <div className='text-right'>
                            <p className='font-bold text-[#2F4832]'>
                              ₦{item.price.toLocaleString()}
                            </p>

                            <p className='text-sm text-gray-500'>
                              Total: ₦
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className='border-t px-8 py-5 flex justify-between items-center'>
          <div className='text-gray-500 text-sm'>
            Total Orders:
            <strong className='ml-2'>{orders.length}</strong>
          </div>

          <button
            onClick={onClose}
            className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#223524] text-white'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
