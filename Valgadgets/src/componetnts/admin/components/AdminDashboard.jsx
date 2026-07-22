import { useEffect, useMemo, useState } from 'react';
// import { MessageCircle, X } from 'lucide-react';
// import DashboardHeader from './DashboardHeader';
// import AdminSidebar from './AdminSidebar';
import AnalyticsCards from './AnalyticsCards';
import RevenueChart from './RevenueChart';
import SalesChart from './SalesChart';
import OrdersTable from './OrdersTable';
import OrderDrawer from './OrderDrawer';
import NotificationPanel from './NotificationPanel';
import RecentActivity from './RecentActivity';
// import AdminChat from './AdminChat';
import QuickActions from './QuickActions';
import TopProducts from './TopProducts';
import CustomerAnalytics from './CustomerAnalytics';

export default function AdminDashboard() {
  /* ===========================================
      STATE
  ============================================ */

  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // const [chatOpen, setChatOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('all');

  const [dateFilter, setDateFilter] = useState('all');

  const [openNotifications, setOpenNotifications] = useState(false);

  /* ===========================================
      LOAD DATA
  ============================================ */

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const storedNotifications =
      JSON.parse(localStorage.getItem('adminNotifications')) || [];

    const storedChats = JSON.parse(localStorage.getItem('customerChats')) || [];

    setOrders(storedOrders);
    setNotifications(storedNotifications);
    setMessages(storedChats);

    setLoading(false);
  }, []);

  /* ===========================================
      SAVE TO STORAGE
  ============================================ */

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('customerChats', JSON.stringify(messages));
  }, [messages]);

  /* ===========================================
      ANALYTICS
  ============================================ */

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.total || 0), 0);
  }, [orders]);

  const totalOrders = orders.length;

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const customers = useMemo(() => {
    return [
      ...new Map(
        orders.map((order) => [
          order.customer?.phone || order.customer?.email || order.id,
          order.customer,
        ]),
      ).values(),
    ];
  }, [orders]);

  const totalCustomers = customers.length;

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const processingOrders = orders.filter(
    (o) => o.status === 'processing',
  ).length;

  const paidOrders = orders.filter((o) => o.status === 'paid').length;

  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;

  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;

  /* ===========================================
      TOP SELLING PRODUCTS
  ============================================ */

  const bestSelling = useMemo(() => {
    const map = {};

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!map[item.name]) {
          map[item.name] = {
            name: item.name,
            image: item.image,
            quantity: 0,
            revenue: 0,
          };
        }

        map[item.name].quantity += item.quantity;

        map[item.name].revenue += item.price * item.quantity;
      });
    });

    return Object.values(map)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [orders]);

  /* ===========================================
      FILTER ORDERS
  ============================================ */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = order.customer?.name?.toLowerCase() || '';

      const phone = order.customer?.phone || '';

      const searchText = search.toLowerCase();

      const matchesSearch =
        customerName.includes(searchText) || phone.includes(searchText);

      const matchesStatus =
        statusFilter === 'all' ? true : order.status === statusFilter;

      let matchesDate = true;

      if (dateFilter !== 'all' && order.createdAt) {
        const orderDate = new Date(order.createdAt);

        const today = new Date();

        if (dateFilter === 'today') {
          matchesDate = orderDate.toDateString() === today.toDateString();
        }

        if (dateFilter === 'week') {
          matchesDate = today - orderDate < 7 * 24 * 60 * 60 * 1000;
        }

        if (dateFilter === 'month') {
          matchesDate =
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear();
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, dateFilter]);

  /* ===========================================
      ACTIONS
  ============================================ */

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );
  };

  const deleteOrder = (id) => {
    if (!window.confirm('Delete this order?')) return;

    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    );
  };

  /* ===========================================
      LOADING
  ============================================ */

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-lg font-semibold'>
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      {/* ===========================================
          ANALYTICS CARDS
      ============================================ */}
      <AnalyticsCards
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
        pendingOrders={pendingOrders}
        paidOrders={paidOrders}
        deliveredOrders={deliveredOrders}
        cancelledOrders={cancelledOrders}
      />

      {/* ===========================================
          CHARTS
      ============================================ */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* LEFT */}
        <div className='xl:col-span-2 space-y-6'>
          <RevenueChart revenue={totalRevenue} orders={orders} />

          <SalesChart orders={orders} />
        </div>

        {/* RIGHT */}
        <div className='space-y-6'>
          <NotificationPanel
            open={openNotifications}
            notifications={notifications}
            onClose={() => setOpenNotifications(false)}
            onClearAll={clearNotifications}
            onRemove={removeNotification}
            onMarkAsRead={markAsRead}
          />

          <QuickActions
            totalOrders={totalOrders}
            pending={pendingOrders}
            delivered={deliveredOrders}
          />
        </div>
      </div>

      {/* ===========================================
          SECOND ROW
      ============================================ */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* CUSTOMER ANALYTICS */}

        <div className='xl:col-span-2'>
          <CustomerAnalytics orders={orders} />
        </div>

        {/* TOP PRODUCTS */}

        <TopProducts products={bestSelling} />
      </div>

      {/* ===========================================
          RECENT ACTIVITY
      ============================================ */}
      <RecentActivity
        orders={orders}
        messages={messages}
        lowStockProducts={[]}
      />

      {/* ===========================================
          ORDERS SECTION HEADER
       ============================================ */}

      <div className='bg-white rounded-3xl shadow-sm'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b'>
          <div>
            <h2 className='text-2xl font-bold'>Orders Management</h2>

            <p className='text-gray-500 mt-1'>
              Manage all customer orders from one place.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='border rounded-xl px-4 py-2'>
              <option value='all'>All Orders</option>

              <option value='pending'>Pending</option>

              <option value='processing'>Processing</option>

              <option value='paid'>Paid</option>

              <option value='shipped'>Shipped</option>

              <option value='delivered'>Delivered</option>

              <option value='cancelled'>Cancelled</option>
            </select>

            {/* DATE */}

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className='border rounded-xl px-4 py-2'>
              <option value='all'>All Dates</option>

              <option value='today'>Today</option>

              <option value='week'>Last 7 Days</option>

              <option value='month'>This Month</option>
            </select>
          </div>
        </div>

        {/* ===========================================
            ORDERS TABLE
         ============================================ */}

        <OrdersTable
          loading={loading}
          orders={filteredOrders}
          onView={(order) => setSelectedOrder(order)}
          onDelete={deleteOrder}
          onStatusChange={updateStatus}
        />
      </div>

      {/* ===========================================
           ORDER DRAWER
       ============================================ */}
      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}
