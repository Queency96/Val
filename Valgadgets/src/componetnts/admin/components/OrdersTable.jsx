import {
  Eye,
  Trash2,
  Printer,
  Search,
  UserCheck,
  FileText,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function OrdersTable({
  orders = [],
  onView,
  onEdit,
  onAssign,
  onInvoice,
  onDelete,
  onPrint,
  onStatusChange,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer =
        typeof order.customer === 'string'
          ? order.customer
          : order.customer?.name || '';

      const matchesSearch =
        customer.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchesStatus =
        statusFilter === 'all' || order.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const statusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'paid':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-indigo-100 text-indigo-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow border'>
      <div className='p-6 border-b flex flex-col lg:flex-row lg:justify-between gap-4'>
        <div>
          <h2 className='text-xl font-bold'>Orders</h2>
          <p className='text-gray-500 text-sm'>Manage customer orders</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-gray-400' />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search...'
              className='border rounded-lg pl-10 pr-4 py-2'
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='border rounded-lg px-4'>
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='paid'>Paid</option>
            <option value='processing'>Processing</option>
            <option value='shipped'>Shipped</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='p-4'>Order</th>
              <th className='p-4'>Customer</th>
              <th className='p-4'>Date</th>
              <th className='p-4'>Items</th>
              <th className='p-4'>Total</th>
              <th className='p-4'>Payment</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className='text-center py-16 text-gray-500'>
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const customer =
                  typeof order.customer === 'string'
                    ? order.customer
                    : order.customer?.name || 'Unknown';
                const phone =
                  typeof order.customer === 'object'
                    ? order.customer?.phone
                    : order.phone;
                return (
                  <tr key={order.id} className='border-t hover:bg-gray-50'>
                    <td className='p-4 font-semibold'>#{order.id}</td>
                    <td className='p-4'>
                      <p className='font-medium'>{customer}</p>
                      <p className='text-xs text-gray-500'>{phone}</p>
                    </td>
                    <td className='p-4'>
                      {new Date(
                        order.created || order.createdAt,
                      ).toLocaleDateString()}
                    </td>
                    <td className='p-4'>{order.items?.length || 0}</td>
                    <td className='p-4 font-semibold text-[#2F4832]'>
                      ₦{(order.total || 0).toLocaleString()}
                    </td>
                    <td className='p-4'>
                      {order.payment || order.method || '--'}
                    </td>
                    <td className='p-4'>
                      <select
                        value={order.status.toLowerCase()}
                        onChange={(e) =>
                          onStatusChange?.(order.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                        {[
                          'pending',
                          'paid',
                          'processing',
                          'shipped',
                          'delivered',
                          'cancelled',
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-4'>
                      <div className='flex flex-wrap gap-2'>
                        <button onClick={() => onView?.(order)}>
                          <Eye size={18} />
                        </button>
                        <button onClick={() => onEdit?.(order)}>
                          <FileText size={18} />
                        </button>
                        <button onClick={() => onAssign?.(order)}>
                          <UserCheck size={18} />
                        </button>
                        <button onClick={() => onInvoice?.(order)}>
                          <Printer size={18} />
                        </button>
                        <button onClick={() => onPrint?.(order)}>
                          <Printer size={18} />
                        </button>
                        <button onClick={() => onDelete?.(order.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
