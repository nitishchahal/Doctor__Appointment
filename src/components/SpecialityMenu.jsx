import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaStethoscope, FaSearch } from 'react-icons/fa'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="relative py-16 md:py-20 bg-[#F9FAFB] text-[#2C3333] overflow-hidden rounded-3xl mx-4 md:mx-8 shadow-lg border border-[#CDE4D450]"
    >
      {/* Floating Soft Background Shapes */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 bg-[#CDE4D4] opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-[#94B49F] opacity-30 blur-3xl animate-pulse-slow"></div>

      {/* Inner container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Top section: title + subtitle + stats */}
        <div className="flex flex-col gap-6 md:gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CDE4D4]/40 border border-[#CDE4D4]/70 text-xs font-medium tracking-wide">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#94B49F] text-white text-[10px]">
                <FaStethoscope />
              </span>
              Explore Specialist Categories
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#94B49F] to-[#2C3333]">
              Find by Speciality
            </h1>

            <p className="text-sm md:text-base text-[#2C3333]/75">
              Browse through specialists and connect with the right doctor for your health needs.
              Quickly discover experts by their area of specialization.
            </p>
          </div>

          {/* Right: mini stats + fake search/filter */}
          <div className="w-full md:w-80 space-y-3">
            <div className="flex items-center justify-between gap-3 text-xs md:text-sm">
              <div className="flex flex-col">
                <span className="text-[#2C3333]/60">Available specialities</span>
                <span className="text-lg font-semibold">
                  {specialityData.length}+
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[#2C3333]/60">Consultations covered</span>
                <span className="text-lg font-semibold">Wide range</span>
              </div>
            </div>

            {/* Search / filter bar (UI only for now) */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-[#CDE4D4]/80 px-3 py-2 shadow-sm">
              <FaSearch className="text-[#94B49F] text-sm" />
              <input
                type="text"
                placeholder="Search speciality (e.g. Cardiology)"
                className="w-full bg-transparent outline-none text-xs md:text-sm placeholder:text-[#2C3333]/40"
                readOnly // decorative only; hook into state if you want real search
              />
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#CDE4D4]/80 to-transparent" />

        {/* Grid of specialities */}
        <div className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specialityData.map((item, index) => (
              <Link
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                key={index}
                className="group relative flex flex-col rounded-2xl bg-white/90 border border-[#CDE4D4]/70 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top strip */}
                <div className="h-1.5 bg-gradient-to-r from-[#CDE4D4] to-[#94B49F]" />

                <div className="p-4 flex flex-col gap-3">
                  {/* Icon box */}
                  <div className="relative flex items-center justify-center">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#CDE4D4] to-[#94B49F] rounded-2xl blur-xl opacity-40 group-hover:opacity-80 transition-all"></div>

                    <div className="relative bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-all p-4 flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24">
                      <img
                        className="w-12 sm:w-14 object-contain"
                        src={item.image}
                        alt={item.speciality}
                      />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-[#2C3333]/90 group-hover:text-[#94B49F] transition-colors">
                      {item.speciality}
                    </p>
                    <p className="text-[11px] text-[#2C3333]/60">
                      View doctors specializing in {item.speciality.toLowerCase()} and book an appointment seamlessly.
                    </p>
                  </div>

                  {/* Footer pill */}
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#2C3333]/60">
                    <span className="px-2 py-1 rounded-full bg-[#F9FAFB] border border-[#CDE4D4]/80">
                      Speciality
                    </span>
                    <span className="group-hover:underline">
                      View doctors →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile scroll hint (optional) */}
          <p className="mt-4 text-[11px] text-center text-[#2C3333]/50 md:hidden">
            Tip: Scroll down to explore all specialities.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu

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
