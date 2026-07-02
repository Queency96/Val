import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <section className='max-w-2xl mx-auto text-center py-20 px-6'>
      <div className='bg-green-100 text-green-700 p-6 rounded-2xl'>
        <h1 className='text-3xl font-bold'>🎉 Order Successful!</h1>
        <p className='mt-2'>Your order has been placed successfully.</p>
      </div>

      <Link
        to='/'
        className='inline-block mt-8 bg-[#2F4832] text-white px-6 py-3 rounded-xl'>
        Continue Shopping
      </Link>
    </section>
  );
}
