import {
  X,
  Tag,
  Calendar,
  Percent,
  DollarSign,
  Users,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Copy,
} from 'lucide-react';

export default function ViewCouponModal({ open, onClose, coupon }) {
  if (!open || !coupon) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code || '');
      alert('Coupon code copied!');
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';

      case 'expired':
        return 'bg-red-100 text-red-700';

      case 'scheduled':
        return 'bg-blue-100 text-blue-700';

      case 'disabled':
        return 'bg-gray-100 text-gray-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex items-center justify-between border-b p-6'>
          <div>
            <h2 className='text-2xl font-bold'>Coupon Details</h2>

            <p className='text-gray-500 mt-1'>
              View complete coupon information
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <div className='p-6 space-y-8'>
          {/* Coupon Card */}

          <div className='bg-gradient-to-r from-[#2F4832] to-[#47694B] rounded-3xl p-8 text-white relative overflow-hidden'>
            <div className='absolute right-0 top-0 w-52 h-52 bg-white/5 rounded-full translate-x-20 -translate-y-20' />

            <div className='relative z-10 flex flex-col lg:flex-row justify-between gap-8'>
              <div>
                <p className='uppercase tracking-widest text-sm opacity-80'>
                  Coupon Code
                </p>

                <div className='flex items-center gap-3 mt-2'>
                  <h1 className='text-4xl font-black tracking-wider'>
                    {coupon.code}
                  </h1>

                  <button
                    onClick={copyCode}
                    className='w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition'>
                    <Copy size={18} />
                  </button>
                </div>

                <p className='mt-4 text-white/80'>
                  {coupon.description || 'No description available.'}
                </p>
              </div>

              <div className='text-right'>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${statusColor(
                    coupon.status,
                  )}`}>
                  {coupon.status}
                </span>
              </div>
            </div>
          </div>

          {/* Overview */}

          <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
            <div className='border rounded-2xl p-5'>
              <Percent className='text-blue-600' />

              <p className='text-sm text-gray-500 mt-3'>Discount</p>

              <h3 className='text-2xl font-bold mt-1'>
                {coupon.discountType === 'Percentage'
                  ? `${coupon.discount}%`
                  : `₦${Number(coupon.discount || 0).toLocaleString()}`}
              </h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <DollarSign className='text-green-600' />

              <p className='text-sm text-gray-500 mt-3'>Minimum Order</p>

              <h3 className='text-2xl font-bold mt-1'>
                ₦{Number(coupon.minimumOrder || 0).toLocaleString()}
              </h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <Users className='text-purple-600' />

              <p className='text-sm text-gray-500 mt-3'>Usage</p>

              <h3 className='text-2xl font-bold mt-1'>
                {(coupon.used || 0).toLocaleString()} /{' '}
                {(coupon.limit || 0).toLocaleString()}
              </h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <ShoppingCart className='text-orange-600' />

              <p className='text-sm text-gray-500 mt-3'>Remaining</p>

              <h3 className='text-2xl font-bold mt-1'>
                {Math.max(
                  0,
                  (coupon.limit || 0) - (coupon.used || 0),
                ).toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Information */}

          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='border rounded-3xl p-6'>
              <h3 className='font-bold text-xl mb-6'>Coupon Information</h3>

              <div className='space-y-5'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Coupon Name</span>

                  <span className='font-semibold'>{coupon.name}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Code</span>

                  <span className='font-semibold'>{coupon.code}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Discount Type</span>

                  <span className='font-semibold'>{coupon.discountType}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Maximum Discount</span>

                  <span className='font-semibold'>
                    ₦{Number(coupon.maximumDiscount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className='border rounded-3xl p-6'>
              <h3 className='font-bold text-xl mb-6'>Validity</h3>

              <div className='space-y-5'>
                <div className='flex items-center gap-4'>
                  <Calendar className='text-blue-600' />

                  <div>
                    <p className='text-sm text-gray-500'>Start Date</p>

                    <p className='font-semibold'>{coupon.startDate}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <Calendar className='text-red-600' />

                  <div>
                    <p className='text-sm text-gray-500'>Expiry Date</p>

                    <p className='font-semibold'>{coupon.endDate}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <Tag className='text-green-600' />

                  <div>
                    <p className='text-sm text-gray-500'>Applicable Category</p>

                    <p className='font-semibold'>
                      {coupon.category || 'All Products'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Progress */}

          <div className='border rounded-3xl p-6'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='font-bold text-xl'>Coupon Usage</h3>

              <span className='font-semibold text-[#2F4832]'>
                {Math.round(
                  ((coupon.used || 0) / Math.max(coupon.limit || 1, 1)) * 100,
                )}
                %
              </span>
            </div>

            <div className='h-4 rounded-full bg-gray-100 overflow-hidden'>
              <div
                className='h-full bg-[#2F4832] rounded-full transition-all duration-700'
                style={{
                  width: `${Math.min(
                    100,
                    ((coupon.used || 0) / Math.max(coupon.limit || 1, 1)) * 100,
                  )}%`,
                }}
              />
            </div>

            <div className='flex justify-between mt-4 text-sm text-gray-500'>
              <span>
                Used: <strong>{coupon.used || 0}</strong>
              </span>

              <span>
                Limit: <strong>{coupon.limit || 0}</strong>
              </span>
            </div>
          </div>

          {/* Status */}

          <div className='border rounded-3xl p-6'>
            <h3 className='font-bold text-xl mb-5'>Coupon Status</h3>

            <div className='space-y-5'>
              <div className='flex items-center gap-4'>
                {coupon.status === 'Active' ? (
                  <CheckCircle2 className='text-green-600' />
                ) : (
                  <XCircle className='text-red-600' />
                )}

                <div>
                  <h4 className='font-semibold'>Current Status</h4>

                  <p className='text-gray-500'>{coupon.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className='flex justify-end gap-4 pt-4'>
            <button
              onClick={onClose}
              className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
              Close
            </button>

            <button
              onClick={copyCode}
              className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white'>
              Copy Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
