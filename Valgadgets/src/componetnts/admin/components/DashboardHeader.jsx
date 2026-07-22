// import { Bell, Search, Moon, Sun, User, Menu, PanelLeft } from 'lucide-react';

// export default function DashboardHeader({
//   collapsed,
//   toggleCollapsed,
//   onMenuClick,

//   notifications = [],
//   search = '',
//   setSearch = () => {},

//   darkMode = false,
//   toggleDarkMode = () => {},

//   onOpenNotifications = () => {},
// }) {
//   return (
//     <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6'>
//       {/* LEFT */}
//       <div className='flex items-center gap-3'>
//         {/* Mobile menu */}
//         <button
//           onClick={onMenuClick}
//           className='flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100 lg:hidden'>
//           <Menu size={20} />
//         </button>

//         {/* Desktop collapse */}
//         <button
//           onClick={toggleCollapsed}
//           className='hidden h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100 lg:flex'>
//           <PanelLeft
//             size={20}
//             className={`transition-transform duration-300 ${
//               collapsed ? 'rotate-180' : ''
//             }`}
//           />
//         </button>

//         {/* Search */}
//         <div className='relative hidden lg:block'>
//           <Search
//             size={18}
//             className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
//           />

//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder='Search orders, customers...'
//             className='w-96 rounded-xl border bg-gray-50 py-2.5 pl-10 pr-4 outline-none transition focus:border-[#2F4832] focus:ring-2 focus:ring-[#2F4832]/20'
//           />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className='flex items-center gap-3'>
//         {/* Dark mode */}
//         <button
//           onClick={toggleDarkMode}
//           className='flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-100'>
//           {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//         </button>

//         {/* Notifications */}
//         <button
//           onClick={onOpenNotifications}
//           className='relative flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-100'>
//           <Bell size={19} />

//           {notifications.length > 0 && (
//             <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white'>
//               {notifications.length}
//             </span>
//           )}
//         </button>

//         {/* User */}
//         <div className='flex items-center gap-3 rounded-xl border bg-white px-3 py-2'>
//           <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#2F4832] text-white'>
//             <User size={18} />
//           </div>

//           <div className='hidden md:block'>
//             <p className='text-sm font-semibold'>Administrator</p>

//             <p className='text-xs text-green-600'>● Online</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Bell, Search, Moon, Sun, User, Menu, PanelLeft } from 'lucide-react';

export default function DashboardHeader({
  collapsed,
  toggleCollapsed,
  onMenuClick,

  notifications = [],
  search = '',
  setSearch = () => {},

  darkMode = false,
  toggleDarkMode = () => {},

  onOpenNotifications = () => {},
}) {
  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6'>
      {/* LEFT */}
      <div className='flex items-center gap-3'>
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className='flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100 lg:hidden'>
          <Menu size={20} />
        </button>

        {/* Desktop collapse */}
        <button
          onClick={toggleCollapsed}
          className='hidden h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100 lg:flex'>
          <PanelLeft
            size={20}
            className={`transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Search */}
        <div className='relative hidden lg:block'>
          <Search
            size={18}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search orders, customers...'
            className='w-96 rounded-xl border bg-gray-50 py-2.5 pl-10 pr-4 outline-none transition focus:border-[#2F4832] focus:ring-2 focus:ring-[#2F4832]/20'
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className='flex items-center gap-3'>
        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className='flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-100'>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className='relative flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-100'>
          <Bell size={19} />

          {notifications.length > 0 && (
            <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white'>
              {notifications.length}
            </span>
          )}
        </button>

        {/* User */}
        <div className='flex items-center gap-3 rounded-xl border bg-white px-3 py-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#2F4832] text-white'>
            <User size={18} />
          </div>

          <div className='hidden md:block'>
            <p className='text-sm font-semibold'>Administrator</p>

            <p className='text-xs text-green-600'>● Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}