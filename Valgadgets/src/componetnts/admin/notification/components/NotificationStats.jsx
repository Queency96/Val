import {
  Bell,
  Send,
  Clock,
  FileText,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function NotificationStats({
  notifications = [],
}) {
  const total = notifications.length;

  const sent = notifications.filter(
    (notification) => notification.status === 'Sent',
  ).length;

  const scheduled = notifications.filter(
    (notification) => notification.status === 'Scheduled',
  ).length;

  const drafts = notifications.filter(
    (notification) => notification.status === 'Draft',
  ).length;

  const failed = notifications.filter(
    (notification) => notification.status === 'Failed',
  ).length;

  const successRate =
    total > 0 ? Math.round((sent / total) * 100) : 0;

  const cards = [
    {
      title: 'Total Notifications',
      value: total,
      icon: Bell,
      color: 'bg-blue-100 text-blue-600',
      progress: 100,
    },
    {
      title: 'Sent',
      value: sent,
      icon: Send,
      color: 'bg-green-100 text-green-600',
      progress: total ? (sent / total) * 100 : 0,
    },
    {
      title: 'Scheduled',
      value: scheduled,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      progress: total ? (scheduled / total) * 100 : 0,
    },
    {
      title: 'Drafts',
      value: drafts,
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600',
      progress: total ? (drafts / total) * 100 : 0,
    },
    {
      title: 'Failed',
      value: failed,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      progress: total ? (failed / total) * 100 : 0,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
              p-6
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>

            <div className="mt-6 flex justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>

              <span>{Math.round(card.progress)}%</span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  card.title === 'Failed'
                    ? 'bg-red-500'
                    : card.title === 'Scheduled'
                    ? 'bg-yellow-500'
                    : card.title === 'Drafts'
                    ? 'bg-indigo-500'
                    : 'bg-[#2F4832]'
                } transition-all duration-700`}
                style={{
                  width: `${card.progress}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}