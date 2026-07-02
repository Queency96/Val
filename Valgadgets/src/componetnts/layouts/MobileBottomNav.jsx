import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div
      className='
      md:hidden
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      z-50
    '>
      <div className='grid grid-cols-5 py-3'>
        <Home className='mx-auto' />
        <Search className='mx-auto' />
        <Heart className='mx-auto' />
        <ShoppingCart className='mx-auto' />
        <User className='mx-auto' />
      </div>
    </div>
  );
}
