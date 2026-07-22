import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Truck,
  MessageCircle,
  Bell,
  Settings,
  Tag,
  LogOut,
  X,
} from 'lucide-react';

import Logo from '../../../assets/ValGadgets_Logo.png';

const menus = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { name: 'Products', icon: Package, path: '/admin/products' },
  { name: 'Customers', icon: Users, path: '/admin/customers' },
  { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { name: 'Delivery', icon: Truck, path: '/admin/delivery' },
  { name: 'Messages', icon: MessageCircle, path: '/admin/messages' },
  { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { name: 'Coupons', icon: Tag, path: '/admin/coupons' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar({ open, collapsed, onClose }) {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-NG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          lg:static
          z-50
          flex
          flex-col
          bg-[#1E2A20]
          text-white
          shadow-2xl
          transition-all
          duration-300
          ease-in-out

          ${open ? 'translate-x-0' : '-translate-x-full'}

          lg:row-span-2
          lg:translate-x-0
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        `}>
        {/* Header */}
        <div
          className={`flex h-16 items-center border-b border-white/10 px-4 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}>
          <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-white'>
              <img src={Logo} alt='Logo' className='w-8' />
            </div>

            {!collapsed && (
              <div>
                <h1 className='text-sm font-bold'>Admin Dashboard</h1>

                <p className='text-xs text-gray-400'>{today}</p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className='rounded-lg p-2 hover:bg-white/10 lg:hidden'>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 overflow-y-auto py-5'>
          <div className='space-y-2 px-3'>
            {menus.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={({ isActive }) =>
                    `
                      group
                      relative
                      flex
                      items-center
                      rounded-xl
                      px-4
                      py-3
                      transition-all
                      duration-200

                      ${collapsed ? 'justify-center' : 'gap-4'}

                      ${
                        isActive
                          ? 'bg-[#2F4832] text-white shadow-lg'
                          : 'text-gray-300 hover:bg-[#2F4832]/70 hover:text-white'
                      }
                    `
                  }>
                  <Icon size={20} className='flex-shrink-0' />

                  {!collapsed && (
                    <span className='font-medium'>{item.name}</span>
                  )}

                  {/* Tooltip */}
                  {collapsed && (
                    <span
                      className='
                        pointer-events-none
                        absolute
                        left-full
                        ml-3
                        whitespace-nowrap
                        rounded-md
                        bg-gray-900
                        px-2
                        py-1
                        text-xs
                        opacity-0
                        shadow-lg
                        transition-all
                        duration-200
                        group-hover:opacity-100
                      '>
                      {item.name}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Store Status */}
        {!collapsed && (
          <div className='mx-4 mb-4 rounded-2xl bg-[#2F4832] p-4'>
            <h3 className='text-sm font-bold'>STORE STATUS</h3>

            <div className='mt-3 flex items-center justify-between'>
              <span className='text-sm'>Online</span>

              <span className='h-3 w-3 animate-pulse rounded-full bg-green-500' />
            </div>

            <div className='mt-4 space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Today's Sales</span>

                <span className='font-bold'>₦245,000</span>
              </div>

              <div className='flex justify-between'>
                <span>Visitors</span>

                <span className='font-bold'>1,248</span>
              </div>
            </div>
          </div>
        )}

        {/* Admin */}
        <div className='border-t border-white/10 p-4'>
          {collapsed ? (
            <div className='flex justify-center'>
              <img
                src='https://ui-avatars.com/api/?name=Admin&background=FFB800&color=000'
                alt='Admin'
                className='h-11 w-11 rounded-full'
              />
            </div>
          ) : (
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img
                  src='https://ui-avatars.com/api/?name=Admin&background=FFB800&color=000'
                  alt='Admin'
                  className='h-11 w-11 rounded-full'
                />

                <div className='ml-3'>
                  <h3 className='font-semibold'>Administrator</h3>

                  <p className='text-xs text-gray-300'>admin@shop.com</p>
                </div>
              </div>

              <button
                className='
                  rounded-full
                  bg-red-600
                  p-2
                  transition
                  hover:bg-red-700
                '>
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
