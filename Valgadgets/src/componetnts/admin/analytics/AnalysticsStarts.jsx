import { useState } from 'react';
import DateRangeFilter from './components/DateRangeFilter';
import AnalyticsCards from './components/AnalyticsCards';
import RevenueChart from './components/RevenueChart';
import SalesChart from './components/SalesChart';
import TopProducts from './components/TopProducts';
import TopCategories from './components/TopCategories';
import CustomerInsights from './components/CustomerInsights';
import RecentTransactions from './components/RecentTransactions';

export default function AnalyticsStarts() {
  const [dateRange, setDateRange] = useState('30days');
  return (
    <>
      <div className='space-y-6 p-6'>
        {/* ================= HEADER ================= */}

        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Analytics Dashboard
            </h1>

            <p className='text-gray-500 mt-1'>
              Track your sales, revenue, customers and overall business
              performance.
            </p>
          </div>

          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>

        {/* ================= KPI CARDS ================= */}

        <AnalyticsCards />

        {/* ================= CHARTS ================= */}

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          <div className='xl:col-span-2'>
            <RevenueChart range={dateRange} />
          </div>

          <SalesChart range={dateRange} />
        </div>

        {/* ================= PRODUCTS & CATEGORIES ================= */}

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          <TopProducts />

          <TopCategories />
        </div>

        {/* ================= CUSTOMER INSIGHTS ================= */}

        <CustomerInsights />

        {/* ================= RECENT TRANSACTIONS ================= */}

        <RecentTransactions />
      </div>
    </>
  );
}
