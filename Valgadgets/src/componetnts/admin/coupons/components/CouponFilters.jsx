import { Search, Filter, Calendar, X } from 'lucide-react';

export default function CouponFilters({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  dateRange,
  setDateRange,
  onReset,
}) {
  return (
    <div className='bg-white rounded-3xl border shadow-sm p-6 mb-6'>
      <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5'>
        {/* Search */}

        <div className='relative w-full xl:max-w-sm'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            type='text'
            placeholder='Search coupon code...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='
              w-full
              pl-11
              pr-4
              py-3
              rounded-2xl
              border
              focus:ring-2
              focus:ring-[#2F4832]
              focus:outline-none
            '
          />
        </div>

        {/* Filters */}

        <div className='flex flex-wrap gap-3'>
          {/* Status */}

          <div className='relative'>
            <Filter
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='
                appearance-none
                pl-9
                pr-10
                py-3
                rounded-2xl
                border
                bg-white
                focus:ring-2
                focus:ring-[#2F4832]
                focus:outline-none
              '>
              <option value='all'>All Status</option>
              <option value='active'>Active</option>
              <option value='expired'>Expired</option>
              <option value='scheduled'>Scheduled</option>
              <option value='disabled'>Disabled</option>
            </select>
          </div>

          {/* Coupon Type */}

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='
              px-4
              py-3
              rounded-2xl
              border
              bg-white
              focus:ring-2
              focus:ring-[#2F4832]
              focus:outline-none
            '>
            <option value='all'>All Types</option>
            <option value='percentage'>Percentage</option>
            <option value='fixed'>Fixed Amount</option>
            <option value='free_shipping'>Free Shipping</option>
          </select>

          {/* Date */}

          <div className='relative'>
            <Calendar
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className='
                appearance-none
                pl-9
                pr-10
                py-3
                rounded-2xl
                border
                bg-white
                focus:ring-2
                focus:ring-[#2F4832]
                focus:outline-none
              '>
              <option value='all'>All Time</option>
              <option value='today'>Today</option>
              <option value='7days'>Last 7 Days</option>
              <option value='30days'>Last 30 Days</option>
              <option value='90days'>Last 90 Days</option>
              <option value='year'>This Year</option>
            </select>
          </div>

          {/* Reset */}

          <button
            onClick={onReset}
            className='
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-red-50
              text-red-600
              hover:bg-red-100
              transition
            '>
            <X size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
