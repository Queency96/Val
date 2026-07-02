export default function SkeletonCard() {
  return (
    <div className='bg-white rounded-3xl p-4 animate-pulse'>
      <div className='w-full h-64 bg-gray-300 rounded-2xl' />

      <div className='h-3 bg-gray-300 mt-4 w-1/3 rounded' />

      <div className='h-4 bg-gray-300 mt-3 w-3/4 rounded' />

      <div className='h-3 bg-gray-300 mt-3 w-1/2 rounded' />

      <div className='h-5 bg-gray-300 mt-4 w-2/3 rounded' />

      <div className='flex gap-2 mt-5'>
        <div className='h-10 bg-gray-300 w-1/2 rounded-xl' />
        <div className='h-10 bg-gray-300 w-1/2 rounded-xl' />
      </div>

      <div className='flex justify-between mt-4'>
        <div className='h-5 w-5 bg-gray-300 rounded' />
        <div className='h-5 w-5 bg-gray-300 rounded' />
        <div className='h-5 w-5 bg-gray-300 rounded' />
      </div>
    </div>
  );
}
