import { useState } from 'react';

import CouponStats from './components/CouponStats';
import CouponFilters from './components/CouponFilters';
import CouponsTable from './components/CouponsTable';
import CreateCouponModal from './components/CreateCouponModal';
import ViewCouponModal from './components/ViewCouponModal';
import DeleteCouponModal from './components/DeleteCouponModal';

export default function Coupons() {
  const [coupons, setCoupons] = useState([
    {
      id: 1001,
      code: 'WELCOME10',
      type: 'Percentage',
      value: 10,
      usage: 42,
      limit: 100,
      minOrder: 5000,
      expires: '2026-12-30',
      status: 'Active',
    },
    {
      id: 1002,
      code: 'BLACKFRIDAY',
      type: 'Percentage',
      value: 25,
      usage: 188,
      limit: 300,
      minOrder: 20000,
      expires: '2026-11-28',
      status: 'Active',
    },
    {
      id: 1003,
      code: 'SHIPFREE',
      type: 'Free Shipping',
      value: 0,
      usage: 85,
      limit: 200,
      minOrder: 10000,
      expires: '2026-09-15',
      status: 'Active',
    },
    {
      id: 1004,
      code: 'SAVE5000',
      type: 'Fixed',
      value: 5000,
      usage: 23,
      limit: 50,
      minOrder: 40000,
      expires: '2026-08-12',
      status: 'Expired',
    },
  ]);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCreate = (coupon) => {
    setCoupons((prev) => [
      {
        id: Date.now(),
        usage: 0,
        status: 'Active',
        ...coupon,
      },
      ...prev,
    ]);

    setShowCreate(false);
  };

  const handleDelete = () => {
    setCoupons((prev) => prev.filter((item) => item.id !== selectedCoupon.id));

    setShowDelete(false);
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}

      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5'>
        <div>
          <h1 className='text-3xl font-bold'>Coupons</h1>

          <p className='text-gray-500 mt-1'>
            Manage discount coupons and promotional campaigns.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className='px-6 py-3 rounded-2xl bg-[#2F4832] text-white hover:bg-[#243927] transition'>
          Create Coupon
        </button>
      </div>

      <CouponStats coupons={coupons} />

      <CouponFilters />

      <CouponsTable
        coupons={coupons}
        onView={(coupon) => {
          setSelectedCoupon(coupon);
          setShowView(true);
        }}
        onDelete={(coupon) => {
          setSelectedCoupon(coupon);
          setShowDelete(true);
        }}
      />

      <CreateCouponModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={handleCreate}
      />

      <ViewCouponModal
        open={showView}
        onClose={() => setShowView(false)}
        coupon={selectedCoupon}
      />

      <DeleteCouponModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        coupon={selectedCoupon}
        onDelete={handleDelete}
      />
    </div>
  );
}



// Example of data:

// {
//   id: 1,
//   name: "Black Friday Promo",
//   code: "BLACK50",
//   description: "50% discount on all smartphones",
//   discountType: "Percentage", // or "Fixed"
//   discount: 50,
//   maximumDiscount: 50000,
//   minimumOrder: 100000,
//   limit: 1000,
//   used: 345,
//   status: "Active",
//   category: "Smartphones",
//   startDate: "01 Aug 2026",
//   endDate: "31 Aug 2026"
// }