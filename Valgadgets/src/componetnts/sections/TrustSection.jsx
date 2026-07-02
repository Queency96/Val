const trustItems = [
  '100% Authentic Products',
  'Official Warranty Support',
  'Nationwide Delivery',
  'Secure Payments',
  'Easy Returns',
];

export default function TrustSection() {
  return (
    <section className='bg-black text-white py-20'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-5 gap-6'>
        {trustItems.map((item) => (
          <div key={item} className='bg-white/10 p-6 rounded-xl text-center'>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
