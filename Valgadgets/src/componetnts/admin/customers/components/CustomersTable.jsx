import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Crown,
  ShieldCheck,
  UserX,
  Mail,
  Phone,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function CustomersTable({
  customers = [],
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);

      const matchesStatus =
        statusFilter === 'all' ||
        customer.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';

      case 'suspended':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow border'>
      {/* ================= HEADER ================= */}

      <div className='p-6 border-b flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h2 className='text-xl font-bold'>Customers</h2>

          <p className='text-gray-500 text-sm'>
            Manage all registered customers
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          {/* SEARCH */}

          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-gray-400' />

            <input
              placeholder='Search customer...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border rounded-xl pl-10 pr-4 py-2 w-full'
            />
          </div>

          {/* FILTER */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='border rounded-xl px-4'>
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='suspended'>Suspended</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[1100px]'>
          <thead className='bg-gray-50'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='p-4'>Customer</th>
              <th className='p-4'>Contact</th>
              <th className='p-4'>Orders</th>
              <th className='p-4'>Spent</th>
              <th className='p-4'>Joined</th>
              <th className='p-4'>VIP</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className='py-16 text-center text-gray-500'>
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className='border-t hover:bg-gray-50 transition'>
                  {/* CUSTOMER */}

                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={
                          customer.avatar ||
                          `https://ui-avatars.com/api/?name=${customer.name}`
                        }
                        alt={customer.name}
                        className='w-12 h-12 rounded-full object-cover'
                      />

                      <div>
                        <h4 className='font-semibold'>{customer.name}</h4>

                        <p className='text-sm text-gray-500'>#{customer.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}

                  <td className='p-4'>
                    <div className='space-y-1 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Mail size={14} />

                        {customer.email}
                      </div>

                      <div className='flex items-center gap-2'>
                        <Phone size={14} />

                        {customer.phone}
                      </div>
                    </div>
                  </td>

                  {/* ORDERS */}

                  <td className='p-4 font-semibold'>{customer.totalOrders}</td>

                  {/* SPENT */}

                  <td className='p-4 font-bold text-[#2F4832]'>
                    ₦{(customer.totalSpent || 0).toLocaleString()}
                  </td>

                  {/* JOINED */}

                  <td className='p-4 text-sm'>{customer.joined}</td>

                  {/* VIP */}

                  <td className='p-4'>
                    {customer.vip ? (
                      <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold'>
                        <Crown size={14} />
                        VIP
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>

                  {/* STATUS */}

                  <td className='p-4'>
                    <select
                      value={customer.status}
                      onChange={(e) =>
                        onStatusChange?.(customer.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                        customer.status,
                      )}`}>
                      <option value='Active'>Active</option>

                      <option value='Suspended'>Suspended</option>
                    </select>
                  </td>

                  {/* ACTIONS */}

                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => onView?.(customer)}
                        className='w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center'>
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit?.(customer)}
                        className='w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center'>
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onStatusChange?.(
                            customer.id,
                            customer.status === 'Active'
                              ? 'Suspended'
                              : 'Active',
                          )
                        }
                        className='w-9 h-9 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center'>
                        {customer.status === 'Active' ? (
                          <UserX size={18} />
                        ) : (
                          <ShieldCheck size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => onDelete?.(customer.id)}
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

      {/* ================= FOOTER ================= */}

      <div className='border-t p-4 flex justify-between items-center text-sm text-gray-500'>
        <span>
          Showing <strong>{filteredCustomers.length}</strong> of{' '}
          <strong>{customers.length}</strong> customers
        </span>

        <span>
          Total Revenue:{' '}
          <strong className='text-[#2F4832]'>
            ₦
            {customers
              .reduce((sum, customer) => sum + (customer.totalSpent || 0), 0)
              .toLocaleString()}
          </strong>
        </span>
      </div>
    </div>
  );
}
