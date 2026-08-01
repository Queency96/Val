import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bell,
  Smartphone,
} from 'lucide-react';

export default function ViewMessageModal({ open, onClose, message }) {
  if (!open || !message) return null;

  const statusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'sent':
        return 'bg-green-100 text-green-700';

      case 'delivered':
        return 'bg-emerald-100 text-emerald-700';

      case 'pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'failed':
        return 'bg-red-100 text-red-700';

      case 'draft':
        return 'bg-gray-100 text-gray-700';

      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const statusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'sent':
      case 'delivered':
        return <CheckCircle2 size={18} />;

      case 'pending':
        return <Clock size={18} />;

      case 'failed':
        return <AlertCircle size={18} />;

      default:
        return <Clock size={18} />;
    }
  };

  const typeIcon = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'email':
        return <Mail size={18} />;

      case 'sms':
        return <Smartphone size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5'>
      <div className='bg-white rounded-3xl shadow-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center border-b p-6'>
          <div>
            <h2 className='text-2xl font-bold'>Message Details</h2>

            <p className='text-gray-500 mt-1'>Message #{message.id}</p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        <div className='p-6 space-y-8'>
          {/* Summary */}

          <div className='grid md:grid-cols-4 gap-5'>
            <div className='border rounded-2xl p-5'>
              <Tag className='text-[#2F4832]' />

              <p className='text-sm text-gray-500 mt-2'>Message ID</p>

              <h3 className='font-bold text-lg'>#{message.id}</h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <div className='text-[#2F4832]'>{typeIcon(message.type)}</div>

              <p className='text-sm text-gray-500 mt-2'>Type</p>

              <h3 className='font-bold text-lg capitalize'>
                {message.type || 'Email'}
              </h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <div className='text-green-600'>{statusIcon(message.status)}</div>

              <p className='text-sm text-gray-500 mt-2'>Status</p>

              <span
                className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                  message.status,
                )}`}>
                {message.status}
              </span>
            </div>

            <div className='border rounded-2xl p-5'>
              <Calendar className='text-orange-500' />

              <p className='text-sm text-gray-500 mt-2'>Date</p>

              <h3 className='font-bold'>{message.date || '--'}</h3>
            </div>
          </div>

          {/* Recipient */}

          <div className='border rounded-3xl p-6'>
            <h3 className='text-xl font-bold mb-5'>Recipient Information</h3>

            <div className='grid md:grid-cols-3 gap-6'>
              <div className='flex items-center gap-3'>
                <User className='text-[#2F4832]' />

                <div>
                  <p className='text-sm text-gray-500'>Recipient</p>

                  <h4 className='font-semibold'>
                    {message.recipient || message.customer?.name || '--'}
                  </h4>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Mail className='text-[#2F4832]' />

                <div>
                  <p className='text-sm text-gray-500'>Email</p>

                  <h4 className='font-semibold'>
                    {message.email || message.customer?.email || '--'}
                  </h4>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Phone className='text-[#2F4832]' />

                <div>
                  <p className='text-sm text-gray-500'>Phone</p>

                  <h4 className='font-semibold'>
                    {message.phone || message.customer?.phone || '--'}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Subject */}

          <div className='border rounded-3xl p-6'>
            <h3 className='text-xl font-bold mb-4'>Subject</h3>

            <p className='text-lg font-semibold'>{message.subject}</p>
          </div>

          {/* Message */}

          <div className='border rounded-3xl p-6'>
            <div className='flex items-center gap-2 mb-5'>
              <MessageSquare className='text-[#2F4832]' />

              <h3 className='text-xl font-bold'>Message Content</h3>
            </div>

            <div className='rounded-2xl bg-gray-50 p-6 leading-8 whitespace-pre-wrap text-gray-700'>
              {message.message}
            </div>
          </div>

          {/* Footer */}

          <div className='flex justify-end gap-4'>
            <button
              onClick={onClose}
              className='px-6 py-3 rounded-xl border hover:bg-gray-100 transition'>
              Close
            </button>

            <button
              onClick={() => window.print()}
              className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white transition'>
              Print Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
