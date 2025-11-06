import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 rounded-2xl px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:my-16 shadow-md'>

      {/* Header */}
      <div className='text-center text-3xl font-semibold text-[#1D3557] mb-10'>
        <p>
          CONTACT <span className='text-[#457B9D] font-bold'>US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className='my-12 flex flex-col justify-center md:flex-row items-center gap-12 mb-28 text-sm'>
        <img
          className='w-full md:max-w-[360px] rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300'
          src={assets.contact_image}
          alt='Contact'
        />

        <div className='flex flex-col justify-center items-start gap-6 text-[#1D3557]/80 leading-relaxed'>
          <p className='font-semibold text-lg text-[#457B9D]'>OUR OFFICE</p>
          <p className='text-[#1D3557]/70'>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>

          <p className='text-[#1D3557]/70'>
            Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
          </p>

          <p className='font-semibold text-lg text-[#457B9D]'>CAREERS AT PRESCRIPTO</p>
          <p className='text-[#1D3557]/70'>
            Learn more about our teams and job openings.
          </p>

          <button className='border border-[#457B9D] text-[#1D3557] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#A8DADC] hover:text-[#1D3557] transition-all duration-300'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
