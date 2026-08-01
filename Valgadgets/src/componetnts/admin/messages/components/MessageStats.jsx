import {
  MessageSquare,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function MessageStats({ messages = [] }) {
  const totalMessages = messages.length;

  const sent = messages.filter((message) => message.status === 'Sent').length;

  const pending = messages.filter(
    (message) => message.status === 'Pending' || message.status === 'Scheduled',
  ).length;

  const delivered = messages.filter(
    (message) => message.status === 'Delivered',
  ).length;

  const failed = messages.filter(
    (message) => message.status === 'Failed' || message.status === 'Cancelled',
  ).length;

  const successRate =
    totalMessages > 0 ? Math.round((delivered / totalMessages) * 100) : 0;

  const cards = [
    {
      title: 'Total Messages',
      value: totalMessages,
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-600',
      progress: 100,
    },
    {
      title: 'Sent',
      value: sent,
      icon: Send,
      color: 'bg-green-100 text-green-600',
      progress: totalMessages > 0 ? (sent / totalMessages) * 100 : 0,
    },
    {
      title: 'Pending',
      value: pending,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      progress: totalMessages > 0 ? (pending / totalMessages) * 100 : 0,
    },
    {
      title: 'Delivered',
      value: delivered,
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-600',
      progress: totalMessages > 0 ? (delivered / totalMessages) * 100 : 0,
    },
    {
      title: 'Failed',
      value: failed,
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
      progress: totalMessages > 0 ? (failed / totalMessages) * 100 : 0,
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: Mail,
      color: 'bg-purple-100 text-purple-600',
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
