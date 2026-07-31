import { Search, Download, Plus, Filter } from 'lucide-react';

export default function OrderFilters({ search, setSearch, status, setStatus }) {
  return (
    <div className='bg-white rounded-2xl shadow-sm border p-5'>
      {/* Desktop */}
      <div className='hidden lg:flex items-center justify-between gap-4'>
        {/* Search */}
        <div className='relative w-full max-w-md'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            type='text'
            placeholder='Search order ID or customer...'
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
              outline-none
            '
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='
            px-4
            py-3
            rounded-xl
            border
            outline-none
            focus:ring-2
            focus:ring-[#2F4832]
          '>
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        {/* Buttons */}

        <button
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
          className='
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-[#2F4832]
            text-white
            hover:bg-[#243925]
            transition
          '>
          <Plus size={18} />
          Create Order
        </button>
      </div>

      {/* Mobile */}

      <div className='lg:hidden space-y-4'>
        <div className='relative'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              outline-none
              focus:ring-2
              focus:ring-[#2F4832]
            '
          />
        </div>

        <div className='flex gap-3'>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='
              flex-1
              rounded-xl
              border
              px-4
              py-3
            '>
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <button
            className='
              w-14
              rounded-xl
              border
              flex
              items-center
              justify-center
            '>
            <Filter size={20} />
          </button>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <button
            className='
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              py-3
            '>
            <Download size={18} />
            Export
          </button>

          <button
            className='
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#2F4832]
              text-white
              py-3
            '>
            <Plus size={18} />
            New Order
          </button>
        </div>
      </div>
    </div>
  );
}
