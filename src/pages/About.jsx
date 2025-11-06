import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 rounded-2xl px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:my-16 shadow-md'>

      {/* Header */}
      <div className='text-center text-3xl font-semibold text-[#1D3557] mb-10'>
        <p>
          ABOUT <span className='text-[#457B9D] font-bold'>US</span>
        </p>
      </div>

      {/* About Section */}
      <div className='my-12 flex flex-col md:flex-row items-center gap-12'>
        <img
          className='w-full md:max-w-[360px] rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300'
          src={assets.about_image}
          alt='About'
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#1D3557]/80 leading-relaxed text-sm'>
          <p>
            Welcome to <b className='text-[#457B9D]'>Prescripto</b>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className='text-[#1D3557] text-base'>Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center text-2xl font-semibold text-[#1D3557] my-12'>
        <p>
          WHY <span className='text-[#457B9D] font-bold'>CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-stretch mb-10'>
        {[
          {
            title: 'EFFICIENCY',
            desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
          },
          {
            title: 'CONVENIENCE',
            desc: 'Access to a network of trusted healthcare professionals in your area.',
          },
          {
            title: 'PERSONALIZATION',
            desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className='flex-1 border border-[#A8DADC] bg-white/80 rounded-2xl px-10 md:px-16 py-10 sm:py-16 flex flex-col gap-4 text-[15px] text-[#1D3557]/80 text-center mx-2 transition-all duration-500 hover:bg-[#A8DADC]/30 hover:shadow-lg hover:scale-[1.02]'
          >
            <b className='text-[#457B9D]'>{item.title}:</b>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default About
