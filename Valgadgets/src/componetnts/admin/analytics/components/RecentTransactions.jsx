import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Smartphone,
  Wallet,
} from 'lucide-react';

export default function RecentTransactions() {
  const transactions = [
    {
      id: 'TRX-203948',
      customer: 'John Doe',
      amount: 245000,
      method: 'Card',
      status: 'Successful',
      date: 'Today, 10:45 AM',
      type: 'credit',
    },
    {
      id: 'TRX-203949',
      customer: 'Mary Johnson',
      amount: 860000,
      method: 'Bank Transfer',
      status: 'Successful',
      date: 'Today, 09:18 AM',
      type: 'credit',
    },
    {
      id: 'TRX-203950',
      customer: 'David James',
      amount: 125000,
      method: 'Wallet',
      status: 'Pending',
      date: 'Yesterday',
      type: 'pending',
    },
    {
      id: 'TRX-203951',
      customer: 'Grace Williams',
      amount: 58000,
      method: 'Card',
      status: 'Refunded',
      date: 'Yesterday',
      type: 'refund',
    },
    {
      id: 'TRX-203952',
      customer: 'Michael Smith',
      amount: 310000,
      method: 'USSD',
      status: 'Successful',
      date: '2 days ago',
      type: 'credit',
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-700';

      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'Refunded':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const paymentIcon = (method) => {
    switch (method) {
      case 'Card':
        return <CreditCard size={18} />;

      case 'Wallet':
        return <Wallet size={18} />;

      default:
        return <Smartphone size={18} />;
    }
  };

  const transactionIcon = (type) => {
    if (type === 'refund') {
      return (
        <div className='w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center'>
          <ArrowDownLeft size={18} />
        </div>
      );
    }

    return (
      <div className='w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center'>
        <ArrowUpRight size={18} />
      </div>
    );
  };

  return (
    <div className='bg-white rounded-3xl border shadow-sm'>
      {/* Header */}

      <div className='flex items-center justify-between p-6 border-b'>
        <div>
          <h2 className='text-2xl font-bold'>Recent Transactions</h2>

          <p className='text-gray-500 mt-1'>Latest customer payments</p>
        </div>

        <button
          className='
            px-5
            py-2
            rounded-xl
            bg-[#2F4832]
            hover:bg-[#243927]
            text-white
            transition
          '>
          View All
        </button>
      </div>

      {/* Transactions */}

      <div className='divide-y'>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='flex items-center justify-between p-5 hover:bg-gray-50 transition'>
            <div className='flex items-center gap-4'>
              {transactionIcon(transaction.type)}

              <div>
                <h3 className='font-semibold'>{transaction.customer}</h3>

                <p className='text-sm text-gray-500'>{transaction.id}</p>
              </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 text-gray-600'>
              {paymentIcon(transaction.method)}

              <span>{transaction.method}</span>
            </div>

            <div className='hidden md:block text-gray-500 text-sm'>
              {transaction.date}
            </div>

            <div className='text-right'>
              <p className='font-bold text-lg text-[#2F4832]'>
                ₦{transaction.amount.toLocaleString()}
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                  transaction.status,
                )}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
