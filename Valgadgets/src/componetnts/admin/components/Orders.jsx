import { useMemo, useState } from 'react';

import OrderStats from './OrderStats';
import OrderFilters from './OrderFilters';
import OrdersTable from './OrdersTable';
import ViewOrderModal from './ViewOrderModal';
import EditOrderModal from './EditOrderModal';
import AssignRiderModal from './AssignRiderModal';
import InvoiceModal from './InvoiceModal';

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: {
        name: 'John Doe',
        phone: '08012345678',
        email: 'john@gmail.com',
        address: 'Lekki, Lagos',
      },
      total: 245000,
      subtotal: 230000,
      deliveryFee: 15000,
      method: 'Card',
      status: 'processing',
      createdAt: '2026-07-20',
      items: [
        {
          name: 'iPhone 16 Pro',
          quantity: 1,
          price: 185000,
          image: 'https://picsum.photos/100?1',
        },
        {
          name: 'Apple Watch Ultra',
          quantity: 1,
          price: 60000,
          image: 'https://picsum.photos/100?2',
        },
      ],
    },
  ]);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchStatus =
        status === 'All' || order.status.toLowerCase() === status.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditOpen(true);
  };

  const handleAssign = (order) => {
    setSelectedOrder(order);
    setAssignOpen(true);
  };

  const handleInvoice = (order) => {
    setSelectedOrder(order);
    setInvoiceOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const handlePrint = (order) => {
    window.print();
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  return (
    <div className='space-y-6 p-6'>
      <OrderStats orders={orders} />

      <OrderFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <OrdersTable
        orders={filteredOrders}
        onView={handleView}
        onEdit={handleEdit}
        onAssign={handleAssign}
        onInvoice={handleInvoice}
        onDelete={handleDelete}
        onPrint={handlePrint}
        onStatusChange={handleStatusChange}
      />

      <ViewOrderModal
        open={viewOpen}
        order={selectedOrder}
        onClose={() => setViewOpen(false)}
      />

      <EditOrderModal
        open={editOpen}
        order={selectedOrder}
        onClose={() => setEditOpen(false)}
        onSave={(updatedOrder) => {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order,
            ),
          );

          setEditOpen(false);
        }}
      />

      <AssignRiderModal
        open={assignOpen}
        order={selectedOrder}
        onClose={() => setAssignOpen(false)}
        onAssign={(updatedOrder) => {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order,
            ),
          );

          setAssignOpen(false);
        }}
      />

      <InvoiceModal
        open={invoiceOpen}
        order={selectedOrder}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
}
