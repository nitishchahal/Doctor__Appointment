import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaUserMd, FaCalendarCheck, FaClock } from 'react-icons/fa'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [showFullAbout, setShowFullAbout] = useState(false) // 👈 new state

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSolts = async () => {
    setDocSlots([])

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTime = formattedTime

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const slotDate = day + '_' + month + '_' + year

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getDoctosData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSolts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docInfo])

  if (!docInfo) return null

  // 🔹 Prepare about text (handles long & short nicely)
  const fullAbout = docInfo.about || ''
  const isLongAbout = fullAbout.length > 220
  const displayedAbout =
    showFullAbout || !isLongAbout
      ? fullAbout
      : fullAbout.slice(0, 220) + '...'

  return (
    <div className="relative mt-20 mx-4 md:mx-8 bg-[#F1FAEE] rounded-3xl px-4 sm:px-8 lg:px-12 py-8 md:py-10 shadow-lg border border-[#A8DADC]/40 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#A8DADC] opacity-30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-72 h-72 bg-[#457B9D] opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header / breadcrumb-ish row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8DADC]/25 border border-[#A8DADC]/70 text-[11px] text-[#1D3557]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
                <FaUserMd />
              </span>
              <span>Appointment booking with a verified specialist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D3557]">
              Book an Appointment
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#1D3557]/80">
            <div className="flex items-center gap-1">
              <FaCalendarCheck className="text-[#457B9D]" />
              <span>Step 1: Choose date</span>
            </div>
            <span className="h-4 w-px bg-[#A8DADC]" />
            <div className="flex items-center gap-1">
              <FaClock className="text-[#457B9D]" />
              <span>Step 2: Pick time & confirm</span>
            </div>
          </div>
        </div>

        {/* ---------- Doctor Details & Booking Layout ----------- */}
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.2fr_1.1fr]">
          {/* Doctor Details */}
          <div className="space-y-5">
            <div className="bg-white/90 border border-[#A8DADC]/60 rounded-2xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row gap-5">
              {/* Image */}
              <div className="flex-shrink-0 flex justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-[#A8DADC]/20">
                  <img
                    className="w-full h-full object-cover"
                    src={docInfo.image}
                    alt={docInfo.name}
                  />
                  {/* Available pill */}
                  {typeof docInfo.available !== 'undefined' && (
                    <div
                      className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-medium bg-[#F1FAEE]/95 border ${
                        docInfo.available
                          ? 'border-[#A8DADC] text-[#1D3557]'
                          : 'border-[#A8DADC]/60 text-[#1D3557]/70'
                      }`}
                    >
                      {docInfo.available ? 'Available' : 'Not Available'}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3">
                <p className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-[#1D3557]">
                  {docInfo.name}{' '}
                  <img className="w-5" src={assets.verified_icon} alt="" />
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#457B9D]">
                  <p>
                    {docInfo.degree} · {docInfo.speciality}
                  </p>
                  <span className="px-2 py-1 rounded-full bg-[#F1FAEE] border border-[#A8DADC]/70 text-[#1D3557] text-[11px]">
                    {docInfo.experience}
                  </span>
                </div>

               

                <p className="text-sm sm:text-base text-[#1D3557]/90 font-medium">
                  Appointment fee:{' '}
                  <span className="text-[#1D3557] font-semibold">
                    {currencySymbol}
                    {docInfo.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-white/90 border border-[#A8DADC]/60 rounded-2xl shadow-md p-5 md:p-6 flex flex-col">
            <p className="text-lg font-semibold text-[#1D3557] flex items-center gap-2 mb-3">
              <FaCalendarCheck className="text-[#457B9D]" />
              Select slot
            </p>

            {/* Date Selector */}
            <div className="text-xs sm:text-sm text-[#1D3557]/80 mb-2">
              Choose a day
            </div>
            <div className="flex gap-3 items-center w-full overflow-x-auto pb-2">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <button
                    type="button"
                    onClick={() => setSlotIndex(index)}
                    key={index}
                    className={`text-center py-3 px-3 min-w-[3.5rem] rounded-2xl cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                      slotIndex === index
                        ? 'bg-gradient-to-b from-[#457B9D] to-[#1D3557] text-[#F1FAEE] shadow-md font-semibold'
                        : 'border border-[#A8DADC]/70 text-[#457B9D] bg-[#F1FAEE]/60 hover:bg-[#A8DADC]/20'
                    }`}
                  >
                    <p className="uppercase">
                      {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                    </p>
                    <p className="mt-0.5 text-sm">
                      {item[0] && item[0].datetime.getDate()}
                    </p>
                  </button>
                ))}
            </div>

            {/* Time Slots */}
            <div className="mt-5">
              <p className="text-xs sm:text-sm text-[#1D3557]/80 mb-2">
                Choose a time
              </p>
              <div className="flex items-center gap-3 w-full overflow-x-auto pb-2">
                {docSlots.length > 0 &&
                  docSlots[slotIndex]?.map((item, index) => (
                    <button
                      type="button"
                      onClick={() => setSlotTime(item.time)}
                      key={index}
                      className={`text-xs sm:text-sm flex-shrink-0 px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        item.time === slotTime
                          ? 'bg-gradient-to-r from-[#457B9D] to-[#1D3557] text-[#F1FAEE] border-transparent shadow-md'
                          : 'text-[#457B9D] border-[#A8DADC]/70 bg-[#F1FAEE] hover:bg-[#A8DADC]/20'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))}
              </div>
            </div>

            <button
              onClick={bookAppointment}
              type="button"
              className="mt-6 bg-gradient-to-r from-[#457B9D] to-[#1D3557] text-white text-sm px-8 py-3 rounded-full hover:shadow-lg hover:translate-y-[1px] transition-all self-start"
            >
              Confirm Appointment
            </button>
          </div>
        </div>

        {/* ---------- Related Doctors ----------- */}
        <div className="mt-16">
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    </div>
  )
}

export default Appointment
