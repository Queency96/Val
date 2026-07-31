import { AlertTriangle, X } from 'lucide-react';

export default function CancelDeliveryModal({
  open,
  onClose,
  delivery,
  onConfirm,
}) {
  if (!open || !delivery) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center'>
              <AlertTriangle className='text-red-600' size={24} />
            </div>

            <div>
              <h2 className='text-xl font-bold text-gray-900'>
                Cancel Delivery
              </h2>

              <p className='text-sm text-gray-500'>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className='px-6 py-6'>
          <div className='rounded-2xl bg-red-50 border border-red-100 p-5'>
            <p className='text-gray-700'>
              Are you sure you want to cancel this delivery?
            </p>

            <div className='mt-5 space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Delivery ID</span>

                <span className='font-semibold'>#{delivery.id}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Tracking</span>

                <span className='font-semibold'>{delivery.tracking}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Customer</span>

                <span className='font-semibold'>{delivery.customer?.name}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-gray-500'>Status</span>

                <span className='font-semibold text-orange-600'>
                  {delivery.status}
                </span>
              </div>
            </div>
          </div>

          <p className='mt-5 text-sm text-red-600'>
            Cancelling this delivery will remove it from the active delivery
            queue and notify the customer.
          </p>
        </div>

        {/* Footer */}

        <div className='flex justify-end gap-3 border-t px-6 py-5'>
          <button
            onClick={onClose}
            className='px-5 py-2.5 rounded-xl border hover:bg-gray-100 transition'>
            Keep Delivery
          </button>

          <button
            onClick={onConfirm}
            className='px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition'>
            Cancel Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
