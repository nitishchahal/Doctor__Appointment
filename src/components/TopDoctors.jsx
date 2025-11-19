import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaUserMd, FaStar } from 'react-icons/fa'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const topDoctors = doctors.slice(0, 10)

  return (
    <section className="relative my-20 mx-4 md:mx-10 rounded-3xl py-14 md:py-16 bg-[#F9FAFB] text-[#2C3333] overflow-hidden shadow-lg border border-[#CDE4D440]">
      {/* Floating Gradient Decor */}
      <div className="pointer-events-none absolute -top-20 -left-10 w-72 h-72 bg-[#CDE4D4] opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-[#94B49F] opacity-30 blur-3xl animate-pulse-slow"></div>

      {/* Inner container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Top row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CDE4D4]/40 border border-[#CDE4D4]/70 text-xs font-medium tracking-wide">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#94B49F] text-white text-[10px]">
                <FaUserMd />
              </span>
              Recommended by platform
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#94B49F] to-[#2C3333]">
              Top Doctors to Book
            </h1>

            <p className="text-sm md:text-base text-[#2C3333]/70 max-w-md">
              Simply browse through our list of highly rated and trusted doctors and book your next appointment in a few clicks.
            </p>
          </div>

          {/* Stats + filter chips (UI only) */}
          <div className="w-full md:w-72 space-y-3 text-xs md:text-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[#2C3333]/60">Featured doctors</p>
                <p className="text-lg font-semibold">{topDoctors.length}</p>
              </div>
              <div className="text-right">
                <p className="text-[#2C3333]/60">Overall rating</p>
                <p className="text-lg font-semibold flex items-center justify-end gap-1">
                  4.9 <FaStar className="text-[#94B49F] text-xs" />
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 rounded-full border border-[#94B49F] bg-white text-[11px] font-medium">
                All
              </button>
              <button className="px-3 py-1 rounded-full border border-[#CDE4D4] bg-white/70 text-[11px]">
                Available now
              </button>
              <button className="px-3 py-1 rounded-full border border-[#CDE4D4] bg-white/70 text-[11px]">
                By speciality
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#CDE4D4]/80 to-transparent" />

        {/* Doctor Cards Grid */}
        <div className="mt-8 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {topDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }}
              className="group relative cursor-pointer rounded-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Outer glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CDE4D4] to-[#94B49F] rounded-2xl blur opacity-40 group-hover:opacity-80 transition-all"></div>

              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col">
                {/* Image */}
                <div className="relative">
                  <img
                    className="w-full h-44 object-cover rounded-t-2xl"
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Availability badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-medium bg-white/90 flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? 'bg-[#94B49F]' : 'bg-gray-400'
                      }`}
                    ></span>
                    <span className={item.available ? 'text-[#2C3333]/80' : 'text-gray-500'}>
                      {item.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>

                  {/* Speciality pill */}
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-[10px] bg-[#F9FAFB]/95 border border-[#CDE4D4]/80 text-[#2C3333]/80">
                    {item.speciality}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5 flex flex-col gap-1.5 flex-grow">
                  <p className="text-sm font-semibold text-[#2C3333] line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-[11px] text-[#2C3333]/70 line-clamp-1">
                    {item.speciality} • Trusted specialist
                  </p>

                  {/* Rating & experience row (static rating UI) */}
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#2C3333]/65">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-[#94B49F] text-[10px]" />
                      <span>4.9</span>
                      <span className="opacity-70">(120+)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#F9FAFB] border border-[#CDE4D4]/80">
                      Book now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              navigate('/doctors')
              scrollTo(0, 0)
            }}
            className="relative inline-flex items-center px-10 py-3 text-sm font-medium rounded-full text-white overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#94B49F] to-[#2C3333] blur-md opacity-70 group-hover:opacity-90 transition-all rounded-full"></span>
            <span className="relative z-10">View All Doctors</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopDoctors

/* Keep this globally if not already included */
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s infinite ease-in-out;
}
*/
