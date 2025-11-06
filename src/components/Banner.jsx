import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex bg-gradient-to-r from-[#A8DADC] to-[#F1FAEE] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden'>

      {/* Soft background blur for depth */}
      <div className='absolute inset-0 bg-gradient-to-tr from-[#F1FAEE80] via-[#A8DADC60] to-[#F1FAEE80] blur-3xl opacity-60'></div>

      {/* ------- Left Side ------- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-[#1D3557]'>
          <p>Book Appointment</p>
          <p className='mt-4 text-[#457B9D]'>With 100+ Trusted Doctors</p>
        </div>

        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='bg-[#1D3557] text-[#F1FAEE] text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:bg-[#457B9D] transition-all duration-300 hover:scale-105'
        >
          Create Account
        </button>
      </div>

      {/* ------- Right Side ------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10'>
        <img
          className='w-full absolute bottom-0 right-0 max-w-md'
          src={assets.appointment_img}
          alt="appointment illustration"
        />
      </div>
    </div>
  )
}

export default Banner
