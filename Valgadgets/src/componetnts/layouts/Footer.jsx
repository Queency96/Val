import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='bg-black text-white mt-20'>
      {/* Top Newsletter Section */}
      <div className='max-w-7xl mx-auto px-6 py-14 border-b border-gray-700'>
        <div className='grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <h2 className='text-3xl font-bold'>Stay Updated on Deals 🔥</h2>
            <p className='text-gray-400 mt-2'>
              Get exclusive discounts, flash sales & new arrivals in Nigeria.
            </p>
          </div>

          <div className='flex gap-3'>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-3 rounded-xl text-black'
            />
            <button className='bg-[#FFB800] text-black px-6 rounded-xl font-semibold'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className='max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10'>
        <div>
          <h3 className='font-bold text-lg mb-4'>Company</h3>
          <ul className='space-y-2 text-gray-400'>
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-400'>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Warranty</li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-4'>Policies</h3>
          <ul className='space-y-2 text-gray-400'>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Payment Security</li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className='font-bold text-lg mb-4'>Contact</h3>

          <p className='text-gray-400 text-sm'>
            Lagos, Nigeria <br />
            support@gadgetstore.ng <br />
            +234 800 123 4567
          </p>

          <div className='flex gap-4 mt-5'>
            <FaInstagram />
            <FaFacebook />
            <FaYoutube />
            <FaTwitter />
            <FaWhatsapp />
            {/* <Instagram className='cursor-pointer hover:text-[#FFB800]' />
            <Youtube className='cursor-pointer hover:text-[#FFB800]' />
            <Twitter className='cursor-pointer hover:text-[#FFB800]' />
            <MessageCircle className='cursor-pointer hover:text-[#22C55E]' />
            <Globe className='cursor-pointer hover:text-[#FFB800]' /> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-700 py-6 text-center text-gray-500 text-sm'>
        © {new Date().getFullYear()} GadgetHub Nigeria. All rights reserved.
      </div>
    </footer>
  );
}
