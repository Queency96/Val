import { useMemo } from 'react';
import { Bell, Search, Moon, Sun, ShoppingBag, User } from 'lucide-react';

export default function DashboardHeader({
  notifications = [],
  search,
  setSearch,
  onOpenNotifications,
  darkMode = false,
  toggleDarkMode,
}) {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-NG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return (
    <header className='hidden  md:flex md:justify-end lg:items-between lg:gap-4 lg:sticky top-0 z-50 border-b shadow-sm'>
      <div className='max-w-7xl mx-3 px-6 h-20 flex items-center justify-between'>
        {/* SEARCH */}
        <div className='hidden lg:flex justify-start items-center w-[420px] relative me-8'>
          <Search size={18} className='absolute left-4 text-gray-400' />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search customer, phone or order...'
            className='w-full rounded-xl border pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#2F4832]'
          />
        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-4'>
          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className='w-11 h-11 rounded-xl border flex items-center justify-center hover:bg-gray-100 transition'>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* NOTIFICATIONS */}
          <button
            onClick={onOpenNotifications}
            className='relative w-11 h-11 rounded-xl border flex items-center justify-center hover:bg-gray-100 transition'>
            <Bell size={19} />

            {notifications.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center'>
                {notifications.length}
              </span>
            )}
          </button>

          {/* ADMIN INFO */}
          <div className='flex items-center gap-3 border rounded-xl px-3 py-2'>
            <div className='w-10 h-10 rounded-full bg-[#2F4832] text-white flex items-center justify-center'>
              <User size={18} />
            </div>

            <div className='hidden md:block'>
              <p className='font-semibold'>Administrator</p>

              <p className='text-xs text-green-600'>● Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className='md:hidden px-6 pb-4'>
        <div className='relative'>
          <Search size={18} className='absolute left-4 top-3.5 text-gray-400' />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
            className='w-full rounded-xl border pl-11 pr-4 py-3 outline-none'
          />
        </div>
      </div>
    </header>
  );
}
