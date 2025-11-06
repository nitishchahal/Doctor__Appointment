import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#F1FAEE] text-[#1D3557] rounded-2xl px-6 md:px-12 lg:px-20 py-16 md:py-20 my-10 mx-4 md:mx-8 relative overflow-hidden'>

      {/* Soft gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#A8DADC40] via-[#F1FAEE80] to-[#A8DADC40] blur-3xl opacity-60 -z-10'></div>

      {/* -------- Header Left -------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 relative z-10'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold leading-tight'>
          Book Appointment <br />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#457B9D] to-[#A8DADC]'>
            With Trusted Doctors
          </span>
        </h1>

        <div className='flex flex-col md:flex-row items-center gap-4 text-[#1D3557]/80 text-sm font-light'>
          <img className='w-24 opacity-90 hover:opacity-100 transition-all duration-300' src={assets.group_profiles} alt="group" />
          <p className='max-w-sm'>
            Browse our list of trusted doctors and schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href='#speciality'
          className='relative inline-flex items-center gap-2 px-8 py-3 mt-4 rounded-full text-sm font-medium text-[#F1FAEE] bg-[#457B9D] hover:bg-[#1D3557] transition-all duration-300 shadow-md hover:shadow-lg'
        >
          Book Appointment
          <img className='w-3' src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/* -------- Header Right -------- */}
      <div className='md:w-1/2 relative z-10 flex justify-center items-center mt-12 md:mt-0'>
        <div className='relative w-full max-w-md'>
          <div className='absolute -inset-3 bg-gradient-to-tr from-[#A8DADC] to-[#457B9D] rounded-2xl blur-xl opacity-40'></div>
          <img className='relative w-full rounded-2xl shadow-[0_0_25px_#A8DADC60]' src={assets.header_img} alt="header" />
        </div>
      </div>
    </div>
  )
}

export default Header
