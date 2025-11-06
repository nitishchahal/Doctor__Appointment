import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      id='speciality'
      className='flex flex-col items-center gap-6 py-20 bg-[#F9FAFB] text-[#2C3333] relative overflow-hidden'
    >
      {/* Soft pastel gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#E9F5DB] via-[#CDE4D4] to-[#E9F5DB] opacity-70 blur-3xl'></div>

      <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#94B49F] to-[#2C3333] relative z-10'>
        Find by Speciality
      </h1>

      <p className='sm:w-1/3 text-center text-[#2C3333]/70 text-sm relative z-10'>
        Browse through our list of trusted doctors and find your perfect specialist with ease.
      </p>

      <div className='flex sm:justify-center gap-6 pt-10 w-full overflow-x-scroll scrollbar-hide relative z-10 px-4'>
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 transition-all duration-500 hover:-translate-y-2 group'
          >
            <div className='relative'>
              <div className='absolute -inset-2 bg-gradient-to-tr from-[#CDE4D4] to-[#94B49F] rounded-xl blur-lg opacity-30 group-hover:opacity-70 transition-all'></div>
              <img
                className='w-20 sm:w-28 mb-3 relative rounded-xl shadow-[0_0_20px_#CDE4D440]'
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p className='text-[#2C3333]/90 font-medium group-hover:text-[#94B49F] transition-all'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
