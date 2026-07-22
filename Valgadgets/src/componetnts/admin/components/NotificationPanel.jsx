import { useMemo } from 'react';
import {
  Bell,
  ShoppingCart,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
  X,
  Trash2,
} from 'lucide-react';

export default function NotificationPanel({
  open,
  notifications = [],
  onClose,
  onClearAll,
  onRemove,
  onMarkAsRead,
}) {
  if (!open) return null;

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingCart size={18} />;

      case 'delivery':
        return <Truck size={18} />;

      case 'inventory':
        return <Package size={18} />;

      case 'success':
        return <CheckCircle2 size={18} />;

      case 'warning':
        return <AlertTriangle size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600';

      case 'delivery':
        return 'bg-purple-100 text-purple-600';

      case 'inventory':
        return 'bg-orange-100 text-orange-600';

      case 'success':
        return 'bg-green-100 text-green-600';

      case 'warning':
        return 'bg-red-100 text-red-600';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      {/* Overlay */}

      <div onClick={onClose} className='fixed inset-0 bg-black/30 z-40' />

      {/* Drawer */}

      <aside className='fixed right-0 top-0 h-screen w-full md:w-[430px] bg-white shadow-2xl z-50 flex flex-col'>
        {/* Header */}

        <div className='border-b px-6 py-5 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Notifications</h2>

            <p className='text-sm text-gray-500'>
              {unreadCount} unread notification
              {unreadCount !== 1 && 's'}
            </p>
          </div>

          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-gray-100'>
            <X size={22} />
          </button>
        </div>

        {/* Actions */}

        <div className='px-6 py-4 border-b flex justify-between items-center'>
          <button
            onClick={onClearAll}
            className='text-red-600 text-sm font-medium hover:text-red-700 flex items-center gap-2'>
            <Trash2 size={16} />
            Clear All
          </button>

          <span className='text-sm text-gray-500'>
            {notifications.length} Total
          </span>
        </div>

        {/* Notifications */}

        <div className='flex-1 overflow-y-auto'>
          {notifications.length === 0 ? (
            <div className='h-full flex flex-col justify-center items-center text-center px-8'>
              <Bell size={60} className='text-gray-300 mb-5' />

              <h3 className='font-bold text-xl'>No Notifications</h3>

              <p className='text-gray-500 mt-2'>You're all caught up.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b p-5 hover:bg-gray-50 transition ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}>
                <div className='flex gap-4'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(
                      notification.type,
                    )}`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className='flex-1'>
                    <div className='flex justify-between'>
                      <h4 className='font-semibold'>{notification.title}</h4>

                      {!notification.read && (
                        <span className='w-2.5 h-2.5 rounded-full bg-blue-500 mt-2' />
                      )}
                    </div>

                    <p className='text-sm text-gray-600 mt-1'>
                      {notification.message}
                    </p>

                    <div className='mt-3 flex justify-between items-center'>
                      <span className='text-xs text-gray-400'>
                        {notification.time}
                      </span>

                      <div className='flex gap-3'>
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead?.(notification.id)}
                            className='text-xs text-blue-600 hover:text-blue-700'>
                            Mark Read
                          </button>
                        )}

                        <button
                          onClick={() => onRemove?.(notification.id)}
                          className='text-xs text-red-600 hover:text-red-700'>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}



  // Expected Notification Object

  // {
  //   id: 1,
  //   type: "order", // order | delivery | inventory | success | warning
  //   title: "New Order Received",
  //   message: "Order #ORD-1032 was placed by John Doe.",
  //   time: "2 mins ago",
  //   read: false,
// }