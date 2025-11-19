import React from 'react'
import { assets } from '../assets/assets'
import { FaHeartbeat, FaCalendarCheck, FaShieldAlt, FaUserMd, FaCheckCircle } from 'react-icons/fa'

const About = () => {
  return (
    <div className='mt-20'>
<div className="relative bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 rounded-2xl px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 md:my-16 shadow-lg overflow-hidden ">

      {/* Floating Soft Background Shapes */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#A8DADC] blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#F1FAEE] blur-3xl opacity-40 animate-pulse-slow"></div>

      <div className="relative z-10 space-y-16 md:space-y-20">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#A8DADC] text-[11px] text-[#1D3557]/80">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
              <FaHeartbeat />
            </span>
            <span>Building a simpler digital healthcare experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D3557] tracking-tight">
            ABOUT <span className="text-[#457B9D] font-bold">US</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#1D3557]/75">
            Prescripto connects people with trusted doctors and clinics through an easy,
            secure, and patient-first digital platform.
          </p>
        </div>

        {/* Main About Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
          {/* Left: Text */}
          <div className="flex-1 space-y-5 text-sm sm:text-[15px] text-[#1D3557]/80 leading-relaxed">
            <p>
              Welcome to{' '}
              <b className="text-[#457B9D]">Prescripto</b>, your trusted partner in managing
              your healthcare needs conveniently and efficiently. We aim to simplify how
              individuals connect with medical professionals.
            </p>
            <p>
              Our platform bridges the gap between patients and healthcare providers,
              making it easy to schedule doctor appointments, track medical visits, and
              manage ongoing medical needs from one secure place.
            </p>

            <div className="space-y-2">
              <b className="text-[#1D3557] text-base flex items-center gap-2">
                <FaCalendarCheck className="text-[#457B9D]" /> Our Vision
              </b>
              <p>
                To provide a seamless healthcare journey for every user, empowering
                individuals with accessible and reliable digital healthcare solutions that
                fit into everyday life.
              </p>
            </div>

            {/* Small bullet list */}
            <div className="grid gap-2 text-xs sm:text-sm mt-3">
              {[
                'Easy appointment booking with verified doctors',
                'Secure handling of your health information',
                'Support for ongoing and follow-up consultations',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-[2px] text-[#457B9D]" size={12} />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8DADC] to-[#457B9D] rounded-2xl blur-2xl opacity-40"></div>
              <img
                className="relative w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-500"
                src={assets.header_img}
                alt="About"
              />
              {/* Small overlay card */}
              <div className="absolute -bottom-4 left-4 right-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/90 border border-[#A8DADC] px-4 py-3 text-xs text-[#1D3557]/85 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#457B9D] flex items-center justify-center text-[#F1FAEE]">
                      <FaUserMd />
                    </div>
                    <div>
                      <p className="font-semibold text-[12px]">120+ Trusted Doctors</p>
                      <p className="text-[11px] text-[#1D3557]/70">
                        Across multiple specializations
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F1FAEE] border border-[#A8DADC] text-[11px]">
                    Live & growing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h2 className="text-center text-xl sm:text-2xl font-semibold text-[#1D3557] mb-6">
            By the <span className="text-[#457B9D] font-bold">Numbers</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-center">
            {[
              { value: '10K+', label: 'Appointments Booked' },
              { value: '120+', label: 'Trusted Doctors' },
              { value: '50+', label: 'Specializations' },
              { value: '98%', label: 'Patient Satisfaction' },
              { value: '24/7', label: 'Support Available' },
              { value: '5+ Years', label: 'Of Service' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/80 border border-[#A8DADC] rounded-2xl py-5 shadow-md hover:shadow-lg transition-all"
              >
                <p className="text-2xl font-bold text-[#457B9D]">{item.value}</p>
                <p className="text-[11px] sm:text-xs text-[#1D3557]/80 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <div className="text-center text-2xl font-semibold text-[#1D3557] mb-8">
            <p>
              WHY <span className="text-[#457B9D] font-bold">CHOOSE US</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'EFFICIENCY',
                desc: 'Streamlined appointment scheduling that fits into your lifestyle.',
                icon: <FaCalendarCheck />,
              },
              {
                title: 'CONVENIENCE',
                desc: 'Access a network of trusted medical professionals anytime, anywhere.',
                icon: <FaHeartbeat />,
              },
              {
                title: 'SECURITY',
                desc: 'Your records and data are protected with strong privacy standards.',
                icon: <FaShieldAlt />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 border border-[#A8DADC] bg-white/80 rounded-2xl px-8 py-10 text-[15px] text-[#1D3557]/80 text-center shadow-sm hover:bg-[#A8DADC]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
              >
                <div className="h-10 w-10 rounded-full bg-[#457B9D] flex items-center justify-center text-[#F1FAEE] text-lg">
                  {item.icon}
                </div>
                <b className="text-[#457B9D] tracking-wide">{item.title}</b>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Banner */}
        <div className="relative mt-4 text-center bg-white/80 border border-[#A8DADC] rounded-2xl p-8 sm:p-10 shadow-md">
          <p className="text-base sm:text-lg text-[#1D3557] font-medium italic">
            "We believe healthcare should be simple, accessible, and built around the patient."
          </p>
        </div>
      </div>
    </div>

    </div>
    
  )
}

export default About

/* Ensure pulse-slow animation in global CSS */
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s infinite ease-in-out;
}
*/
