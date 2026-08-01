import {
  Eye,
  Pencil,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  TicketPercent,
  Truck,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function CouponsTable({
  coupons = [],
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const code = String(coupon.code || '').toLowerCase();
      const description = String(coupon.description || '').toLowerCase();
      const couponStatus = String(coupon.status || '').toLowerCase();

      const matchesSearch =
        code.includes(search.toLowerCase()) ||
        description.includes(search.toLowerCase());

      const matchesStatus = status === 'all' || couponStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [coupons, search, status]);

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';

      case 'scheduled':
        return 'bg-blue-100 text-blue-700';

      case 'expired':
        return 'bg-red-100 text-red-700';

      case 'disabled':
        return 'bg-gray-100 text-gray-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const typeIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <TicketPercent size={18} className='text-[#2F4832]' />;

      case 'fixed':
        return <CheckCircle size={18} className='text-blue-600' />;

      case 'free_shipping':
        return <Truck size={18} className='text-purple-600' />;

      default:
        return <Clock size={18} className='text-gray-500' />;
    }
  };

  return (
    <div className='bg-white rounded-3xl border shadow-sm overflow-hidden'>
      {/* Header */}

      <div className='flex flex-col lg:flex-row justify-between gap-4 p-6 border-b'>
        <div>
          <h2 className='text-2xl font-bold'>Coupons</h2>

          <p className='text-gray-500'>
            Manage promotional coupons and discounts
          </p>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <input
            placeholder='Search coupon...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='
              border
              rounded-xl
              px-4
              py-2
              w-64
              focus:outline-none
              focus:ring-2
              focus:ring-[#2F4832]
            '
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='
              border
              rounded-xl
              px-4
              py-2
            '>
            <option value='all'>All Status</option>

            <option value='active'>Active</option>

            <option value='scheduled'>Scheduled</option>

            <option value='expired'>Expired</option>

            <option value='disabled'>Disabled</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='p-4'>Code</th>
              <th className='p-4'>Type</th>
              <th className='p-4'>Discount</th>
              <th className='p-4'>Usage</th>
              <th className='p-4'>Expiry</th>
              <th className='p-4'>Status</th>
              <th className='p-4 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCoupons.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center py-20 text-gray-500'>
                  No coupons found.
                </td>
              </tr>
            ) : (
              filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className='border-t hover:bg-gray-50 transition'>
                  {/* Code */}

                  <td className='p-4'>
                    <div>
                      <h3 className='font-bold'>{coupon.code}</h3>

                      <p className='text-xs text-gray-500'>
                        {coupon.description}
                      </p>
                    </div>
                  </td>

                  {/* Type */}

                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      {typeIcon(coupon.type)}

                      <span className='capitalize'>
                        {coupon.type?.replace('_', ' ')}
                      </span>
                    </div>
                  </td>

                  {/* Discount */}

                  <td className='p-4 font-semibold text-[#2F4832]'>
                    {coupon.type === 'percentage'
                      ? `${coupon.discount}%`
                      : coupon.type === 'free_shipping'
                        ? 'Free Shipping'
                        : `₦${Number(coupon.discount || 0).toLocaleString()}`}
                  </td>

                  {/* Usage */}

                  <td className='p-4'>
                    <div>
                      <span className='font-semibold'>{coupon.used ?? 0}</span>

                      <span className='text-gray-500'>
                        {' '}
                        / {coupon.limit ?? 'Unlimited'}
                      </span>
                    </div>
                  </td>

                  {/* Expiry */}

                  <td className='p-4'>
                    {coupon.expiry || coupon.expiresAt || '--'}
                  </td>

                  {/* Status */}

                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                        coupon.status,
                      )}`}>
                      {coupon.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className='p-4'>
                    <div className='flex justify-center gap-2'>
                      <button
                        onClick={() => onView?.(coupon)}
                        className='w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit?.(coupon)}
                        className='w-9 h-9 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center'>
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDuplicate?.(coupon)}
                        className='w-9 h-9 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center'>
                        <Copy size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(coupon)}
                        className='w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center'>
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

      {/* Footer */}

      <div className='border-t p-5 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-500'>
        <span>
          Showing <strong>{filteredCoupons.length}</strong> of{' '}
          <strong>{coupons.length}</strong> coupons
        </span>

        <span>
          Active Coupons:{' '}
          <strong className='text-green-600'>
            {
              coupons.filter(
                (coupon) => coupon.status?.toLowerCase() === 'active',
              ).length
            }
          </strong>
        </span>
      </div>
    </div>
  );
}
