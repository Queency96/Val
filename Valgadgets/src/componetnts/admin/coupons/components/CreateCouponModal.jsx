import { useState } from 'react';
import { X, TicketPercent } from 'lucide-react';

export default function CreateCouponModal({ open, onClose, onCreate }) {
  const initialState = {
    code: '',
    description: '',
    type: 'percentage',
    discount: '',
    minimumOrder: '',
    maximumDiscount: '',
    usageLimit: '',
    expiry: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialState);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const coupon = {
      id: Date.now(),
      ...formData,
      used: 0,
    };

    onCreate?.(coupon);

    setFormData(initialState);

    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center border-b p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-[#2F4832]/10 flex items-center justify-center'>
              <TicketPercent size={28} className='text-[#2F4832]' />
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Create Coupon</h2>

              <p className='text-gray-500'>Create a new promotional coupon</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Coupon Info */}

          <div className='grid md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Coupon Code
              </label>

              <input
                name='code'
                value={formData.code}
                onChange={handleChange}
                required
                placeholder='WELCOME20'
                className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Coupon Type
              </label>

              <select
                name='type'
                value={formData.type}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'>
                <option value='percentage'>Percentage</option>

                <option value='fixed'>Fixed Amount</option>

                <option value='free_shipping'>Free Shipping</option>
              </select>
            </div>
          </div>

          {/* Description */}

          <div>
            <label className='block text-sm font-medium mb-2'>
              Description
            </label>

            <textarea
              rows={3}
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Coupon description...'
              className='w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          {/* Discount */}

          <div className='grid md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-sm font-medium mb-2'>Discount</label>

              <input
                type='number'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                required
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Minimum Order (₦)
              </label>

              <input
                type='number'
                name='minimumOrder'
                value={formData.minimumOrder}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>
          </div>

          {/* Limits */}

          <div className='grid md:grid-cols-3 gap-5'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Maximum Discount
              </label>

              <input
                type='number'
                name='maximumDiscount'
                value={formData.maximumDiscount}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Usage Limit
              </label>

              <input
                type='number'
                name='usageLimit'
                value={formData.usageLimit}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Expiry Date
              </label>

              <input
                type='date'
                name='expiry'
                value={formData.expiry}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>
          </div>

          {/* Status */}

          <div>
            <label className='block text-sm font-medium mb-2'>Status</label>

            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='w-full border rounded-xl px-4 py-3'>
              <option>Active</option>
              <option>Scheduled</option>
              <option>Disabled</option>
            </select>
          </div>

          {/* Footer */}

          <div className='flex justify-end gap-4 pt-4 border-t'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
              Cancel
            </button>

            <button
              type='submit'
              className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white'>
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
