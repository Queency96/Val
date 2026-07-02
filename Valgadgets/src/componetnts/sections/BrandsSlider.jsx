import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppleLogo from '../../assets/AppleLogo.png';
import SamsungLogo from '../../assets/SamsungLogo.webp';
import HPLogo from '../../assets/HPLogo.webp';
import DellLogo from '../../assets/Dell.webp';
import LenovoLogo from '../../assets/LenovoLogo.webp';
import SonyLogo from '../../assets/SonyLogo.webp';
import LGLogo from '../../assets/LGLogo.webp';


export const brands = [
  {
    slug: 'apple',
    name: 'Apple',
    logo: AppleLogo,
    banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    logo: SamsungLogo,
    banner: 'https://images.unsplash.com/photo-1580910051074-3eb694886505',
  },
  {
    slug: 'hp',
    name: 'HP',
    logo: HPLogo,
  },
  {
    slug: 'dell',
    name: 'Dell',
    logo: DellLogo,
  },
  {
    slug: 'lenovo',
    name: 'Lenovo',
    logo: LenovoLogo,
  },
  {
    slug: 'sony',
    name: 'Sony',
    logo: SonyLogo,
  },
  {
    slug: 'lg',
    name: 'LG',
    logo: LGLogo,
  },
];

// Duplicate brands for seamless infinite scrolling
const loopBrands = [...brands, ...brands];

export default function BrandsSlider() {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const animate = () => {
      if (!slider) return;

      slider.scrollLeft += 0.8;

      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const pauseAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resumeAnimation = () => {
    const slider = sliderRef.current;

    const animate = () => {
      if (!slider) return;

      slider.scrollLeft += 0.8;

      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <section className='py-10 bg-[#969696]'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        {/* Header */}
        <div className='mb-12'>
          <span className='inline-flex items-center px-4 py-2 rounded-full bg-[#2F4832]/10 text-[#2F4832] text-sm font-medium text-black'>
            Trusted Global Brands
          </span>

          <h2 className='mt-4 text-3xl md:text-4xl font-bold text-black'>
            Top Brands
          </h2>

          <p className='mt-3 text-black-900 max-w-2xl'>
            Shop authentic gadgets and electronics from the world's leading
            technology manufacturers.
          </p>
        </div>

        {/* Slider */}
        <div className='relative'>
          {/* Left Gradient */}
          <div className='absolute left-0 top-0 h-full w-12 md:w-20 bg-gradient-to-r from-[#969696] to-transparent z-10 pointer-events-none' />

          {/* Right Gradient */}
          <div className='absolute right-0 top-0 h-full w-12 md:w-20 bg-gradient-to-l from-[#969696] to-transparent z-10 pointer-events-none' />

          <div
            ref={sliderRef}
            onMouseEnter={pauseAnimation}
            onMouseLeave={resumeAnimation}
            className='
              flex
              gap-5
              overflow-x-hidden
              py-3
              select-none
            '>
            {loopBrands.map((brand, index) => (
              <button
                key={`${brand.name}-${index}`}
                onClick={() => navigate(`/brand/${brand.name.toLowerCase()}`)}
                className='
                  group
                  min-w-[170px]
                  md:min-w-[210px]
                  bg-black
                  border
                  border-gray-100
                  rounded-3xl
                  p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  hover:border-[#2F4832]
                  transition-all
                  duration-300
                '>
                <div
                  className='
                    w-16
                    h-16
                    md:w-20
                    md:h-20
                    rounded-2xl
                    bg-gray-50
                    flex
                    items-center
                    justify-center
                    transition
                  '>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className='
                      max-h-10
                      md:max-h-12
                      object-contain
                    '
                  />
                </div>

                <h3 className='mt-4 font-semibold text-white'>{brand.name}</h3>

                <p className='text-xs text-gray-500 mt-1'>Official Products</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
