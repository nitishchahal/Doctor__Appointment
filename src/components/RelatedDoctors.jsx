import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaUserMd, FaCircle } from 'react-icons/fa'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (!relDoc.length) return null

  return (
    <section className="mt-12 md:mt-16">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8DADC]/20 border border-[#A8DADC]/60 text-[11px] text-[#1D3557]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
            <FaUserMd />
          </span>
          <span>More {speciality} specialists you may like</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3557]">
          Related Doctors
        </h2>
        <p className="sm:w-1/2 text-xs sm:text-sm text-[#1D3557]/75">
          Explore other trusted doctors in the same speciality and find the best
          fit for your care.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 px-1 sm:px-0">
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="cursor-pointer group rounded-2xl overflow-hidden bg-white/90 border border-[#A8DADC]/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative bg-[#A8DADC]/20 flex justify-center items-center h-32">
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                src={item.image}
                alt={item.name}
              />

              {/* Availability pill */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-medium bg-[#F1FAEE]/95 border flex items-center gap-1 ${
                  item.available
                    ? 'border-[#22c55e]/70 text-[#166534]'
                    : 'border-[#A8DADC]/70 text-[#475569]'
                }`}
              >
                <FaCircle
                  className={`text-[8px] ${
                    item.available ? 'text-[#22c55e]' : 'text-[#94a3b8]'
                  }`}
                />
                <span>{item.available ? 'Available' : 'Not available'}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-1 text-xs sm:text-sm text-[#1D3557]/80">
              <p className="text-[#1D3557] text-sm sm:text-base font-semibold">
                {item.name}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#F1FAEE] border border-[#A8DADC]/70 text-[11px] text-[#457B9D]">
                  {item.speciality}
                </span>
              </div>

              {/* Optional tiny line like location / experience if you have in data */}
              {item.experience && (
                <p className="text-[11px] text-[#1D3557]/70 mt-1">
                  Experience: {item.experience}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctors
