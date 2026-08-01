import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteNotificationModal({
  open,
  onClose,
  notification,
  onConfirm,
}) {
  if (!open || !notification) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center'>
              <AlertTriangle className='text-red-600' size={24} />
            </div>

            <div>
              <h2 className='text-xl font-bold text-gray-900'>
                Delete Notification
              </h2>

              <p className='text-sm text-gray-500'>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className='px-6 py-6'>
          <div className='rounded-2xl border border-red-100 bg-red-50 p-4'>
            <p className='text-gray-700'>
              Are you sure you want to permanently delete this notification?
            </p>

            <div className='mt-5 rounded-xl bg-white p-4 border'>
              <p className='text-xs uppercase tracking-wide text-gray-500'>
                Title
              </p>

              <h3 className='mt-1 font-bold text-gray-900'>
                {notification.title}
              </h3>

              <p className='mt-3 text-xs uppercase tracking-wide text-gray-500'>
                Recipient
              </p>

              <p className='mt-1 font-medium text-gray-700'>
                {notification.recipient}
              </p>

              <p className='mt-3 text-xs uppercase tracking-wide text-gray-500'>
                Channel
              </p>

              <p className='mt-1 font-medium text-gray-700'>
                {notification.channel}
              </p>

              <p className='mt-3 text-xs uppercase tracking-wide text-gray-500'>
                Status
              </p>

              <span
                className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  notification.status === 'Sent'
                    ? 'bg-green-100 text-green-700'
                    : notification.status === 'Scheduled'
                      ? 'bg-yellow-100 text-yellow-700'
                      : notification.status === 'Failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                }`}>
                {notification.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-6 py-5 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium'>
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className='px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 transition'>
            <Trash2 size={18} />
            Delete Notification
          </button>
        </div>
      </div>
    </div>
  );
}
