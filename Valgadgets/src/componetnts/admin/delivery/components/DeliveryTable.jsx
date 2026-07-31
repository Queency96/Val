import { Eye, Search, Printer, UserPlus, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function DeliveryTable({
  // deliveries = [],
  // onView,
  // onAssign,
  // onPrint,
  // onCancel,
  deliveries = [],
  onView,
  onAssign,
  onTrack,
  onPrint,
  onCancel,
  onStatusChange,
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      // const customer = delivery.customer?.toLowerCase() || '';
      const customer =
        typeof delivery.customer === 'string'
          ? delivery.customer.toLowerCase()
          : delivery.customer?.name?.toLowerCase() || '';

      const rider = delivery.rider?.toLowerCase() || '';

      const matchesSearch =
        customer.includes(search.toLowerCase()) ||
        rider.includes(search.toLowerCase()) ||
        String(delivery.id).includes(search);

      const matchesStatus =
        status === 'all' || delivery.status.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [deliveries, search, status]);

  const badgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'assigned':
        return 'bg-blue-100 text-blue-700';

      case 'picked up':
        return 'bg-indigo-100 text-indigo-700';

      case 'in transit':
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
    <div className='bg-white rounded-3xl border shadow-sm'>
      {/* Header */}

      <div className='p-6 border-b flex flex-col lg:flex-row justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Deliveries</h2>

          <p className='text-gray-500'>Manage all delivery requests</p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-gray-400' />

            <input
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border rounded-xl pl-10 pr-4 py-2'
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border rounded-xl px-4'>
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='assigned'>Assigned</option>
            <option value='picked up'>Picked Up</option>
            <option value='in transit'>In Transit</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='p-4'>ID</th>

              <th className='p-4'>Customer</th>

              <th className='p-4'>Pickup</th>

              <th className='p-4'>Destination</th>

              <th className='p-4'>Rider</th>

              <th className='p-4'>Fee</th>

              <th className='p-4'>Status</th>

              <th className='p-4'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDeliveries.length === 0 ? (
              <tr>
                <td colSpan={8} className='text-center py-20 text-gray-500'>
                  No deliveries found.
                </td>
              </tr>
            ) : (
              filteredDeliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className='border-t hover:bg-gray-50 transition'>
                  <td className='p-4 font-semibold'>#{delivery.id}</td>

                  <td className='p-4'>
                    <div>
                      <p className='font-semibold'>
                        {delivery.customer?.name || delivery.customer}
                      </p>

                      <p className='text-xs text-gray-500'>
                        {delivery.customer?.phone}
                      </p>
                    </div>
                  </td>

                  <td className='p-4'>{delivery.pickup}</td>

                  <td className='p-4'>{delivery.destination}</td>

                  <td className='p-4'>{delivery.rider || 'Unassigned'}</td>

                  <td className='p-4 font-semibold text-[#2F4832]'>
                    ₦{Number(delivery.fee ?? 0).toLocaleString()}
                  </td>

                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(
                        delivery.status,
                      )}`}>
                      {delivery.status}
                    </span>
                  </td>

                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => onView?.(delivery)}
                        className='w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onAssign?.(delivery)}
                        className='w-9 h-9 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center'>
                        <UserPlus size={18} />
                      </button>

                      <button
                        onClick={() => onPrint?.(delivery)}
                        className='w-9 h-9 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center'>
                        <Printer size={18} />
                      </button>

                      <button
                        onClick={() => onCancel?.(delivery)}
                        className='w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center'>
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className='border-t p-5 flex justify-between text-sm text-gray-500'>
        <span>
          Showing
          <strong> {filteredDeliveries.length} </strong>
          of
          <strong> {deliveries.length} </strong>
          deliveries
        </span>

        <span>
          Delivery Revenue:{' '}
          <strong className='text-[#2F4832]'>
            ₦
            {deliveries.reduce(
              (sum, delivery) =>
                sum +
                Number(
                  delivery.fee ?? delivery.deliveryFee ?? delivery.total ?? 0,
                ),
              0,
            )}
          </strong>
        </span>
      </div>
    </div>
  );
}
