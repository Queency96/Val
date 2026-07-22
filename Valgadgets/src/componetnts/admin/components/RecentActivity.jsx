import {
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  Package,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';

export default function RecentActivity({
  orders = [],
  messages = [],
  lowStockProducts = [],
}) {
  // =========================
  // BUILD ACTIVITIES
  // =========================
  const activities = [];

  // Orders
  orders.forEach((order) => {
    activities.push({
      id: `order-${order.id}`,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      title: `New order from ${order.customer?.name || 'Customer'}`,
      subtitle: `₦${(order.total || 0).toLocaleString()}`,
      time: order.createdAt || new Date().toISOString(),
    });

    if (order.status === 'paid') {
      activities.push({
        id: `paid-${order.id}`,
        icon: CreditCard,
        color: 'text-green-600',
        bg: 'bg-green-100',
        title: 'Payment received',
        subtitle: `Order #${order.id}`,
        time: order.createdAt || new Date().toISOString(),
      });
    }

    if (order.status === 'delivered') {
      activities.push({
        id: `delivered-${order.id}`,
        icon: Truck,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        title: 'Order delivered',
        subtitle: `Order #${order.id}`,
        time: order.createdAt || new Date().toISOString(),
      });
    }
  });

  // Customer messages
  messages.forEach((msg) => {
    activities.push({
      id: `msg-${msg.id}`,
      icon: MessageCircle,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
      title: `Message from ${msg.name}`,
      subtitle: msg.subject || 'Customer enquiry',
      time: msg.createdAt || new Date().toISOString(),
    });
  });

  // Low stock alerts
  lowStockProducts.forEach((product) => {
    activities.push({
      id: `stock-${product.id}`,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      title: `${product.name} is running low`,
      subtitle: `${product.stock} left in stock`,
      time: new Date().toISOString(),
    });
  });

  // Sort newest first
  activities.sort((a, b) => new Date(b.time) - new Date(a.time));

  const latest = activities.slice(0, 12);

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-6'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Recent Activity</h2>

          <p className='text-sm text-gray-500'>
            Latest updates across your store
          </p>
        </div>

        <div className='bg-[#2F4832]/10 text-[#2F4832] px-3 py-1 rounded-full text-sm font-semibold'>
          {latest.length} Updates
        </div>
      </div>

      {/* EMPTY */}
      {latest.length === 0 && (
        <div className='py-10 text-center'>
          <Package size={40} className='mx-auto text-gray-300 mb-3' />

          <p className='text-gray-500'>No recent activity.</p>
        </div>
      )}

      {/* LIST */}
      <div className='space-y-4'>
        {latest.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className='flex items-start gap-4 pb-4 border-b last:border-none'>
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${activity.bg}`}>
                <Icon size={18} className={activity.color} />
              </div>

              <div className='flex-1'>
                <h4 className='font-semibold'>{activity.title}</h4>

                <p className='text-sm text-gray-500'>{activity.subtitle}</p>
              </div>

              <span className='text-xs text-gray-400 whitespace-nowrap'>
                {new Date(activity.time).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
