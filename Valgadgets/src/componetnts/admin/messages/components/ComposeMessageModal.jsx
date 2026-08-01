import { useState } from 'react';
import {
  X,
  Send,
  User,
  Mail,
  MessageSquare,
  Tag,
  AlertCircle,
} from 'lucide-react';

export default function ComposeMessageModal({ open, onClose, onSend }) {
  const initialState = {
    recipient: '',
    email: '',
    subject: '',
    category: 'General',
    priority: 'Medium',
    message: '',
  };

  const [form, setForm] = useState(initialState);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSend?.({
      ...form,
      id: Date.now(),
      date: new Date().toLocaleString(),
    });

    setForm(initialState);
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center border-b p-6'>
          <div>
            <h2 className='text-2xl font-bold'>Compose Message</h2>

            <p className='text-gray-500 mt-1'>Send a message to a customer.</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Recipient */}

          <div className='grid md:grid-cols-2 gap-5'>
            <div>
              <label className='font-medium text-sm mb-2 block'>
                Recipient
              </label>

              <div className='relative'>
                <User
                  size={18}
                  className='absolute left-3 top-3 text-gray-400'
                />

                <input
                  type='text'
                  name='recipient'
                  value={form.recipient}
                  onChange={handleChange}
                  required
                  placeholder='Customer name'
                  className='w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
                />
              </div>
            </div>

            <div>
              <label className='font-medium text-sm mb-2 block'>Email</label>

              <div className='relative'>
                <Mail
                  size={18}
                  className='absolute left-3 top-3 text-gray-400'
                />

                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder='customer@email.com'
                  className='w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
                />
              </div>
            </div>
          </div>

          {/* Subject */}

          <div>
            <label className='font-medium text-sm mb-2 block'>Subject</label>

            <div className='relative'>
              <Tag size={18} className='absolute left-3 top-3 text-gray-400' />

              <input
                type='text'
                name='subject'
                value={form.subject}
                onChange={handleChange}
                required
                placeholder='Message subject'
                className='w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>
          </div>

          {/* Category & Priority */}

          <div className='grid md:grid-cols-2 gap-5'>
            <div>
              <label className='font-medium text-sm mb-2 block'>Category</label>

              <select
                name='category'
                value={form.category}
                onChange={handleChange}
                className='w-full border rounded-xl px-4 py-3'>
                <option>General</option>
                <option>Support</option>
                <option>Sales</option>
                <option>Order</option>
                <option>Refund</option>
                <option>Promotion</option>
              </select>
            </div>

            <div>
              <label className='font-medium text-sm mb-2 block'>Priority</label>

              <div className='relative'>
                <AlertCircle
                  size={18}
                  className='absolute left-3 top-3 text-gray-400'
                />

                <select
                  name='priority'
                  value={form.priority}
                  onChange={handleChange}
                  className='w-full border rounded-xl pl-10 pr-4 py-3'>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message */}

          <div>
            <label className='font-medium text-sm mb-2 block'>Message</label>

            <div className='relative'>
              <MessageSquare
                size={18}
                className='absolute left-3 top-4 text-gray-400'
              />

              <textarea
                rows={8}
                name='message'
                value={form.message}
                onChange={handleChange}
                required
                placeholder='Write your message...'
                className='w-full border rounded-2xl pl-10 pr-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
              />
            </div>
          </div>

          {/* Footer */}

          <div className='flex justify-end gap-4 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
              Cancel
            </button>

            <button
              type='submit'
              className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white flex items-center gap-2'>
              <Send size={18} />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
