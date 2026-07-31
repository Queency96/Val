import { useMemo, useState } from 'react';
import CustomerStats from './components/CustomerStats';
import CustomerFilters from './components/CustomerFilters';
import CustomersTable from './components/CustomersTable';
import ViewCustomerModal from './components/ViewCustomerModal';
import EditCustomerModal from './components/EditCustomerModal';
import CustomerOrdersModal from './components/CustomerOrdersModal';
import CustomerActivityModal from './components/CustomerActivityModal';

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1001,
      avatar: 'https://i.pravatar.cc/150?img=1',
      name: 'John Doe',
      phone: '08012345678',
      email: 'john@gmail.com',
      address: 'Lekki, Lagos',

      status: 'Active',
      vip: true,

      joined: '2026-06-10',
      lastLogin: '2026-07-31',

      wallet: 150000,
      rewardPoints: 420,

      totalOrders: 18,
      completedOrders: 17,
      cancelledOrders: 1,

      totalSpent: 2450000,

      recentOrders: [
        {
          id: '#1024',
          amount: 245000,
          status: 'Delivered',
        },
        {
          id: '#1042',
          amount: 185000,
          status: 'Processing',
        },
      ],

      activities: [
        {
          id: 1,
          title: 'Logged in',
          date: 'Today',
        },
        {
          id: 2,
          title: 'Placed Order #1042',
          date: 'Yesterday',
        },
      ],
    },

    {
      id: 1002,
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: 'Mary Johnson',
      phone: '08123456789',
      email: 'mary@gmail.com',
      address: 'Abuja',

      status: 'Active',
      vip: false,

      joined: '2026-05-18',
      lastLogin: '2026-07-30',

      wallet: 60000,
      rewardPoints: 140,

      totalOrders: 8,
      completedOrders: 8,
      cancelledOrders: 0,

      totalSpent: 860000,

      recentOrders: [
        {
          id: '#1005',
          amount: 860000,
          status: 'Delivered',
        },
      ],

      activities: [
        {
          id: 1,
          title: 'Updated Address',
          date: '2 days ago',
        },
      ],
    },

    {
      id: 1003,
      avatar: 'https://i.pravatar.cc/150?img=3',
      name: 'David James',
      phone: '09012345678',
      email: 'david@gmail.com',
      address: 'Port Harcourt',

      status: 'Suspended',
      vip: false,

      joined: '2026-07-01',
      lastLogin: '2026-07-20',

      wallet: 0,
      rewardPoints: 0,

      totalOrders: 2,
      completedOrders: 1,
      cancelledOrders: 1,

      totalSpent: 125000,

      recentOrders: [],

      activities: [
        {
          id: 1,
          title: 'Account Suspended',
          date: 'Today',
        },
      ],
    },
  ]);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search) ||
        String(customer.id).includes(search);

      const matchesStatus = status === 'All' || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className='space-y-6 p-6'>
      <CustomerStats customers={customers} />

      <CustomerFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <CustomersTable
        customers={filteredCustomers}
        onView={(customer) => {
          setSelectedCustomer(customer);
          setViewOpen(true);
        }}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setEditOpen(true);
        }}
        onOrders={(customer) => {
          setSelectedCustomer(customer);
          setOrdersOpen(true);
        }}
        onActivity={(customer) => {
          setSelectedCustomer(customer);
          setActivityOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ViewCustomerModal
        open={viewOpen}
        customer={selectedCustomer}
        onClose={() => setViewOpen(false)}
      />

      <EditCustomerModal
        open={editOpen}
        customer={selectedCustomer}
        onClose={() => setEditOpen(false)}
      />

      <CustomerOrdersModal
        open={ordersOpen}
        customer={selectedCustomer}
        onClose={() => setOrdersOpen(false)}
      />

      <CustomerActivityModal
        open={activityOpen}
        customer={selectedCustomer}
        onClose={() => setActivityOpen(false)}
      />
    </div>
  );
}
