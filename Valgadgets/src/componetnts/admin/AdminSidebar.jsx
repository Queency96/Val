import { useState, useMemo } from 'react';
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
  Menu,
  X,
} from 'lucide-react';

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

export default function AdminSidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-NG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      {/* ================= MOBILE TOP BAR ================= */}

      <div className='fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-30 flex items-center justify-between px-4 md:hidden'>
        <button
          onClick={() => setMobileOpen(true)}
          className='w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center'>
          <Menu size={24} />
        </button>

        <h2 className='font-bold text-lg'>Admin Dashboard</h2>

        <div className='w-10' />
      </div>

      {/* ================= OVERLAY ================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-full
          w-72
          bg-[#1E2A20]
          text-white
          flex
          flex-col
          transition-transform
          duration-300
          ease-in-out

          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}

          md:translate-x-0
          md:static
          md:flex
          md:w-72
          md:flex-shrink-0
        `}>
        {/* ================= HEADER ================= */}

        <div className='h-16 border-b border-white/10 flex items-center justify-between px-5'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-2xl bg-[#2F4832] flex items-center justify-center text-white'>
              <ShoppingBag size={24} />
            </div>

            <div>
              <h1 className='text-md font-bold'>Admin Dashboard</h1>

              <p className='text-sm text-gray-500'>{today}</p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className='md:hidden w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center'>
            <X size={20} />
          </button>
        </div>
        {/* ================= MENU ================= */}

        <div className='flex-1 overflow-y-auto py-5'>
          <nav className='space-y-2 px-3'>
            {menus.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-4
                      px-4
                      py-3
                      rounded-xl
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? 'bg-[#2F4832] text-white shadow-lg'
                          : 'text-gray-300 hover:bg-[#2F4832]/70 hover:text-white'
                      }
                    `
                  }>
                  <Icon size={20} className='flex-shrink-0' />

                  <span className='font-medium'>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ================= STORE STATUS ================= */}

        <div className='mx-4 mb-4 rounded-2xl bg-[#2F4832] p-4'>
          <h3 className='text-sm font-bold tracking-wide'>STORE STATUS</h3>

          <div className='flex justify-between items-center mt-3'>
            <span className='text-sm'>Online</span>

            <span className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
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
        {/* ================= ADMIN ================= */}

        <div className='border-t border-white/10 p-5'>
          <div className='flex items-center'>
            <img
              src='https://ui-avatars.com/api/?name=Admin&background=FFB800&color=000'
              alt='Admin'
              className='w-12 h-12 rounded-full'
            />

            <div className='flex justify-between gap-4 items-center'>
              <div className='ml-3 flex-1'>
                <h3 className='font-semibold'>Administrator</h3>
                <p className='text-xs text-gray-300'>admin@shop.com</p>
              </div>
              <div className=''>
                <div className='relative group inline-block'>
                  <button className='w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 p-4'>
                    <LogOut size={18} />
                  </button>
                  <div className='absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg'>
                    Logout
                    <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main
        className='
          flex-1
          overflow-y-auto
          bg-gray-100
          pt-16
          md:pt-0
        '>
        {children}
      </main>
    </div>
  );
}
