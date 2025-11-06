import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 mt-32 mb-10 px-6 sm:px-10 md:px-14 lg:px-16 py-12 bg-gradient-to-t from-[#F1FAEE] to-[#A8DADC] rounded-2xl shadow-lg'>

      {/* ------- Main Grid ------- */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-16 text-sm'>

        {/* ------- Left Section ------- */}
        <div className='space-y-4'>
          <img className='mb-5 w-44' src={assets.logo} alt="logo" />
          <p className='w-full md:w-2/3 text-[#1D3557] leading-7 tracking-wide'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* ------- Company Section ------- */}
        <div className='space-y-3'>
          <p className='text-xl font-semibold text-[#1D3557] mb-3'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-[#457B9D]'>
            <li className='hover:text-[#1D3557] transition-colors duration-300 cursor-pointer'>Home</li>
            <li className='hover:text-[#1D3557] transition-colors duration-300 cursor-pointer'>About Us</li>
            <li className='hover:text-[#1D3557] transition-colors duration-300 cursor-pointer'>Delivery</li>
            <li className='hover:text-[#1D3557] transition-colors duration-300 cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* ------- Contact Section ------- */}
        <div className='space-y-3'>
          <p className='text-xl font-semibold text-[#1D3557] mb-3'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-[#457B9D]'>
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------- Divider & Bottom Copyright ------- */}
      <div className='mt-16'>
        <hr className='border-[#1D3557]/30' />
        <p className='py-6 text-sm text-center text-[#1D3557] font-medium'>
          © 2024 Prescripto.com — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
