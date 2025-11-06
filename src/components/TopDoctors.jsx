import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-6 my-20 md:mx-10 bg-[#F9FAFB] text-[#2C3333] relative overflow-hidden rounded-2xl py-16'>
      {/* Soft pastel gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#E9F5DB] via-[#CDE4D4] to-[#E9F5DB] blur-3xl opacity-70'></div>

      <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#94B49F] to-[#2C3333] relative z-10'>
        Top Doctors to Book
      </h1>

      <p className='sm:w-1/3 text-center text-[#2C3333]/70 text-sm relative z-10'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-10 px-6 relative z-10'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2'
          >
            {/* Soft gradient border */}
            <div className='absolute -inset-0.5 bg-gradient-to-r from-[#CDE4D4] to-[#94B49F] rounded-2xl blur opacity-40 group-hover:opacity-80 transition-all'></div>

            <div className='relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all'>
              <img
                className='w-full h-48 object-cover rounded-t-2xl'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-xs mb-2 ${item.available ? 'text-[#94B49F]' : 'text-gray-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-[#94B49F]' : 'bg-gray-400'}`}></span>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-lg font-semibold text-[#2C3333]'>{item.name}</p>
                <p className='text-sm text-[#2C3333]/70'>{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className='relative mt-12 inline-flex items-center px-10 py-3 text-sm font-medium rounded-full transition-all duration-300 group overflow-hidden text-white'
      >
        <span className='absolute inset-0 bg-gradient-to-r from-[#94B49F] to-[#2C3333] blur-md opacity-70 group-hover:opacity-90 transition-all rounded-full'></span>
        <span className='relative z-10'>View More</span>
      </button>
    </div>
  )
}

export default TopDoctors
