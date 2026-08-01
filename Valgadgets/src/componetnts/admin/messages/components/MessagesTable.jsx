import { Search, Eye, Trash2, Mail, Smartphone, Bell } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function MessagesTable({ messages = [], onView, onDelete }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const recipient =
        typeof message.recipient === 'string'
          ? message.recipient.toLowerCase()
          : '';

      const subject =
        typeof message.subject === 'string'
          ? message.subject.toLowerCase()
          : '';

      const id = String(message.id ?? '');

      const matchesSearch =
        recipient.includes(search.toLowerCase()) ||
        subject.includes(search.toLowerCase()) ||
        id.includes(search);

      const matchesStatus =
        status === 'all' || (message.status || '').toLowerCase() === status;

      const matchesType =
        type === 'all' || (message.type || '').toLowerCase() === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [messages, search, status, type]);

  const statusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'sent':
        return 'bg-green-100 text-green-700';

      case 'pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'failed':
        return 'bg-red-100 text-red-700';

      case 'draft':
        return 'bg-gray-100 text-gray-700';

      case 'read':
        return 'bg-blue-100 text-blue-700';

      case 'unread':
        return 'bg-purple-100 text-purple-700';

      default:
        return 'bg-gray-100 text-gray-700';
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
    <div className='bg-white rounded-3xl shadow-sm border'>
      {/* Header */}

      <div className='p-6 border-b flex flex-col lg:flex-row justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Messages</h2>

          <p className='text-gray-500'>Manage all system messages</p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-gray-400' />

            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#2F4832] outline-none'
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border rounded-xl px-4'>
            <option value='all'>All Status</option>
            <option value='sent'>Sent</option>
            <option value='pending'>Pending</option>
            <option value='failed'>Failed</option>
            <option value='draft'>Draft</option>
            <option value='read'>Read</option>
            <option value='unread'>Unread</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='border rounded-xl px-4'>
            <option value='all'>All Types</option>
            <option value='email'>Email</option>
            <option value='sms'>SMS</option>
            <option value='push'>Push</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-sm text-gray-500'>
              <th className='p-4'>ID</th>
              <th className='p-4'>Recipient</th>
              <th className='p-4'>Subject</th>
              <th className='p-4'>Type</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Date</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMessages.length === 0 ? (
              <tr>
                <td colSpan={7} className='py-20 text-center text-gray-500'>
                  No messages found.
                </td>
              </tr>
            ) : (
              filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  className='border-t hover:bg-gray-50 transition'>
                  <td className='p-4 font-semibold'>#{message.id}</td>

                  <td className='p-4'>
                    <div>
                      <p className='font-semibold'>{message.recipient}</p>

                      <p className='text-xs text-gray-500'>
                        {message.email || message.phone || ''}
                      </p>
                    </div>
                  </td>

                  <td className='p-4'>{message.subject}</td>

                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      {typeIcon(message.type)}

                      <span className='capitalize'>{message.type}</span>
                    </div>
                  </td>

                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                        message.status,
                      )}`}>
                      {message.status}
                    </span>
                  </td>

                  <td className='p-4'>{message.date}</td>

                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => onView?.(message)}
                        className='w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(message)}
                        className='w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center'>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className='border-t p-5 flex justify-between text-sm text-gray-500'>
        <span>
          Showing <strong>{filteredMessages.length}</strong> of{' '}
          <strong>{messages.length}</strong> messages
        </span>

        <span>
          Sent:
          <strong className='text-[#2F4832] ml-1'>
            {
              messages.filter((m) => (m.status || '').toLowerCase() === 'sent')
                .length
            }
          </strong>
        </span>
      </div>
    </div>
  );
}
