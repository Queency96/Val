import { useEffect, useState } from 'react';
import { X, Send, Mail, User, MessageSquare, Paperclip } from 'lucide-react';

export default function ReplyMessageModal({ open, onClose, message, onSend }) {
  const [subject, setSubject] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (message) {
      setSubject(`Re: ${message.subject || ''}`);
      setReply('');
    }
  }, [message]);

  if (!open || !message) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reply.trim()) return;

    onSend?.({
      id: message.id,
      subject,
      reply,
      repliedAt: new Date().toISOString(),
    });

    setReply('');
    onClose?.();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex items-center justify-between border-b p-6'>
          <div>
            <h2 className='text-2xl font-bold'>Reply Message</h2>

            <p className='text-gray-500 mt-1'>Send a reply to the customer.</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Customer */}

          <div className='grid md:grid-cols-2 gap-5'>
            <div className='border rounded-2xl p-5'>
              <div className='flex items-center gap-3'>
                <User className='text-[#2F4832]' />

                <div>
                  <p className='text-gray-500 text-sm'>Customer</p>

                  <h3 className='font-semibold'>
                    {message.customer?.name ||
                      message.recipient ||
                      'Unknown Customer'}
                  </h3>
                </div>
              </div>
            </div>

            <div className='border rounded-2xl p-5'>
              <div className='flex items-center gap-3'>
                <Mail className='text-[#2F4832]' />

                <div>
                  <p className='text-gray-500 text-sm'>Email</p>

                  <h3 className='font-semibold'>
                    {message.customer?.email || message.email || '--'}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Original Message */}

          <div className='border rounded-3xl p-6 bg-gray-50'>
            <h3 className='font-bold text-lg mb-4'>Original Message</h3>

            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-500 mb-1'>Subject</p>

                <p className='font-semibold'>{message.subject}</p>
              </div>

              <div>
                <p className='text-sm text-gray-500 mb-1'>Message</p>

                <p className='leading-7 text-gray-700'>{message.message}</p>
              </div>
            </div>
          </div>

          {/* Reply Subject */}

          <div>
            <label className='block font-medium mb-2'>Reply Subject</label>

            <input
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          {/* Reply */}

          <div>
            <label className='block font-medium mb-2'>Your Reply</label>

            <div className='relative'>
              <MessageSquare
                size={18}
                className='absolute left-4 top-4 text-gray-400'
              />

              <textarea
                rows={8}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder='Write your reply...'
                className='w-full border rounded-2xl pl-11 pr-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
                required
              />
            </div>
          </div>

          {/* Attachment */}

          <div>
            <button
              type='button'
              className='flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-gray-50 transition'>
              <Paperclip size={18} />
              Attach File
            </button>
          </div>

          {/* Footer */}

          <div className='flex justify-end gap-4 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-3 rounded-xl border hover:bg-gray-100 transition'>
              Cancel
            </button>

            <button
              type='submit'
              className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white flex items-center gap-2 transition'>
              <Send size={18} />
              Send Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
