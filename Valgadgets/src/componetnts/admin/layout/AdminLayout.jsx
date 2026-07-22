import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import AdminSidebar from '../components/AdminSidebar';
import AdminChat from '../components/AdminChat';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div
        className={`
          grid
          h-screen
          overflow-hidden
          bg-gray-100
          transition-all
          duration-300

          ${
            sidebarCollapsed
              ? 'lg:grid-cols-[80px_1fr]'
              : 'lg:grid-cols-[256px_1fr]'
          }

          grid-cols-1
          grid-rows-[64px_1fr]
        `}>
        {/* Sidebar */}

        <AdminSidebar
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Header */}

        <header className='row-start-1 lg:col-start-2 border-b bg-white shadow-sm'>
          <DashboardHeader
            collapsed={sidebarCollapsed}
            toggleCollapsed={() => setSidebarCollapsed((prev) => !prev)}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </header>

        {/* Content */}

        <main className='row-start-2 lg:col-start-2 overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className='
            fixed
            bottom-6
            right-6
            z-[999]
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-[#2F4832]
            text-white
            shadow-xl
            transition
            hover:scale-110
          '>
          <MessageCircle size={28} />
        </button>
      )}

      <AdminChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}