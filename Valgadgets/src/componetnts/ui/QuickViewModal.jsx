import { X } from 'lucide-react';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white w-[90%] md:w-[600px] p-6 rounded-2xl relative'>
        <button onClick={onClose} className='absolute top-4 right-4'>
          <X />
        </button>

        <img
          src={product.image}
          className='w-full h-60 object-cover rounded-xl'
        />

        <h2 className='text-2xl font-bold mt-4'>{product.name}</h2>

        <p className='text-gray-600 mt-2'>{product.description}</p>

        <div className='mt-4 font-bold text-xl'>
          ₦{product.price.toLocaleString()}
        </div>

        <button className='w-full mt-6 bg-[#2F4832] text-white py-3 rounded-xl'>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
