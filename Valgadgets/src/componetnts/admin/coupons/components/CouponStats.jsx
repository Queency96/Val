import {
  TicketPercent,
  CheckCircle,
  Clock3,
  XCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

export default function CouponStats({ coupons = [] }) {
  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === 'Active',
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === 'Expired',
  ).length;

  const inactiveCoupons = coupons.filter(
    (coupon) => coupon.status === 'Inactive',
  ).length;

  const totalUsage = coupons.reduce(
    (sum, coupon) => sum + (coupon.usage || 0),
    0,
  );

  const successRate =
    totalCoupons > 0 ? Math.round((activeCoupons / totalCoupons) * 100) : 0;

  const cards = [
    {
      title: 'Total Coupons',
      value: totalCoupons,
      icon: TicketPercent,
      color: 'bg-blue-100 text-blue-600',
      progress: 100,
    },
    {
      title: 'Active',
      value: activeCoupons,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      progress: totalCoupons > 0 ? (activeCoupons / totalCoupons) * 100 : 0,
    },
    {
      title: 'Expired',
      value: expiredCoupons,
      icon: Clock3,
      color: 'bg-yellow-100 text-yellow-600',
      progress: totalCoupons > 0 ? (expiredCoupons / totalCoupons) * 100 : 0,
    },
    {
      title: 'Inactive',
      value: inactiveCoupons,
      icon: XCircle,
      color: 'bg-red-100 text-red-600',
      progress: totalCoupons > 0 ? (inactiveCoupons / totalCoupons) * 100 : 0,
    },
    {
      title: 'Total Usage',
      value: totalUsage.toLocaleString(),
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      progress:
        totalCoupons > 0
          ? Math.min((totalUsage / (totalCoupons * 100)) * 100, 100)
          : 0,
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-600',
      progress: successRate,
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className='
              bg-white
              rounded-3xl
              border
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
              p-6
            '>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-gray-500'>{card.title}</p>

                <h2 className='mt-2 text-3xl font-bold text-gray-900'>
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}>
                <Icon size={28} />
              </div>
            </div>

            <div className='mt-6'>
              <div className='flex justify-between text-xs text-gray-500 mb-2'>
                <span>Progress</span>

                <span>{Math.round(card.progress)}%</span>
              </div>

              <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                <div
                  className='h-full rounded-full bg-[#2F4832] transition-all duration-700'
                  style={{
                    width: `${card.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
