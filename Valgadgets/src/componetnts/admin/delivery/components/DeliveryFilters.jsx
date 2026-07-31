import { Search, Filter } from 'lucide-react';

export default function DeliveryFilters({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className='bg-white rounded-2xl border shadow-sm p-5'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        {/* Search */}

        <div className='relative w-full lg:w-96'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            type='text'
            placeholder='Search by customer, tracking ID or order...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              focus:ring-2
              focus:ring-[#2F4832]
              focus:border-[#2F4832]
              outline-none
            '
          />
        </div>

        {/* Status Filter */}

        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2 text-gray-500'>
            <Filter size={18} />

            <span className='text-sm font-medium'>Status</span>
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='
              px-4
              py-3
              rounded-xl
              border
              bg-white
              focus:ring-2
              focus:ring-[#2F4832]
              focus:border-[#2F4832]
              outline-none
            '>
            <option value='All'>All Deliveries</option>
            <option value='Pending'>Pending</option>
            <option value='Assigned'>Assigned</option>
            <option value='Picked Up'>Picked Up</option>
            <option value='In Transit'>In Transit</option>
            <option value='Delivered'>Delivered</option>
            <option value='Cancelled'>Cancelled</option>
            <option value='Failed'>Failed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
