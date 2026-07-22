import {
  Plus,
  ShoppingBag,
  Users,
  Package,
  Tag,
  MessageCircle,
  Truck,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Product',
      icon: Plus,
      color: 'bg-emerald-100 text-emerald-700',
      path: '/admin/products/new',
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-700',
      path: '/admin/orders',
    },
    {
      title: 'Customers',
      icon: Users,
      color: 'bg-violet-100 text-violet-700',
      path: '/admin/customers',
    },
    {
      title: 'Inventory',
      icon: Package,
      color: 'bg-orange-100 text-orange-700',
      path: '/admin/inventory',
    },
    {
      title: 'Coupons',
      icon: Tag,
      color: 'bg-pink-100 text-pink-700',
      path: '/admin/marketing',
    },
    {
      title: 'Messages',
      icon: MessageCircle,
      color: 'bg-cyan-100 text-cyan-700',
      path: '/admin/messages',
    },
    {
      title: 'Shipping',
      icon: Truck,
      color: 'bg-amber-100 text-amber-700',
      path: '/admin/shipping',
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-700',
      path: '/admin/analytics',
    },
    {
      title: 'Settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-700',
      path: '/admin/settings',
    },
  ];

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Quick Actions</h2>

          <p className='text-sm text-gray-500 mt-1'>
            Frequently used shortcuts
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className='group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 hover:border-[#2F4832] hover:shadow-md transition-all duration-300'>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <Icon
                  size={18}
                  className='group-hover:scale-110 transition-transform'
                />
              </div>

              <div className='text-left'>
                <h3 className='text-sm font-semibold text-gray-800'>
                  {action.title}
                </h3>

                <p className='text-[11px] text-gray-500'>Open</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
