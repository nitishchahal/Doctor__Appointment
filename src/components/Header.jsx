import React from 'react'
import { assets } from '../assets/assets'
import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaVideo } from 'react-icons/fa'

const Header = () => {
  return (
    <div className="relative bg-[#F1FAEE] text-[#1D3557] rounded-3xl 
px-10 md:px-10 lg:px-16 
py-1 md:py-14 pt-24       <!-- added more top padding -->
my-20 mx-14 md:mx-8 
overflow-hidden border border-[#A8DADC]/40 shadow-md">

      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 ">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#A8DADC] opacity-30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-72 h-72 bg-[#457B9D] opacity-30 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-[#A8DADC]/60 to-transparent opacity-50" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 grid gap-10 lg:grid-cols-12 items-center">
        {/* Left side */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8DADC]/30 border border-[#A8DADC]/60 text-xs font-medium tracking-wide">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
              <FaUserMd />
            </span>
            Smart Online Health Platform
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight">
              Your Health,
              <span className="block">Our Responsibility.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#457B9D] to-[#A8DADC]">
                Book Appointments Seamlessly
              </span>
            </h1>

            <p className="text-[#1D3557]/80 max-w-md text-sm md:text-base leading-relaxed">
              Consult certified doctors, manage appointments, and access care from anywhere. 
              Secure, convenient, and built to keep your health on track.
            </p>
          </div>

          {/* Feature chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm border border-[#A8DADC]/40">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-xs">
                <FaCalendarCheck />
              </span>
              <div>
                <p className="font-semibold">Instant Booking</p>
                <p className="text-[11px] opacity-70">Slots in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm border border-[#A8DADC]/40">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A8DADC] text-[#1D3557] text-xs">
                <FaVideo />
              </span>
              <div>
                <p className="font-semibold">Video Consults</p>
                <p className="text-[11px] opacity-70">From home comfort</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm border border-[#A8DADC]/40">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1FAEE] border border-[#457B9D]/50 text-xs">
                <FaShieldAlt />
              </span>
              <div>
                <p className="font-semibold">Secure Records</p>
                <p className="text-[11px] opacity-70">Privacy first</p>
              </div>
            </div>
          </div>

          {/* CTA + profiles */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <div className="flex gap-3">
              <a
                href="#speciality"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-[#F1FAEE] bg-gradient-to-r from-[#457B9D] to-[#1D3557] hover:shadow-xl hover:translate-y-[1px] transition-all duration-300 active:scale-95"
              >
                Book Appointment
                <img className="w-3" src={assets.arrow_icon} alt="arrow" />
              </a>
              <button className="px-6 py-3 rounded-full text-sm font-medium border border-[#A8DADC] bg-white/70 hover:bg-[#A8DADC]/20 transition-all">
                Explore Doctors
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs md:text-sm">
              <img
                className="w-20 md:w-24 opacity-90"
                src={assets.group_profiles}
                alt="group"
              />
              <div>
                <p className="font-semibold">120+ Trusted Doctors</p>
                <p className="text-[11px] md:text-[12px] text-[#1D3557]/70">
                  Verified specialists · 4.9★ average rating
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right side: mini dashboard card */}
        <aside className="lg:col-span-5">
          <div className="relative max-w-md mx-auto">
            {/* Gradient border wrapper */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A8DADC] via-[#457B9D] to-[#1D3557] rounded-3xl opacity-40 blur-sm" />
            <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-xl flex flex-col gap-4 border border-[#A8DADC]/40">
              {/* Doctor row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden border border-[#A8DADC]/60 bg-[#F1FAEE] flex items-center justify-center">
                    <img
                      src={assets.header_img}
                      alt="doctor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold flex items-center gap-1">
                      Dr. Ananya Verma
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    </p>
                    <p className="text-[11px] opacity-70">
                      Hepatologist · 8+ yrs exp.
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold">Next available</p>
                  <p className="opacity-70">Today · 4:30 PM</p>
                </div>
              </div>

              {/* Schedule preview */}
              <div className="rounded-2xl bg-[#F1FAEE] border border-[#A8DADC]/50 p-3 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[13px]">Today&apos;s slots</p>
                    <p className="opacity-70 text-[11px]">Limited seats available</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-white text-[11px] border border-[#A8DADC]/60">
                    6 open
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['10:00 AM', '11:30 AM', '04:30 PM', '06:00 PM'].map((time, idx) => (
                    <button
                      key={time}
                      className={`px-3 py-1 rounded-full text-[11px] border ${
                        idx === 2
                          ? 'bg-[#457B9D] text-[#F1FAEE] border-[#457B9D]'
                          : 'bg-white border-[#A8DADC]/60 text-[#1D3557]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom stats row */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-[#F1FAEE] p-3 border border-[#A8DADC]/50">
                  <p className="text-[11px] opacity-70">Patients served</p>
                  <p className="mt-1 text-sm font-semibold">12k+</p>
                </div>
                <div className="rounded-xl bg-[#F1FAEE] p-3 border border-[#A8DADC]/50">
                  <p className="text-[11px] opacity-70">Response time</p>
                  <p className="mt-1 text-sm font-semibold">&lt; 5 min</p>
                </div>
                <div className="rounded-xl bg-[#F1FAEE] p-3 border border-[#A8DADC]/50">
                  <p className="text-[11px] opacity-70">Satisfaction</p>
                  <p className="mt-1 text-sm font-semibold">4.9★</p>
                </div>
              </div>

              <button className="mt-1 w-full text-xs md:text-sm font-medium rounded-full border border-[#457B9D] py-2 hover:bg-[#457B9D] hover:text-[#F1FAEE] transition-colors">
                View doctor profile &amp; reviews
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Header
