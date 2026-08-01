import { useEffect, useState } from 'react';
import {
  X,
  Bell,
  Send,
  Calendar,
  Users,
  Mail,
  Smartphone,
  MessageSquare,
} from 'lucide-react';

export default function SendNotificationModal({ open, onClose, onSend }) {
  const initialState = {
    title: '',
    message: '',
    recipient: 'All Users',
    channel: 'Push',
    priority: 'Medium',
    schedule: false,
    scheduledAt: '',
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      setForm(initialState);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert('Notification title is required.');
      return;
    }

    if (!form.message.trim()) {
      alert('Notification message is required.');
      return;
    }

    if (form.schedule && !form.scheduledAt) {
      alert('Please choose a scheduled date.');
      return;
    }

    onSend?.({
      id: Date.now(),
      ...form,
      status: form.schedule ? 'Scheduled' : 'Sent',
      createdAt: new Date().toLocaleString(),
    });

    onClose();
  };

  const ChannelIcon =
    form.channel === 'Email'
      ? Mail
      : form.channel === 'SMS'
        ? Smartphone
        : MessageSquare;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center border-b p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-[#2F4832]/10 flex items-center justify-center'>
              <Bell size={28} className='text-[#2F4832]' />
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Send Notification</h2>

              <p className='text-gray-500'>
                Create and send a new notification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className='p-6 space-y-6'>
          {/* Title */}

          <div>
            <label className='block font-medium mb-2'>Notification Title</label>

            <input
              type='text'
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder='Enter title...'
              className='w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          {/* Message */}

          <div>
            <label className='block font-medium mb-2'>Message</label>

            <textarea
              rows={6}
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder='Write your notification...'
              className='w-full border rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          {/* Grid */}

          <div className='grid md:grid-cols-2 gap-5'>
            {/* Recipient */}

            <div>
              <label className='block font-medium mb-2'>Recipient</label>

              <div className='relative'>
                <Users
                  size={18}
                  className='absolute left-4 top-4 text-gray-400'
                />

                <select
                  value={form.recipient}
                  onChange={(e) => handleChange('recipient', e.target.value)}
                  className='w-full border rounded-2xl pl-11 pr-4 py-3'>
                  <option>All Users</option>

                  <option>Customers</option>

                  <option>Vendors</option>

                  <option>Riders</option>

                  <option>Admins</option>
                </select>
              </div>
            </div>

            {/* Channel */}

            <div>
              <label className='block font-medium mb-2'>Delivery Channel</label>

              <div className='relative'>
                <ChannelIcon
                  size={18}
                  className='absolute left-4 top-4 text-gray-400'
                />

                <select
                  value={form.channel}
                  onChange={(e) => handleChange('channel', e.target.value)}
                  className='w-full border rounded-2xl pl-11 pr-4 py-3'>
                  <option>Push</option>

                  <option>Email</option>

                  <option>SMS</option>
                </select>
              </div>
            </div>

            {/* Priority */}

            <div>
              <label className='block font-medium mb-2'>Priority</label>

              <select
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className='w-full border rounded-2xl px-4 py-3'>
                <option>Low</option>

                <option>Medium</option>

                <option>High</option>
              </select>
            </div>

            {/* Schedule */}

            <div>
              <label className='block font-medium mb-2'>Send Time</label>

              <div className='flex items-center gap-3 mb-3'>
                <input
                  type='checkbox'
                  checked={form.schedule}
                  onChange={(e) => handleChange('schedule', e.target.checked)}
                />

                <span>Schedule notification</span>
              </div>

              {form.schedule && (
                <div className='relative'>
                  <Calendar
                    size={18}
                    className='absolute left-4 top-4 text-gray-400'
                  />

                  <input
                    type='datetime-local'
                    value={form.scheduledAt}
                    onChange={(e) =>
                      handleChange('scheduledAt', e.target.value)
                    }
                    className='w-full border rounded-2xl pl-11 pr-4 py-3'
                  />
                </div>
              )}
            </div>
          </div>

          {/* Preview */}

          <div className='rounded-3xl border bg-gray-50 p-6'>
            <h3 className='font-bold mb-4'>Preview</h3>

            <div className='bg-white rounded-2xl border p-5'>
              <div className='flex items-center gap-3 mb-3'>
                <Bell className='text-[#2F4832]' size={20} />

                <span className='font-bold'>
                  {form.title || 'Notification Title'}
                </span>
              </div>

              <p className='text-gray-600'>
                {form.message || 'Your notification message will appear here.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t p-6 flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-6 py-3 rounded-2xl border hover:bg-gray-100'>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className='px-6 py-3 rounded-2xl bg-[#2F4832] hover:bg-[#243927] text-white flex items-center gap-2'>
            <Send size={18} />

            {form.schedule ? 'Schedule Notification' : 'Send Notification'}
          </button>
        </div>
      </div>
    </div>
  );
}
