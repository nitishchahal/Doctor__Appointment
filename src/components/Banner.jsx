import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaUserMd, FaArrowRight } from 'react-icons/fa'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="relative my-20 mx-4 md:mx-10 rounded-3xl bg-[#F9FAFB] px-6 sm:px-10 md:px-14 py-14 md:py-18 shadow-xl border border-[#CDE4D450] overflow-hidden">
      {/* Floating Gradient Background */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#A8DADC] opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] w-[28rem] h-[28rem] bg-[#457B9D] opacity-20 blur-3xl animate-pulse-slow"></div>

      {/* Inner content container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-5 md:w-1/2">
          {/* Small pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CDE4D4]/50 border border-[#CDE4D4]/80 text-[11px] font-medium tracking-wide w-fit">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-white text-[9px]">
              <FaCalendarAlt />
            </span>
            Start your care journey in minutes
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#1D3557]">
              Book Your Appointment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#457B9D] to-[#A8DADC]">
                With 100+ Trusted Doctors
              </span>
            </h2>

            <p className="text-[#2C3333]/75 text-sm sm:text-base max-w-md leading-relaxed">
              Create your account to access expert medical consultations tailored
              to your health needs — anytime, anywhere.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="rounded-2xl bg-white/90 border border-[#CDE4D4]/70 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-[#2C3333]/60">
                Step 1
              </p>
              <p className="font-semibold mt-1">Create account</p>
              <p className="text-[11px] text-[#2C3333]/65 mt-1">
                Sign up with your basic details in under a minute.
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 border border-[#CDE4D4]/70 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-[#2C3333]/60">
                Step 2
              </p>
              <p className="font-semibold mt-1">Choose a doctor</p>
              <p className="text-[11px] text-[#2C3333]/65 mt-1">
                Filter by speciality, experience, and availability.
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 border border-[#CDE4D4]/70 px-3 py-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-[#2C3333]/60">
                Step 3
              </p>
              <p className="font-semibold mt-1">Book your slot</p>
              <p className="text-[11px] text-[#2C3333]/65 mt-1">
                Confirm your time and get reminders automatically.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2">
            <button
              onClick={() => {
                navigate('/login')
                scrollTo(0, 0)
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white text-sm sm:text-base px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Create Account
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative md:w-1/2 flex justify-center">
          <div className="relative max-w-sm w-full">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#CDE4D4] to-[#94B49F] rounded-3xl blur-2xl opacity-40"></div>

            {/* Main image */}
            <img
              className="relative w-full rounded-3xl drop-shadow-xl"
              src={assets.appointment_img}
              alt="appointment illustration"
            />

            {/* Overlay mini appointment card */}
            <div className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[70%]">
              <div className="rounded-2xl bg-white/95 border border-[#CDE4D4]/80 shadow-lg px-4 py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#457B9D] flex items-center justify-center text-white">
                    <FaUserMd className="text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C3333] text-[12px]">
                      New appointment
                    </p>
                    <p className="text-[11px] text-[#2C3333]/65">
                      Today · 05:30 PM
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#CDE4D4]/90 text-[11px] font-medium text-[#1D3557]">
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

/* Ensure pulse animation exists globally */
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s infinite ease-in-out;
}
*/
