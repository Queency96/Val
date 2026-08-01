import { Bell, Plus, Search } from 'lucide-react';

export default function NotificationFilters({
  search,
  setSearch,
  status,
  setStatus,
  onCompose,
}) {
  return (
    <div className='bg-white rounded-3xl border shadow-sm p-6'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        {/* Left */}

        <div className='flex flex-col sm:flex-row gap-4 flex-1'>
          {/* Search */}

          <div className='relative flex-1'>
            <Search
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input
              type='text'
              placeholder='Search notification title or recipient...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='
                w-full
                pl-11
                pr-4
                py-3
                rounded-2xl
                border
                border-gray-200
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F4832]
                focus:border-[#2F4832]
                transition
              '
            />
          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='
              px-5
              py-3
              rounded-2xl
              border
              border-gray-200
              bg-white
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-[#2F4832]
            '>
            <option value='All'>All Status</option>
            <option value='Sent'>Sent</option>
            <option value='Scheduled'>Scheduled</option>
            <option value='Draft'>Draft</option>
            <option value='Failed'>Failed</option>
          </select>
        </div>

        {/* Right */}

        <button
          onClick={onCompose}
          className='
            inline-flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-[#2F4832]
            hover:bg-[#243927]
            text-white
            font-semibold
            transition
            shadow-sm
          '>
          <Plus size={18} />
          New Notification
        </button>
      </div>

      {/* Quick Filters */}

      <div className='flex flex-wrap gap-3 mt-6'>
        {['All', 'Sent', 'Scheduled', 'Draft', 'Failed'].map((item) => (
          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              status === item
                ? 'bg-[#2F4832] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            <div className='flex items-center gap-2'>
              <Bell size={15} />

              {item}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
