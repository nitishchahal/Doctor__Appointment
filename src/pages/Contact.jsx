import React from 'react'
import { assets } from '../assets/assets'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBriefcase,
  FaClock,
} from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='mt-20'>
      <div className="relative bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/20 rounded-2xl px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20 md:my-16 shadow-xl overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-28 -left-20 w-96 h-96 bg-[#A8DADC] blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-[#F1FAEE] blur-3xl opacity-40 animate-pulse-slow"></div>

      <div className="relative z-10 space-y-16 md:space-y-20">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#A8DADC] text-[11px] text-[#1D3557]/80">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
              <FaEnvelope />
            </span>
            <span>We’d love to hear from you</span>
          </div>
          <div className="text-3xl font-semibold text-[#1D3557]">
            <p>
              CONTACT <span className="text-[#457B9D] font-bold">US</span>
            </p>
          </div>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#1D3557]/75">
            Whether you have a question about appointments, features, pricing, or anything
            else — our team is ready to help.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
          {/* Left: contact details */}
          <div className="flex flex-col justify-center gap-6 text-[#1D3557]/80 text-sm leading-relaxed md:w-1/2">
            <div>
              <p className="font-semibold text-lg text-[#457B9D] mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> OUR OFFICE
              </p>
              <p className="text-[#1D3557]/70 text-sm">
                54709 Willms Station
                <br />
                Suite 350, Washington, USA
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[#457B9D] flex items-center gap-2">
                  <FaPhoneAlt /> Call us
                </p>
                <p className="text-[#1D3557]/70 text-sm">(415) 555-0132</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[#457B9D] flex items-center gap-2">
                  <FaEnvelope /> Email
                </p>
                <p className="text-[#1D3557]/70 text-sm">greatstackdev@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[#457B9D] flex items-center gap-2">
                <FaClock /> Support hours
              </p>
              <p className="text-[#1D3557]/70 text-sm">
                Mon – Sat: 08:00 AM – 10:00 PM
                <br />
                Sun: 09:00 AM – 06:00 PM
              </p>
            </div>

            <div className="pt-2">
              <p className="font-semibold text-lg text-[#457B9D] flex items-center gap-2 mb-1">
                <FaBriefcase /> CAREERS AT PRESCRIPTO
              </p>
              <p className="text-[#1D3557]/70 text-sm mb-3">
                Learn more about opportunities to join our growing team and help build the
                future of digital healthcare.
              </p>

              <button className="w-fit border border-[#457B9D] text-[#1D3557] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#A8DADC] hover:shadow-lg transition-all duration-300">
                Explore Jobs
              </button>
            </div>
          </div>

          {/* Right: image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full md:max-w-[380px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8DADC] to-[#457B9D] rounded-2xl blur-2xl opacity-40"></div>
              <img
                className="relative w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-500"
                src={assets.contact_image}
                alt="Contact"
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#A8DADC] rounded-2xl shadow-lg p-8 sm:p-10 backdrop-blur-sm">
          <h3 className="text-center text-2xl font-semibold text-[#1D3557] mb-2">
            Send us a Message
          </h3>
          <p className="text-center text-xs sm:text-sm text-[#1D3557]/70 mb-8">
            Share your query, feedback, or support request and our team will get back to
            you as soon as possible.
          </p>

          <form className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-[#CDE4D4] rounded-xl outline-none focus:border-[#457B9D] transition bg-white/90 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-[#CDE4D4] rounded-xl outline-none focus:border-[#457B9D] transition bg-white/90 text-sm"
            />
            <input
              type="text"
              placeholder="Subject"
              className="md:col-span-2 p-3 border border-[#CDE4D4] rounded-xl outline-none focus:border-[#457B9D] transition bg-white/90 text-sm"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="md:col-span-2 p-3 border border-[#CDE4D4] rounded-xl outline-none focus:border-[#457B9D] transition bg-white/90 text-sm resize-none"
            ></textarea>

            <button className="md:col-span-2 bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="relative mt-8 rounded-2xl overflow-hidden shadow-lg border border-[#A8DADC] bg-white/70">
          {/* Map header bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#A8DADC]/70 text-xs sm:text-sm text-[#1D3557]/80 bg-[#F1FAEE]/80">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#457B9D]" />
              <span>Find us on the map</span>
            </div>
            <span className="hidden sm:inline text-[#457B9D]">
              54709 Willms Station, Suite 350, Washington, USA
            </span>
          </div>

          <iframe
            className="w-full h-72 md:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094347!2d144.95565111531596!3d-37.81732797975153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1fdf72d%3A0x2fd54ce9b7e50a20!2sMedical%20Center!5e0!3m2!1sen!2sus!4v1665142828913"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic location"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Contact

/* Ensure global pulse animation */
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s infinite ease-in-out;
}
*/
