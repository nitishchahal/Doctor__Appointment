import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate, useParams } from "react-router-dom"
import { FaUserMd, FaFilter, FaStar } from "react-icons/fa"

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ]

  return (
    <div className="relative mt-20 mx-4 md:mx-8 bg-[#F1FAEE] rounded-3xl px-4 sm:px-8 lg:px-12 py-10 md:py-12 shadow-md border border-[#A8DADC]/40 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#A8DADC] opacity-30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-72 h-72 bg-[#457B9D] opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 md:mb-12 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8DADC]/25 border border-[#A8DADC]/70 text-[11px] text-[#1D3557]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
                <FaUserMd />
              </span>
              <span>Browse specialists and book your appointment</span>
            </div>

            <div>
              <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-semibold mb-2 tracking-tight">
                Meet Our Expert Doctors
              </h2>
              <p className="text-[#1D3557]/75 text-sm sm:text-base max-w-2xl">
                Qualified professionals from premier institutes dedicated to
                providing trusted medical care and excellence in patient service.
              </p>
            </div>
          </div>

          {/* Small stats card */}
          <div className="w-full md:w-64 rounded-2xl bg-white/90 shadow-sm border border-[#A8DADC]/60 px-4 py-3 text-xs sm:text-sm text-[#1D3557]/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span>Doctors listed</span>
              <span className="font-semibold text-[#1D3557]">
                {filterDoc.length || doctors.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Specialities</span>
              <span className="font-semibold text-[#1D3557]">
                {specialities.length}+
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1D3557]/80">
              <FaFilter className="text-[#457B9D]" />
              <span className="font-medium">
                Filter by speciality
                {speciality ? `: ${speciality}` : ""}
              </span>
            </div>
            {speciality && (
              <button
                onClick={() => navigate("/doctors")}
                className="text-[11px] sm:text-xs text-[#457B9D] hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {specialities.map((spec, index) => {
              const active = speciality === spec
              return (
                <button
                  key={index}
                  onClick={() =>
                    active ? navigate("/doctors") : navigate(`/doctors/${spec}`)
                  }
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-[#457B9D] to-[#1D3557] text-[#F1FAEE] border border-[#457B9D] shadow-sm"
                      : "border border-[#A8DADC] text-[#1D3557] bg-white/80 hover:bg-[#A8DADC]/20"
                  }`}
                >
                  {spec}
                </button>
              )
            })}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }}
              className="bg-white/95 border border-[#A8DADC]/60 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(15,23,42,0.1)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-all duration-300 cursor-pointer group flex flex-col backdrop-blur-sm"
            >
              {/* Doctor Image */}
              <div className="relative flex justify-center items-center h-44 bg-gradient-to-t from-[#A8DADC]/40 to-[#F1FAEE]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                />

                {/* Availability badge */}
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-medium ${
                    item.available
                      ? "bg-[#A8DADC]/25 text-[#1D3557]"
                      : "bg-[#F1FAEE] text-[#1D3557]/60"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="px-5 pb-5 pt-3 text-center flex flex-col flex-grow">
                <h3 className="text-[#1D3557] text-base sm:text-lg font-semibold mt-1">
                  {item.name}
                </h3>
                <p className="text-[#1D3557]/70 text-xs sm:text-sm mb-1">
                  {item.speciality}
                </p>

                {/* Rating + label row */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#1D3557]/70 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <FaStar className="text-[#FACC15] text-[10px]" />
                    4.9
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#A8DADC]" />
                  <span>Trusted by patients</span>
                </div>

                {/* Tag chip */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-[11px] rounded-full bg-[#F1FAEE] text-[#1D3557]/80 border border-[#A8DADC]/60">
                    Online & in-clinic consults
                  </span>
                </div>

                <button className="mt-auto w-full text-xs sm:text-sm font-medium text-[#F1FAEE] bg-gradient-to-r from-[#457B9D] to-[#1D3557] border border-[#457B9D] py-2.5 rounded-lg hover:shadow-md hover:translate-y-[1px] transition-all duration-300">
                  View Profile & Book
                </button>
              </div>
            </div>
          ))}

          {/* No doctors case */}
          {filterDoc.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#1D3557]/70">
              No doctors found for this speciality yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
