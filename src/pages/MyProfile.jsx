import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      })

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

  return userData ? (
    <div className="max-w-3xl mx-auto px-8 sm:px-10 md:px-16 py-12 my-20 bg-gradient-to-br from-[#F1FAEE] via-[#E8F6F3] to-[#A8DADC]/40 rounded-3xl shadow-lg border border-[#A8DADC]/40">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#1D3557] tracking-wide">My Profile</h2>
        <p className="text-[#457B9D] mt-2 text-sm">Manage your personal and contact information</p>
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        {isEdit ? (
          <label htmlFor="image">
            <div className="relative cursor-pointer">
              <img
                className="w-40 h-40 object-cover rounded-full border-4 border-[#A8DADC] shadow-md opacity-90 hover:opacity-100 transition-all duration-300"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              {!image && (
                <img
                  className="w-9 absolute bottom-2 right-2 opacity-90"
                  src={assets.upload_icon}
                  alt=""
                />
              )}
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img
            className="w-40 h-40 object-cover rounded-full border-4 border-[#A8DADC] shadow-md"
            src={userData.image}
            alt=""
          />
        )}

        {isEdit ? (
          <input
            className="text-2xl font-medium text-center bg-transparent border-b border-[#A8DADC] outline-none focus:border-[#457B9D] transition-all mt-3"
            type="text"
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            value={userData.name}
          />
        ) : (
          <p className="text-2xl font-semibold text-[#1D3557] mt-3">{userData.name}</p>
        )}
      </div>

      <hr className="border-[#A8DADC]/60 mb-10" />

      {/* Contact Info Section */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-[#457B9D] underline mb-5">
          CONTACT INFORMATION
        </h3>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-[#1D3557]/80">
          <p className="font-medium">Email:</p>
          <p className="text-[#457B9D]">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-transparent border-b border-[#A8DADC] outline-none focus:border-[#457B9D] px-1"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className="text-[#457B9D]">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="bg-transparent border-b border-[#A8DADC] outline-none focus:border-[#457B9D] px-1"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="bg-transparent border-b border-[#A8DADC] outline-none focus:border-[#457B9D] px-1"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </div>
          ) : (
            <p className="text-[#1D3557]/70">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-[#457B9D] underline mb-5">
          BASIC INFORMATION
        </h3>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-[#1D3557]/80">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-[#F1FAEE] border border-[#A8DADC] rounded-md px-3 py-1 outline-none focus:border-[#457B9D]"
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-[#F1FAEE] border border-[#A8DADC] rounded-md px-3 py-1 outline-none focus:border-[#457B9D]"
              type="date"
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-8">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="border border-[#457B9D] text-[#1D3557] px-10 py-3 rounded-full font-medium hover:bg-[#A8DADC]/70 hover:text-[#1D3557] transition-all duration-300"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-[#457B9D] text-[#1D3557] px-10 py-3 rounded-full font-medium hover:bg-[#A8DADC]/70 hover:text-[#1D3557] transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null
}

export default MyProfile
