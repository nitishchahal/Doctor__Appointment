import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUserCheck,
  FiEdit2,
  FiSave,
} from 'react-icons/fi'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!userData) return null

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 py-14 md:py-16 my-20 bg-gradient-to-br from-[#F1FAEE] via-[#E8F6F3] to-[#A8DADC]/40 rounded-3xl shadow-xl border border-[#A8DADC]/40 overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#A8DADC] blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#457B9D] blur-3xl opacity-20 animate-pulse-slow" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D3557]">
              My Profile
            </h2>
            <p className="text-[#457B9D] mt-2 text-sm">
              View and update your personal information
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#A8DADC]/70 text-[11px] text-[#1D3557]/80">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
              <FiUser />
            </span>
            <span>Keep your profile up to date for better care</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/85 backdrop-blur-sm border border-[#A8DADC] rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Top: Avatar + Name + Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-[#A8DADC]/50">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              {isEdit ? (
                <label htmlFor="image" className="cursor-pointer relative">
                  <img
                    className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-[#A8DADC] shadow-md hover:scale-[1.03] transition-all"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="profile"
                  />
                  <div className="absolute bottom-1 right-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#457B9D] shadow-md">
                    <img
                      className="w-4 invert"
                      src={assets.upload_icon}
                      alt="upload"
                    />
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <img
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-[#A8DADC] shadow-md"
                  src={userData.image}
                  alt="profile"
                />
              )}
            </div>

            {/* Name + Email */}
            <div className="flex-1 flex flex-col gap-3">
              {isEdit ? (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#6b7280] font-medium">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 border-b border-[#A8DADC]">
                    <FiUser className="text-[#94a3b8] text-sm" />
                    <input
                      className="w-full text-xl sm:text-2xl font-medium text-[#1D3557] bg-transparent outline-none py-1 focus:border-[#457B9D]"
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-[#1D3557]">
                    {userData.name}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 text-xs sm:text-sm text-[#457B9D] bg-[#F1FAEE] border border-[#A8DADC]/70 rounded-full px-3 py-1">
                    <FiUserCheck />
                    Profile active
                  </p>
                </div>
              )}

              <div className="mt-2">
                <p className="text-xs text-[#6b7280] font-medium mb-1">
                  Email
                </p>
                <div className="flex items-center gap-2 text-sm text-[#457B9D]">
                  <FiMail className="text-[#94a3b8]" />
                  <span>{userData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-[#457B9D] mb-4 flex items-center gap-2">
              <FiPhone />
              Contact Information
            </h3>

            <div className="grid gap-y-4 text-sm text-[#1D3557]/80">
              {/* Phone */}
              <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                <span className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <FiPhone />
                  Phone
                </span>
                {isEdit ? (
                  <input
                    className="bg-transparent border-b border-[#A8DADC] outline-none focus:border-[#457B9D] py-1 text-sm"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-[#457B9D]">
                    {userData.phone || 'Not added'}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="grid grid-cols-[120px,1fr] gap-3 items-start">
                <span className="flex items-center gap-2 text-xs text-[#6b7280] pt-1">
                  <FiMapPin />
                  Address
                </span>
                {isEdit ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="border-b bg-transparent border-[#A8DADC] focus:border-[#457B9D] outline-none text-sm py-1"
                      placeholder="Line 1"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      className="border-b bg-transparent border-[#A8DADC] focus:border-[#457B9D] outline-none text-sm py-1"
                      placeholder="Line 2"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ) : (
                  <p className="text-[#1D3557]/75 text-sm leading-relaxed">
                    {userData.address.line1 || '—'}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Basic Info */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-[#457B9D] mb-4 flex items-center gap-2">
              <FiUserCheck />
              Basic Details
            </h3>

            <div className="grid gap-y-4 text-sm text-[#1D3557]/80">
              {/* Gender */}
              <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                <span className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <FiUser />
                  Gender
                </span>
                {isEdit ? (
                  <select
                    className="bg-[#F1FAEE] border border-[#A8DADC] rounded-md px-2 py-1 text-sm outline-none focus:border-[#457B9D]"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p>{userData.gender || 'Not Selected'}</p>
                )}
              </div>

              {/* DOB */}
              <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                <span className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <FiCalendar />
                  Birthday
                </span>
                {isEdit ? (
                  <input
                    className="bg-[#F1FAEE] border border-[#A8DADC] rounded-md px-2 py-1 text-sm outline-none focus:border-[#457B9D]"
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p>{userData.dob || 'Not added'}</p>
                )}
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="mt-10 flex justify-center">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white px-10 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
              >
                <FiSave className="text-sm" />
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="inline-flex items-center gap-2 border border-[#457B9D] text-[#1D3557] px-10 py-2.5 rounded-full hover:bg-[#A8DADC]/70 transition-all text-sm sm:text-base"
              >
                <FiEdit2 className="text-sm" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
