import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Logo from '../assets/logo.png'
import { FiMenu, FiX, FiChevronDown, FiBell, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'All Doctors', path: '/doctors' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#E9F5DB]/90 backdrop-blur-xl border-b border-[#CDE4D4] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Left: Logo + brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-32 sm:w-36 hover:opacity-80 transition-opacity"
          />
          <span className="hidden sm:inline-block text-xs font-medium text-[#2C3333]/70 px-2 py-1 rounded-full border border-[#CDE4D4] bg-white/60">
            Health & Appointments
          </span>
        </div>

        {/* Center: Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#2C3333]">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative pb-1 transition-all hover:text-[#94B49F] ${
                  isActive ? 'text-[#2C3333]' : 'text-[#2C3333]/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 mx-auto h-[2px] rounded-full transition-all ${
                      isActive
                        ? 'w-6 bg-[#94B49F]'
                        : 'w-0 bg-transparent group-hover:w-4'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {token && userData ? (
            <>
              {/* Notification icon (dummy UI) */}
              <button className="hidden md:inline-flex relative items-center justify-center h-9 w-9 rounded-full border border-[#CDE4D4] bg-white/70 hover:bg-white shadow-sm text-[#2C3333]/80 transition-all">
                <FiBell className="text-sm" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#94B49F]" />
              </button>

              {/* User dropdown */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-[#CDE4D4] object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-[#CDE4D4] bg-white/80 flex items-center justify-center text-[#2C3333]/70">
                      <FiUser className="text-sm" />
                    </div>
                  )}
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-semibold text-[#2C3333] leading-none">
                      {userData.name || 'Account'}
                    </span>
                    <span className="text-[10px] text-[#2C3333]/60">
                      View dashboard
                    </span>
                  </div>
                  <FiChevronDown className="w-3 h-3 text-[#2C3333]/70" />
                </div>

                <div className="absolute right-0 top-10 bg-[#F9FAFB] border border-[#CDE4D4] rounded-xl shadow-md py-3 px-4 flex flex-col gap-2 text-sm text-[#2C3333] w-48 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                  <p
                    onClick={() => navigate('/my-profile')}
                    className="hover:text-[#94B49F] cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className="hover:text-[#94B49F] cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <div className="h-px bg-[#CDE4D4]/70 my-1" />
                  <p
                    onClick={logout}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-flex items-center gap-1 border border-[#94B49F] text-[#2C3333] px-6 py-2 rounded-full text-sm bg-white/70 hover:bg-[#CDE4D4]/40 transition-all"
            >
              <FiUser className="text-xs" />
              <span>Create Account</span>
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#CDE4D4] bg-white/70 text-[#2C3333] shadow-sm"
            onClick={() => setShowMenu(true)}
          >
            <FiMenu className="text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity ${
          showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#F9FAFB] shadow-xl z-50 w-[75%] max-w-xs p-6 transform transition-transform duration-500 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-28" />
          </div>
          <button onClick={() => setShowMenu(false)}>
            <FiX className="w-6 h-6 text-[#2C3333]" />
          </button>
        </div>

        {/* Mobile user section */}
        {token && userData ? (
          <div className="mb-6 flex items-center gap-3 p-3 rounded-2xl bg-[#E9F5DB] border border-[#CDE4D4]">
            {userData.image ? (
              <img
                src={userData.image}
                alt="User"
                className="w-9 h-9 rounded-full border border-[#CDE4D4] object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border border-[#CDE4D4] bg-white/80 flex items-center justify-center text-[#2C3333]/70">
                <FiUser className="text-sm" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#2C3333]">
                {userData.name || 'User'}
              </span>
              <span className="text-[11px] text-[#2C3333]/60">
                Manage your appointments
              </span>
            </div>
          </div>
        ) : null}

        {/* Mobile nav links */}
        <ul className="flex flex-col gap-5 text-[#2C3333] font-medium text-base mb-6">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between transition-colors ${
                  isActive ? 'text-[#94B49F]' : 'hover:text-[#94B49F]'
                }`
              }
            >
              <span>{label}</span>
              <span className="h-[1px] flex-1 ml-4 bg-[#CDE4D4]/70" />
            </NavLink>
          ))}
        </ul>

        {/* Mobile auth actions */}
        {token && userData ? (
          <div className="flex flex-col gap-3 text-sm">
            <button
              onClick={() => {
                setShowMenu(false)
                navigate('/my-profile')
              }}
              className="w-full py-2 rounded-full border border-[#CDE4D4] bg-white hover:bg-[#E9F5DB] transition-all"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                setShowMenu(false)
                navigate('/my-appointments')
              }}
              className="w-full py-2 rounded-full border border-[#CDE4D4] bg-white hover:bg-[#E9F5DB] transition-all"
            >
              My Appointments
            </button>
            <button
              onClick={() => {
                setShowMenu(false)
                logout()
              }}
              className="w-full py-2 rounded-full border border-red-200 text-red-500 bg-white hover:bg-red-50 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setShowMenu(false)
              navigate('/login')
            }}
            className="w-full mt-2 py-2.5 rounded-full border border-[#94B49F] bg-[#E9F5DB] text-sm font-medium text-[#2C3333] hover:bg-[#CDE4D4]/70 transition-all"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
