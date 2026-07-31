import { Search, Filter, Download, UserPlus } from 'lucide-react';

export default function CustomerFilters({
  search,
  setSearch,
  status,
  setStatus,
  onExport,
  onAddCustomer,
}) {
  return (
    <div className='bg-white rounded-2xl shadow-sm border p-5'>
      <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4'>
        {/* Left */}
        <div className='flex flex-col sm:flex-row gap-4 flex-1'>
          {/* Search */}
          <div className='relative flex-1'>
            <Search
              size={18}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input
              type='text'
              placeholder='Search customer...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F4832]
              '
            />
          </div>

          {/* Status Filter */}
          <div className='relative'>
            <Filter
              size={18}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='
                appearance-none
                pl-10
                pr-10
                py-3
                rounded-xl
                border
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F4832]
              '>
              <option value='All'>All Customers</option>
              <option value='Active'>Active</option>
              <option value='VIP'>VIP</option>
              <option value='Suspended'>Suspended</option>
            </select>
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-wrap gap-3'>
          <button
            onClick={onExport}
            className='
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              hover:bg-gray-100
              transition
            '>
            <Download size={18} />
            Export
          </button>

          <button
            onClick={onAddCustomer}
            className='
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-[#2F4832]
              text-white
              hover:bg-[#223524]
              transition
            '>
            <UserPlus size={18} />
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
}
