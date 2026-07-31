import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteCustomerModal({
  open,
  customer,
  onClose,
  onDelete,
}) {
  if (!open || !customer) return null;

  const handleDelete = () => {
    onDelete?.(customer.id);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between px-6 py-5 border-b'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
              <AlertTriangle size={24} className='text-red-600' />
            </div>

            <div>
              <h2 className='text-xl font-bold text-red-600'>
                Delete Customer
              </h2>

              <p className='text-sm text-gray-500'>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className='px-6 py-8'>
          <div className='flex items-center gap-4 mb-6'>
            <img
              src={
                customer.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  customer.name,
                )}&background=2F4832&color=fff`
              }
              alt={customer.name}
              className='w-16 h-16 rounded-full object-cover'
            />

            <div>
              <h3 className='text-lg font-bold'>{customer.name}</h3>

              <p className='text-sm text-gray-500'>{customer.email}</p>

              <p className='text-sm text-gray-500'>{customer.phone}</p>
            </div>
          </div>

          <div className='bg-red-50 border border-red-200 rounded-2xl p-5'>
            <p className='text-red-700 leading-relaxed'>
              You are about to permanently delete this customer account,
              including all associated information.
            </p>

            <ul className='mt-4 space-y-2 text-sm text-red-600 list-disc list-inside'>
              <li>Customer profile</li>

              <li>Wishlist history</li>

              <li>Saved addresses</li>

              <li>Activity history</li>

              <li>Account preferences</li>
            </ul>

            <p className='mt-4 font-semibold text-red-700'>
              Existing orders and invoices should usually be retained for
              auditing purposes.
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-5 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl border hover:bg-gray-100 transition'>
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className='flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition'>
            <Trash2 size={18} />
            Delete Customer
          </button>
        </div>
      </div>
    </div>
  );
}
