import {
  Eye,
  Trash2,
  Send,
  Clock,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function NotificationsTable({
  notifications = [],
  onView,
  onDelete,
  onStatusChange,
}) {
  const statusBadge = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-700';

      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-700';

      case 'Draft':
        return 'bg-blue-100 text-blue-700';

      case 'Failed':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'Sent':
        return <CheckCircle2 size={16} />;

      case 'Scheduled':
        return <Clock size={16} />;

      case 'Failed':
        return <AlertCircle size={16} />;

      default:
        return <Send size={16} />;
    }
  };

  return (
    <div className='bg-white rounded-3xl border shadow-sm overflow-hidden'>
      {/* Header */}

      <div className='px-6 py-5 border-b flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Notifications</h2>

          <p className='text-gray-500 mt-1'>Manage all system notifications</p>
        </div>

        <div className='text-sm text-gray-500'>
          Total:
          <span className='font-semibold text-[#2F4832] ml-2'>
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Table */}

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-sm text-gray-500'>
              <th className='px-6 py-4'>Title</th>

              <th className='px-6 py-4'>Recipient</th>

              <th className='px-6 py-4'>Channel</th>

              <th className='px-6 py-4'>Priority</th>

              <th className='px-6 py-4'>Status</th>

              <th className='px-6 py-4'>Created</th>

              <th className='px-6 py-4 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center py-16 text-gray-500'>
                  No notifications found.
                </td>
              </tr>
            ) : (
              notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className='border-t hover:bg-gray-50 transition'>
                  {/* Title */}

                  <td className='px-6 py-5'>
                    <div>
                      <h3 className='font-semibold text-gray-900'>
                        {notification.title}
                      </h3>

                      <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
                        {notification.message}
                      </p>
                    </div>
                  </td>

                  {/* Recipient */}

                  <td className='px-6 py-5'>
                    <div>
                      <p className='font-medium'>{notification.recipient}</p>

                      <p className='text-xs text-gray-500'>
                        {notification.recipientType}
                      </p>
                    </div>
                  </td>

                  {/* Channel */}

                  <td className='px-6 py-5'>
                    <span className='px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm'>
                      {notification.channel}
                    </span>
                  </td>

                  {/* Priority */}

                  <td className='px-6 py-5'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        notification.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : notification.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}>
                      {notification.priority}
                    </span>
                  </td>

                  {/* Status */}

                  <td className='px-6 py-5'>
                    <select
                      value={notification.status}
                      onChange={(e) =>
                        onStatusChange?.(notification.id, e.target.value)
                      }
                      className={`rounded-full px-3 py-2 text-sm font-medium border-0 ${statusBadge(
                        notification.status,
                      )}`}>
                      <option value='Draft'>Draft</option>

                      <option value='Scheduled'>Scheduled</option>

                      <option value='Sent'>Sent</option>

                      <option value='Failed'>Failed</option>
                    </select>
                  </td>

                  {/* Created */}

                  <td className='px-6 py-5 text-sm text-gray-500'>
                    {notification.createdAt}
                  </td>

                  {/* Actions */}

                  <td className='px-6 py-5'>
                    <div className='flex justify-center gap-2'>
                      <button
                        onClick={() => onView?.(notification)}
                        className='w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(notification)}
                        className='w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center'>
                        <Trash2 size={18} />
                      </button>

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusBadge(
                          notification.status,
                        )}`}>
                        {statusIcon(notification.status)}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className='px-6 py-4 border-t bg-gray-50 flex justify-between items-center text-sm text-gray-500'>
        <span>
          Showing <strong>{notifications.length}</strong> notifications
        </span>

        <span>
          Sent:
          <strong className='text-green-600 ml-1'>
            {notifications.filter((n) => n.status === 'Sent').length}
          </strong>
          {' • '}
          Scheduled:
          <strong className='text-yellow-600 ml-1'>
            {notifications.filter((n) => n.status === 'Scheduled').length}
          </strong>
          {' • '}
          Failed:
          <strong className='text-red-600 ml-1'>
            {notifications.filter((n) => n.status === 'Failed').length}
          </strong>
        </span>
      </div>
    </div>
  );
}
