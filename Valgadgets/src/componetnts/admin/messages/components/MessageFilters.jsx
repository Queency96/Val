import { Search, Filter, Calendar, RotateCcw } from 'lucide-react';

export default function MessageFilters({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  date,
  setDate,
  onReset,
}) {
  return (
    <div className='bg-white rounded-3xl border shadow-sm p-6 mb-6'>
      <div className='flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between'>
        {/* Search */}

        <div className='relative flex-1 max-w-md'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input
            type='text'
            placeholder='Search by recipient, subject or ID...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='
              w-full
              pl-11
              pr-4
              py-3
              rounded-2xl
              border
              focus:outline-none
              focus:ring-2
              focus:ring-[#2F4832]
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
                pl-10
                pr-8
                py-3
                rounded-2xl
                border
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F4832]
              '>
              <option value='all'>All Status</option>
              <option value='sent'>Sent</option>
              <option value='scheduled'>Scheduled</option>
              <option value='draft'>Draft</option>
              <option value='failed'>Failed</option>
            </select>
          </div>

          {/* Message Type */}

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='
              px-4
              py-3
              rounded-2xl
              border
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#2F4832]
            '>
            <option value='all'>All Types</option>
            <option value='email'>Email</option>
            <option value='sms'>SMS</option>
            <option value='push'>Push Notification</option>
          </select>

          {/* Date */}

          <div className='relative'>
            <Calendar
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='
                pl-10
                pr-4
                py-3
                rounded-2xl
                border
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F4832]
              '
            />
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
              border
              hover:bg-gray-100
              transition
            '>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
