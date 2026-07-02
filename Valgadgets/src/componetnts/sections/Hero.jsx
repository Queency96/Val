import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollToSection';
import gadgetsHero from '../../assets/gadgetsHero.png';

export default function Hero() {
  const handleScroll = () => {
    const el = document.getElementById('products');

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className='max-w-7xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-10 items-center'>
      {/* ================= LEFT ================= */}
      <div>
        <h1 className='text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-tight'>
          Nigeria's Trusted Electronics Store
        </h1>

        <p className='mt-6 text-[#2F4832] font-semibold text-lg'>
          Shop genuine gadgets with warranty, fast delivery and secure payments.
        </p>

        {/* ACTIONS */}
        <div className='flex flex-wrap gap-4 mt-8'>
          {/* PRIMARY BUTTON */}
          <button
            onClick={handleScroll}
            className='
              group relative overflow-hidden
              bg-[#2F4832] text-white
              px-8 py-4 rounded-xl
              font-semibold
              flex items-center gap-2
              transition-all duration-300
              shadow-md hover:shadow-xl
              hover:-translate-y-1 active:scale-95
            '>
            <span className='relative z-10 flex items-center gap-2'>
              Shop Now
              <ArrowDown size={18} className='' />
            </span>

            {/* glow */}
            <span className='absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/30 to-transparent transition' />
          </button>

          {/* SECONDARY BUTTON */}
          <Link to='/categories/all'>
          <button
            // onClick={() => navigate(${'/categories/all'})}
            className='
              border border-gray-300
              px-8 py-4 rounded-xl
              hover:bg-gray-100
              transition
              font-medium
            '>
            Browse Categories
          </button>
          </Link>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
        className='flex justify-center'>
        <img
          src={gadgetsHero}
          alt='Electronics Hero'
          className='rounded-3xl shadow-xl'></img>
      </motion.div>
    </section>
  );
}
