import { useState } from 'react';
import MessageStats from './components/MessageStats';
import MessageFilters from './components/MessageFilters';
import MessagesTable from './components/MessagesTable';
import ViewMessageModal from './components/ViewMessageModal';
import ReplyMessageModal from './components/ReplyMessageModal';
import DeleteMessageModal from './components/DeleteMessageModal';
import ComposeMessageModal from './components/ComposeMessageModal';

export default function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1001,
      subject: 'Order Delivery Delay',
      customer: {
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: '08012345678',
      },
      message:
        'Hello, I placed an order three days ago but it has not been delivered yet. Kindly assist.',
      status: 'Unread',
      priority: 'High',
      category: 'Support',
      date: '2026-08-01 10:30 AM',
      replied: false,
    },
    {
      id: 1002,
      subject: 'Product Availability',
      customer: {
        name: 'Mary Johnson',
        email: 'mary@gmail.com',
        phone: '08023456789',
      },
      message: 'When will the Samsung S25 Ultra be back in stock?',
      status: 'Read',
      priority: 'Medium',
      category: 'Sales',
      date: '2026-08-01 08:20 AM',
      replied: true,
    },
    {
      id: 1003,
      subject: 'Refund Request',
      customer: {
        name: 'David James',
        email: 'david@gmail.com',
        phone: '08034567890',
      },
      message:
        'I received a damaged product and would like to request a refund.',
      status: 'Unread',
      priority: 'High',
      category: 'Refund',
      date: '2026-07-31 06:45 PM',
      replied: false,
    },
    {
      id: 1004,
      subject: 'Partnership Inquiry',
      customer: {
        name: 'Grace Williams',
        email: 'grace@gmail.com',
        phone: '08045678901',
      },
      message:
        'We would like to discuss a partnership opportunity with your company.',
      status: 'Read',
      priority: 'Low',
      category: 'Business',
      date: '2026-07-30 11:05 AM',
      replied: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  const handleView = (message) => {
    setSelectedMessage(message);
    setViewOpen(true);

    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id ? { ...item, status: 'Read' } : item,
      ),
    );
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyOpen(true);
  };

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setMessages((prev) =>
      prev.filter((item) => item.id !== selectedMessage.id),
    );

    setDeleteOpen(false);
    setSelectedMessage(null);
  };

  const handleSendReply = (reply) => {
    console.log(reply);

    setMessages((prev) =>
      prev.map((item) =>
        item.id === selectedMessage.id ? { ...item, replied: true } : item,
      ),
    );

    setReplyOpen(false);
  };

  const handleCompose = (payload) => {
    console.log(payload);
    setComposeOpen(false);
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}

      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Messages</h1>

          <p className='text-gray-500 mt-1'>
            Manage customer enquiries, support tickets and conversations.
          </p>
        </div>

        <button
          onClick={() => setComposeOpen(true)}
          className='px-6 py-3 rounded-2xl bg-[#2F4832] text-white hover:bg-[#243927] transition'>
          Compose Message
        </button>
      </div>

      <MessageStats messages={messages} />

      <MessageFilters />

      <MessagesTable
        messages={messages}
        onView={handleView}
        onReply={handleReply}
        onDelete={handleDelete}
      />

      <ViewMessageModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        message={selectedMessage}
      />

      <ReplyMessageModal
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        message={selectedMessage}
        onSend={handleSendReply}
      />

      <DeleteMessageModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        message={selectedMessage}
        onDelete={confirmDelete}
      />

      <ComposeMessageModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSend={handleCompose}
      />
    </div>
  );
}
