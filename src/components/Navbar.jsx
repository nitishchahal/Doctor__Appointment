import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#E9F5DB]/90 backdrop-blur-xl border-b border-[#CDE4D4] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
          className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#2C3333]">
          {[
            { label: 'Home', path: '/' },
            { label: 'All Doctors', path: '/doctors' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-all ${
                  isActive
                    ? 'border-[#94B49F] text-[#2C3333]'
                    : 'border-transparent hover:text-[#94B49F] hover:border-[#CDE4D4]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  src={userData.image}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-[#CDE4D4]"
                />
                <img src={assets.dropdown_icon} alt="" className="w-3" />
              </div>
              <div className="absolute right-0 top-12 bg-[#F9FAFB] border border-[#CDE4D4] rounded-xl shadow-md py-3 px-5 flex flex-col gap-3 text-sm text-[#2C3333] w-44 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                <p onClick={() => navigate('/my-profile')} className="hover:text-[#94B49F] cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-[#94B49F] cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-red-500 cursor-pointer">Logout</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block border border-[#94B49F] text-[#2C3333] px-6 py-2 rounded-full text-sm hover:bg-[#CDE4D4]/40 transition-all"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-6 md:hidden cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#F9FAFB] shadow-lg z-40 w-[75%] p-6 transform transition-transform duration-500 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <img
            src={assets.cross_icon}
            alt="close"
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="flex flex-col gap-6 text-[#2C3333] font-medium text-lg">
          {[
            { label: 'Home', path: '/' },
            { label: 'All Doctors', path: '/doctors' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              onClick={() => setShowMenu(false)}
              to={path}
              className="hover:text-[#94B49F] transition-colors"
            >
              {label}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
