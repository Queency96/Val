import {
  Truck,
  PackageCheck,
  Clock3,
  XCircle,
  TrendingUp,
  Bike,
} from 'lucide-react';

export default function DeliveryStats({ deliveries = [] }) {
  const stats = deliveries.reduce(
    (acc, delivery) => {
      switch (delivery.status) {
        case 'Pending':
          acc.pending++;
          break;

        case 'Assigned':
        case 'Picked Up':
        case 'In Transit':
          acc.inTransit++;
          break;

        case 'Delivered':
          acc.delivered++;
          break;

        case 'Cancelled':
        case 'Failed':
          acc.cancelled++;
          break;

        default:
          break;
      }

      return acc;
    },
    {
      pending: 0,
      inTransit: 0,
      delivered: 0,
      cancelled: 0,
    },
  );

  const total = deliveries.length;

  const successRate =
    total > 0 ? Math.round((stats.delivered / total) * 100) : 0;

  const cards = [
    {
      title: 'Total Deliveries',
      value: total,
      icon: Truck,
      color: 'bg-blue-100 text-blue-600',
      progress: 100,
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock3,
      color: 'bg-yellow-100 text-yellow-600',
      progress: total ? (stats.pending / total) * 100 : 0,
    },
    {
      title: 'In Transit',
      value: stats.inTransit,
      icon: Bike,
      color: 'bg-purple-100 text-purple-600',
      progress: total ? (stats.inTransit / total) * 100 : 0,
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      icon: PackageCheck,
      color: 'bg-green-100 text-green-600',
      progress: total ? (stats.delivered / total) * 100 : 0,
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-100 text-red-600',
      progress: total ? (stats.cancelled / total) * 100 : 0,
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
            className='bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-300 p-6'>
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
