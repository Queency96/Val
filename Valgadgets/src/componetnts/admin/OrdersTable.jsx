import { Eye, Trash2, Printer, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function OrdersTable({
  orders = [],
  onView,
  onDelete,
  onPrint,
  onStatusChange,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer = order.customer?.name || '';

      const matchesSearch =
        customer.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const statusColor = (status) => {
    switch (status) {
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
      {/* HEADER */}

      <div className='p-6 border-b flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h2 className='text-xl font-bold'>Orders</h2>

          <p className='text-gray-500 text-sm'>Manage customer orders</p>
        </div>

        <div className='flex gap-3'>
          {/* SEARCH */}

          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-gray-400' />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search...'
              className='border rounded-lg pl-10 pr-4 py-2'
            />
          </div>

          {/* FILTER */}

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

      {/* TABLE */}

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='p-4'>Order ID</th>

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
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className='border-t hover:bg-gray-50 transition'>
                  <td className='p-4 font-semibold'>#{order.id}</td>

                  <td className='p-4'>
                    <div>
                      <p className='font-medium'>
                        {order.customer?.name || 'Unknown'}
                      </p>

                      <p className='text-xs text-gray-500'>
                        {order.customer?.phone}
                      </p>
                    </div>
                  </td>

                  <td className='p-4 text-sm'>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : '--'}
                  </td>

                  <td className='p-4'>{order.items?.length || 0}</td>

                  <td className='p-4 font-semibold text-[#2F4832]'>
                    ₦{(order.total || 0).toLocaleString()}
                  </td>

                  <td className='p-4 capitalize'>{order.method || '--'}</td>

                  <td className='p-4'>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange?.(order.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                        order.status,
                      )}`}>
                      <option value='pending'>Pending</option>

                      <option value='paid'>Paid</option>

                      <option value='processing'>Processing</option>

                      <option value='shipped'>Shipped</option>

                      <option value='delivered'>Delivered</option>

                      <option value='cancelled'>Cancelled</option>
                    </select>
                  </td>

                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => onView?.(order)}
                        className='w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onPrint?.(order)}
                        className='w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center'>
                        <Printer size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(order.id)}
                        className='w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center'>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}

      <div className='border-t p-4 flex justify-between items-center text-sm text-gray-500'>
        <span>
          Showing <strong>{filteredOrders.length}</strong> of{' '}
          <strong>{orders.length}</strong> orders
        </span>

        <span>
          Total Revenue:{' '}
          <strong className='text-[#2F4832]'>
            ₦
            {orders
              .reduce((sum, o) => sum + (o.total || 0), 0)
              .toLocaleString()}
          </strong>
        </span>
      </div>
    </div>
  );
}
