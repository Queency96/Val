import {
  X,
  Bell,
  Users,
  Mail,
  Smartphone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function ViewNotificationModal({ open, onClose, notification }) {
  if (!open || !notification) return null;

  const statusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'bg-green-100 text-green-700';

      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700';

      case 'draft':
        return 'bg-blue-100 text-blue-700';

      case 'failed':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const channelIcon = (channel = '') => {
    switch (channel.toLowerCase()) {
      case 'email':
        return <Mail size={20} className='text-blue-600' />;

      case 'sms':
        return <Smartphone size={20} className='text-purple-600' />;

      default:
        return <Bell size={20} className='text-[#2F4832]' />;
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex justify-between items-center border-b p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-[#2F4832]/10 flex items-center justify-center'>
              <Bell className='text-[#2F4832]' size={28} />
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Notification Details</h2>

              <p className='text-gray-500'>Notification #{notification.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className='p-6 space-y-8'>
          {/* Summary */}

          <div className='grid md:grid-cols-4 gap-5'>
            <div className='border rounded-2xl p-5'>
              <Bell className='text-[#2F4832]' />

              <p className='text-sm text-gray-500 mt-3'>Notification ID</p>

              <h3 className='font-bold text-lg'>#{notification.id}</h3>
            </div>

            <div className='border rounded-2xl p-5'>
              {channelIcon(notification.channel)}

              <p className='text-sm text-gray-500 mt-3'>Channel</p>

              <h3 className='font-bold text-lg'>{notification.channel}</h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <Users className='text-blue-600' />

              <p className='text-sm text-gray-500 mt-3'>Audience</p>

              <h3 className='font-bold text-lg'>{notification.recipient}</h3>
            </div>

            <div className='border rounded-2xl p-5'>
              <Calendar className='text-orange-600' />

              <p className='text-sm text-gray-500 mt-3'>Created</p>

              <h3 className='font-bold text-lg'>{notification.createdAt}</h3>
            </div>
          </div>

          {/* Content */}

          <div className='border rounded-3xl p-6'>
            <div className='flex items-center gap-3 mb-5'>
              <FileText className='text-[#2F4832]' />

              <h3 className='text-xl font-bold'>Notification Content</h3>
            </div>

            <div className='space-y-5'>
              <div>
                <p className='text-sm text-gray-500 mb-2'>Title</p>

                <h2 className='text-2xl font-bold'>{notification.title}</h2>
              </div>

              <div>
                <p className='text-sm text-gray-500 mb-2'>Message</p>

                <div className='bg-gray-50 rounded-2xl p-5 text-gray-700 leading-7 whitespace-pre-wrap'>
                  {notification.message}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}

          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='border rounded-3xl p-6'>
              <h3 className='font-bold text-lg mb-5'>Delivery Information</h3>

              <div className='space-y-5'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Channel</span>

                  <span className='font-semibold'>{notification.channel}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Recipient</span>

                  <span className='font-semibold'>
                    {notification.recipient}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Priority</span>

                  <span className='font-semibold'>{notification.priority}</span>
                </div>
              </div>
            </div>

            <div className='border rounded-3xl p-6'>
              <h3 className='font-bold text-lg mb-5'>Status</h3>

              <div className='space-y-5'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>Current Status</span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                      notification.status,
                    )}`}>
                    {notification.status}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Scheduled Time</span>

                  <span className='font-semibold'>
                    {notification.scheduledAt || '--'}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-500'>Sent Time</span>

                  <span className='font-semibold'>
                    {notification.sentAt || '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}

          <div className='border rounded-3xl p-6'>
            <h3 className='text-xl font-bold mb-6'>Notification Timeline</h3>

            <div className='space-y-6'>
              <div className='flex gap-4'>
                <CheckCircle2 className='text-green-600 mt-1' />

                <div>
                  <h4 className='font-semibold'>Notification Created</h4>

                  <p className='text-gray-500 text-sm'>
                    {notification.createdAt}
                  </p>
                </div>
              </div>

              {notification.scheduledAt && (
                <div className='flex gap-4'>
                  <Clock className='text-yellow-600 mt-1' />

                  <div>
                    <h4 className='font-semibold'>Scheduled</h4>

                    <p className='text-gray-500 text-sm'>
                      {notification.scheduledAt}
                    </p>
                  </div>
                </div>
              )}

              <div className='flex gap-4'>
                {notification.status === 'Failed' ? (
                  <AlertCircle className='text-red-600 mt-1' />
                ) : (
                  <CheckCircle2 className='text-green-600 mt-1' />
                )}

                <div>
                  <h4 className='font-semibold'>Current Status</h4>

                  <p className='text-gray-500 text-sm'>{notification.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className='border-t p-6 flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-6 py-3 rounded-xl border hover:bg-gray-100'>
            Close
          </button>

          <button
            onClick={() => window.print()}
            className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white'>
            Print Notification
          </button>
        </div>
      </div>
    </div>
  );
}
