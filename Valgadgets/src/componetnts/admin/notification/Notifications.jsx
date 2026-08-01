import { useMemo, useState } from 'react';

import NotificationStats from './components/NotificationStats';
import NotificationFilters from './components/NotificationFilters';
import NotificationsTable from './components/NotificationsTable';
import ViewNotificationModal from './components/ViewNotificationModal';
import SendNotificationModal from './components/SendNotificationModal';
import DeleteNotificationModal from './components/DeleteNotificationModal';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1001,
      title: 'Order Delivered',
      message: 'Your order #VG2039485 has been delivered successfully.',
      recipient: 'John Doe',
      recipientType: 'Customer',
      channel: 'Push',
      status: 'Sent',
      priority: 'High',
      createdAt: '2026-07-30 10:30 AM',
      read: true,
    },
    {
      id: 1002,
      title: 'New Product Available',
      message: 'Check out the latest iPhone 18 Pro Max available now.',
      recipient: 'All Customers',
      recipientType: 'Broadcast',
      channel: 'Email',
      status: 'Scheduled',
      priority: 'Medium',
      createdAt: '2026-07-30 02:15 PM',
      read: false,
    },
    {
      id: 1003,
      title: 'Payment Failed',
      message: 'Your payment could not be processed. Please try again.',
      recipient: 'Mary Johnson',
      recipientType: 'Customer',
      channel: 'SMS',
      status: 'Failed',
      priority: 'High',
      createdAt: '2026-07-29 08:15 AM',
      read: false,
    },
  ]);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const [selectedNotification, setSelectedNotification] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.recipient.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === 'All' ||
        notification.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [notifications, search, status]);

  const handleView = (notification) => {
    setSelectedNotification(notification);
    setViewOpen(true);
  };

  const handleDelete = (notification) => {
    setSelectedNotification(notification);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => notification.id !== selectedNotification.id,
      ),
    );

    setDeleteOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: newStatus,
            }
          : notification,
      ),
    );
  };

  return (
    <div className='space-y-6 p-6'>
      <NotificationStats notifications={notifications} />

      <NotificationFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCompose={() => setSendOpen(true)}
      />

      <NotificationsTable
        notifications={filteredNotifications}
        onView={handleView}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ViewNotificationModal
        open={viewOpen}
        notification={selectedNotification}
        onClose={() => setViewOpen(false)}
      />

      <SendNotificationModal
        open={sendOpen}
        onClose={() => setSendOpen(false)}
      />

      <DeleteNotificationModal
        open={deleteOpen}
        notification={selectedNotification}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
