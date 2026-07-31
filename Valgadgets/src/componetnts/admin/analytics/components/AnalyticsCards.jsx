import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  CreditCard,
} from 'lucide-react';

export default function AnalyticsCards() {
  const cards = [
    {
      title: 'Total Revenue',
      value: '₦24,580,000',
      change: '+18.5%',
      positive: true,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Orders',
      value: '1,248',
      change: '+12.4%',
      positive: true,
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Customers',
      value: '846',
      change: '+9.8%',
      positive: true,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Products',
      value: '326',
      change: '+14',
      positive: true,
      icon: Package,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Conversion Rate',
      value: '4.82%',
      change: '+0.8%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Average Order',
      value: '₦89,200',
      change: '-3.1%',
      positive: false,
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
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
              shadow-sm
              border
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

            <div className='mt-6 flex items-center justify-between'>
              <span
                className={`text-sm font-semibold ${
                  card.positive ? 'text-green-600' : 'text-red-500'
                }`}>
                {card.change}
              </span>

              <span className='text-xs text-gray-400'>vs last month</span>
            </div>

            {/* Progress Bar */}

            <div className='mt-4 h-2 bg-gray-100 rounded-full overflow-hidden'>
              <div
                className={`h-full rounded-full ${
                  card.positive ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{
                  width: card.positive ? '78%' : '42%',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
