import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteCouponModal({
  open,
  onClose,
  coupon,
  onConfirm,
  loading = false,
}) {
  if (!open || !coupon) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between p-6 border-b'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center'>
              <Trash2 className='text-red-600' size={24} />
            </div>

            <div>
              <h2 className='text-xl font-bold'>Delete Coupon</h2>

              <p className='text-sm text-gray-500'>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className='p-6'>
          <div className='flex items-start gap-4 bg-red-50 border border-red-100 rounded-2xl p-5'>
            <AlertTriangle className='text-red-500 mt-1' size={24} />

            <div>
              <h3 className='font-semibold text-red-700'>Are you sure?</h3>

              <p className='text-sm text-gray-600 mt-2'>
                You are about to permanently delete this coupon.
              </p>
            </div>
          </div>

          <div className='mt-6 rounded-2xl border p-5 space-y-3'>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Coupon Code</span>

              <span className='font-bold'>{coupon.code}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Discount</span>

              <span className='font-semibold'>
                {coupon.discountType === 'percentage'
                  ? `${coupon.discount}%`
                  : `₦${Number(coupon.discount || 0).toLocaleString()}`}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Status</span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  coupon.active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                {coupon.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Usage</span>

              <span className='font-semibold'>
                {(coupon.usedCount ?? 0).toLocaleString()}
                {coupon.usageLimit
                  ? ` / ${coupon.usageLimit.toLocaleString()}`
                  : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t p-6 flex justify-end gap-4'>
          <button
            onClick={onClose}
            disabled={loading}
            className='px-6 py-3 rounded-xl border hover:bg-gray-100 transition'>
            Cancel
          </button>

          <button
            onClick={() => onConfirm?.(coupon)}
            disabled={loading}
            className='px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-60'>
            {loading ? 'Deleting...' : 'Delete Coupon'}
          </button>
        </div>
      </div>
    </div>
  );
}
