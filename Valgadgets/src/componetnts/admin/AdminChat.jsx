import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
  X,
} from 'lucide-react';

export default function AdminChat({ open, onClose }) {
  const messagesEndRef = useRef(null);

  const [search, setSearch] = useState('');

  const [text, setText] = useState('');

  const [showCustomers, setShowCustomers] = useState(true);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      online: true,
      unread: 2,
      typing: false,
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Hello Admin 👋',
          time: '09:20',
        },
        {
          id: 2,
          sender: 'admin',
          text: 'Hi John, how can I help?',
          time: '09:22',
        },
      ],
    },

    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      online: false,
      unread: 1,
      typing: false,
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Can I change my address?',
          time: '10:13',
        },
      ],
    },

    {
      id: 3,
      name: 'David James',
      avatar: 'https://i.pravatar.cc/150?img=8',
      online: true,
      unread: 0,
      typing: false,
      messages: [],
    },

    {
      id: 4,
      name: 'Mary Johnson',
      avatar: 'https://i.pravatar.cc/150?img=9',
      online: true,
      unread: 5,
      typing: true,
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Thank you 😊',
          time: 'Yesterday',
        },
      ],
    },
  ]);

  const [selectedCustomerId, setSelectedCustomerId] = useState(1);

  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === selectedCustomerId),
    [customers, selectedCustomerId],
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [customers, search]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [selectedCustomer]);

  const sendMessage = () => {
    if (!text.trim()) return;

    setCustomers((prev) =>
      prev.map((customer) => {
        if (customer.id !== selectedCustomerId) return customer;

        return {
          ...customer,
          messages: [
            ...customer.messages,
            {
              id: Date.now(),
              sender: 'admin',
              text,
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ],
        };
      }),
    );

    setText('');
  };

  const openConversation = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowCustomers(false);

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              unread: 0,
            }
          : customer,
      ),
    );
  };

  const backToCustomers = () => {
    setShowCustomers(true);
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[9999] pointer-events-none'>
      <div
        className='
          pointer-events-auto
          absolute
          bottom-5
          mx-auto
          left-1
          right-1
          w-90
          h-95
          sm:w-[400px]
          sm:h-[560px]
          md:w-[410px]
          md:h-[570px]
          lg:w-[640px]
          lg:h-[480px]
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          border
          flex
          flex-col
        '>
        {/* ================= HEADER ================= */}
        <div className='hidden lg:flex h-16 border-b bg-[#2F4832] text-white items-center justify-between px-6'>
          <div>
            <h2 className='text-xl font-semibold'>Customer Chats</h2>
            <p className='text-sm text-green-100'>
              {customers.length} Customers
            </p>
          </div>

          <button
            onClick={onClose}
            className='w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition'>
            <X size={22} />
          </button>
        </div>
        {/* Mobile Header */}

        <div className='lg:hidden h-14 border-b bg-[#2F4832] text-white flex items-center justify-between px-4'>
          {/* Left */}
          <div className='w-10 flex justify-start'>
            {!showCustomers && (
              <button
                onClick={backToCustomers}
                className='w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition'>
                <ArrowLeft size={22} />
              </button>
            )}
          </div>

          {/* Center */}
          <h2 className='font-semibold'>
            {showCustomers ? 'Chats' : selectedCustomer.name}
          </h2>

          {/* Right */}
          <button
            onClick={onClose}
            className='w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center'>
            <X size={18} />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className='flex flex-1 overflow-hidden'>
          {/* ================= CUSTOMER LIST ================= */}

          <div
            className={`
              bg-white border-r flex flex-col

              w-full
              lg:w-[320px]
              xl:w-[340px]

              ${showCustomers ? 'flex' : 'hidden lg:flex'}
            `}>
            {/* SEARCH */}

            <div className='p-2 border-b w-full bg-red-600'>
              <div className='relative'>
                <Search
                  size={18}
                  className='absolute left-4 top-3.5 text-gray-400'
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search customers...'
                  className='w-full rounded-xl border pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F4832]'
                />
              </div>
            </div>

            {/* CUSTOMER ITEMS */}

            <div className='flex-1 overflow-y-auto px-4'>
              {filteredCustomers.map((customer) => {
                const lastMessage =
                  customer.messages[customer.messages.length - 1];

                return (
                  <button
                    key={customer.id}
                    onClick={() => openConversation(customer.id)}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-2
                      py-3
                      border-b
                      transition

                      ${
                        customer.id === selectedCustomerId
                          ? 'bg-green-50 border-l-4 border-[#2F4832]'
                          : 'hover:bg-gray-50'
                      }
                    `}>
                    <div className='relative flex-shrink-0'>
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className='w-12 h-12 rounded-full object-cover'
                      />

                      {customer.online && (
                        <span className='absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white' />
                      )}
                    </div>

                    <div className='flex-1 overflow-hidden text-left'>
                      <div className='flex justify-between'>
                        <h3 className='text-sm font-semibold truncate'>
                          {customer.name}
                        </h3>

                        <span className='text-xs text-gray-400'>
                          {lastMessage?.time}
                        </span>
                      </div>

                      <p className='text-sm text-gray-500 truncate mt-1'>
                        {customer.typing
                          ? 'Typing...'
                          : lastMessage?.text || 'No messages'}
                      </p>
                    </div>

                    {customer.unread > 0 && (
                      <span className='bg-[#2F4832] text-white text-xs min-w-6 h-6 rounded-full flex items-center justify-center px-2'>
                        {customer.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= CHAT AREA ================= */}

          <div
            className={`
              flex-1
              flex
              flex-col
              bg-gray-100
              min-h-0
              ${showCustomers ? 'hidden lg:flex' : 'flex'}
            `}>
            {/* ================= MESSAGES ================= */}

            <div className='flex-1 overflow-y-auto px-4 py-4'>
              <div className='space-y-3'>
                {selectedCustomer.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'admin'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}>
                    <div
                      className={`
                        max-w-[80%]
                        rounded-2xl
                        px-4
                        py-2
                        shadow-sm
                        ${
                          message.sender === 'admin'
                            ? 'bg-[#2F4832] text-white rounded-br-md'
                            : 'bg-white rounded-bl-md'
                        }
                      `}>
                      <p className='text-sm'>{message.text}</p>

                      <p
                        className={`text-[10px] mt-1 text-right ${
                          message.sender === 'admin'
                            ? 'text-green-100'
                            : 'text-gray-400'
                        }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ================= INPUT ================= */}

            <div className='flex-shrink-0 bg-white border-t p-3 w-full pe-4'>
              <div className='flex items-center gap-1'>
                <button className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition'>
                  <Smile size={20} />
                </button>

                <button className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition'>
                  <Paperclip size={20} />
                </button>

                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage();
                  }}
                  placeholder='Type a message...'
                  className='
                      flex-1
                      border
                      rounded-full
                      px-3
                      py-2
                      outline-none
                      focus:ring-2
                      focus:ring-[#2F4832]
                    '
                />

                <button
                  onClick={sendMessage}
                  disabled={!text.trim()}
                  className='
                      w-10
                      h-10
                      mx-3
                      rounded-full
                      bg-[#2F4832]
                      hover:bg-[#243928]
                      disabled:bg-gray-300
                      text-white
                      flex
                      items-center
                      justify-center
                      transition
                    '>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
