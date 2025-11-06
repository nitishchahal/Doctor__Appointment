import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

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
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTime = formattedTime

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)
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
  }, [docInfo])

  return docInfo ? (
    <div className="bg-gradient-to-b from-[#F1FAEE] to-[#A8DADC]/40 p-6 sm:p-10 md:p-14 rounded-3xl shadow-lg mt-10">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="flex justify-center sm:justify-start">
          <img
            className="bg-[#EAF4F4] w-full sm:max-w-72 rounded-2xl shadow-md"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-[#CDE3E2] rounded-2xl p-8 bg-white shadow-sm">
          <p className="flex items-center gap-2 text-3xl font-semibold text-[#1D3557]">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-3 mt-2 text-[#457B9D]">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full bg-[#F1FAEE] text-[#1D3557]">
              {docInfo.experience}
            </button>
          </div>

          <div className="mt-5">
            <p className="flex items-center gap-1 text-sm font-medium text-[#1D3557]">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">{docInfo.about}</p>
          </div>

          <p className="text-gray-700 font-medium mt-6">
            Appointment fee:{' '}
            <span className="text-[#1D3557] font-semibold">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ----------- */}
      <div className="sm:ml-72 sm:pl-6 mt-6 font-medium text-[#565656]">
        <p className="text-lg text-[#1D3557] font-semibold">Book an Appointment</p>

        {/* Date Selector */}
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-5 pb-2">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-4 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${
                  slotIndex === index
                    ? 'bg-[#A8DADC] text-[#1D3557] shadow-md font-semibold'
                    : 'border border-[#CDE3E2] text-[#457B9D] hover:bg-[#F1FAEE]'
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-5 pb-3">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm flex-shrink-0 px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-[#457B9D] text-white border-transparent shadow-md'
                    : 'text-[#457B9D] border-[#CDE3E2] hover:bg-[#EAF4F4]'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-[#1D3557] text-white text-sm px-10 py-3 rounded-full mt-6 hover:bg-[#457B9D] transition-all shadow-md"
        >
          Confirm Appointment
        </button>
      </div>

      {/* ---------- Related Doctors ----------- */}
      <div className="mt-16">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  ) : null
}

export default Appointment
