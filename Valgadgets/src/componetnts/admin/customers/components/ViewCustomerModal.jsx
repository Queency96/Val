import {
  X,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  Crown,
} from 'lucide-react';

export default function ViewCustomerModal({ open, customer, onClose }) {
  if (!open || !customer) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300'>
        {/* HEADER */}

        <div className='flex items-center justify-between px-8 py-6 border-b'>
          <div>
            <h2 className='text-2xl font-bold'>Customer Details</h2>

            <p className='text-gray-500 text-sm mt-1'>
              View complete customer information
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* BODY */}

        <div className='p-8 space-y-8'>
          {/* PROFILE */}

          <div className='flex flex-col md:flex-row gap-6 items-center md:items-start'>
            <img
              src={
                customer.avatar ||
                `https://ui-avatars.com/api/?name=${customer.name}&background=2F4832&color=fff`
              }
              alt={customer.name}
              className='w-28 h-28 rounded-full object-cover shadow-lg'
            />

            <div className='flex-1 text-center md:text-left'>
              <div className='flex flex-wrap justify-center md:justify-start items-center gap-3'>
                <h3 className='text-3xl font-bold'>{customer.name}</h3>

                {customer.vip && (
                  <span className='flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold'>
                    <Crown size={16} />
                    VIP Customer
                  </span>
                )}
              </div>

              <p className='text-gray-500 mt-2'>Customer ID: #{customer.id}</p>

              <div
                className={`inline-flex mt-4 px-4 py-2 rounded-full font-semibold text-sm ${
                  customer.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                {customer.status}
              </div>
            </div>
          </div>

          {/* INFORMATION GRID */}

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='border rounded-2xl p-5'>
              <h4 className='font-semibold mb-4'>Contact Information</h4>

              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Mail className='text-[#2F4832]' size={18} />
                  <span>{customer.email}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <Phone className='text-[#2F4832]' size={18} />
                  <span>{customer.phone}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <MapPin className='text-[#2F4832]' size={18} />
                  <span>{customer.address}</span>
                </div>
              </div>
            </div>

            <div className='border rounded-2xl p-5'>
              <h4 className='font-semibold mb-4'>Customer Summary</h4>

              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Total Orders</span>

                  <span className='font-bold'>{customer.totalOrders}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Total Spent</span>

                  <span className='font-bold text-[#2F4832]'>
                    ₦{customer.totalSpent?.toLocaleString()}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span>Joined</span>

                  <span className='font-semibold'>{customer.joined}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}

          <div className='border rounded-2xl p-5'>
            <div className='flex items-center gap-2 mb-5'>
              <ShoppingBag size={20} />

              <h4 className='font-semibold'>Recent Orders</h4>
            </div>

            {customer.orders?.length ? (
              <div className='space-y-3'>
                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className='flex justify-between items-center border rounded-xl p-4'>
                    <div>
                      <h5 className='font-semibold'>#{order.id}</h5>

                      <p className='text-sm text-gray-500'>
                        {order.items} items
                      </p>
                    </div>

                    <div className='text-right'>
                      <p className='font-bold text-[#2F4832]'>
                        ₦{order.total.toLocaleString()}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12 text-gray-500'>
                <Calendar size={40} className='mx-auto mb-3 opacity-40' />
                No recent orders.
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div className='border-t px-8 py-5 flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
            Close
          </button>

          <button className='px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:bg-[#243927]'>
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
}
