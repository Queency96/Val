import { CalendarDays } from 'lucide-react';

export default function DateRangeFilter({ value, onChange }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative'>
        <CalendarDays
          size={18}
          className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
        />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='
            appearance-none
            pl-11
            pr-10
            py-3
            rounded-2xl
            border
            bg-white
            text-gray-700
            font-medium
            shadow-sm
            hover:border-[#2F4832]
            focus:outline-none
            focus:ring-2
            focus:ring-[#2F4832]
            transition
          '>
          <option value='today'>Today</option>

          <option value='7days'>Last 7 Days</option>

          <option value='30days'>Last 30 Days</option>

          <option value='90days'>Last 90 Days</option>

          <option value='6months'>Last 6 Months</option>

          <option value='1year'>Last 1 Year</option>

          <option value='custom'>Custom Range</option>
        </select>
      </div>

      <button
        className='
          px-5
          py-3
          rounded-2xl
          bg-[#2F4832]
          text-white
          font-medium
          hover:bg-[#243927]
          transition
        '>
        Apply
      </button>
    </div>
  );
}
