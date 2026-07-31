import { useEffect, useState } from 'react';
import { X, Save, Crown } from 'lucide-react';

export default function EditCustomerModal({ open, customer, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
    vip: false,
  });

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        status: customer.status || 'Active',
        vip: customer.vip || false,
      });
    }
  }, [customer]);

  if (!open || !customer) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSave?.({
      ...customer,
      ...form,
    });

    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden'>
        {/* Header */}

        <div className='flex items-center justify-between border-b px-8 py-6'>
          <div>
            <h2 className='text-2xl font-bold'>Edit Customer</h2>

            <p className='text-gray-500 mt-1'>Update customer information</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className='p-8 space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold mb-2'>
                Full Name
              </label>

              <input
                name='name'
                value={form.name}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>Email</label>

              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>
                Phone Number
              </label>

              <input
                name='phone'
                value={form.phone}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>Status</label>

              <select
                name='status'
                value={form.status}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'>
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Address</label>

            <textarea
              rows='4'
              name='address'
              value={form.address}
              onChange={handleChange}
              className='w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          {/* VIP */}

          <div className='border rounded-2xl p-5 bg-yellow-50 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Crown className='text-yellow-600' size={24} />

              <div>
                <h3 className='font-semibold'>VIP Customer</h3>

                <p className='text-sm text-gray-600'>
                  Give this customer premium benefits.
                </p>
              </div>
            </div>

            <input
              type='checkbox'
              name='vip'
              checked={form.vip}
              onChange={handleChange}
              className='w-5 h-5 accent-[#2F4832]'
            />
          </div>
        </div>

        {/* Footer */}

        <div className='border-t px-8 py-5 flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className='flex items-center gap-2 bg-[#2F4832] hover:bg-[#223524] text-white px-6 py-3 rounded-xl'>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
