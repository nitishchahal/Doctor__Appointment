import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import {
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaClock,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Format date: 20_01_2000 => 20 Jan 2000
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    const day = dateArray[0]
    const monthIndex = Number(dateArray[1]) - 1 // month is 1-based in backend
    const year = dateArray[2]
    return `${day} ${months[monthIndex]} ${year}`
  }

  // Get User Appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            response,
            { headers: { token } }
          )
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  // Razorpay payment
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Stripe payment
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-stripe',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="relative mt-20 mx-4 md:mx-8 bg-[#F1FAEE] rounded-3xl px-4 sm:px-8 lg:px-12 py-8 md:py-10 shadow-lg border border-[#A8DADC]/40 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#A8DADC] opacity-30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-72 h-72 bg-[#457B9D] opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-6 md:mb-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8DADC]/25 border border-[#A8DADC]/70 text-[11px] text-[#1D3557]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[#F1FAEE] text-[10px]">
                <FaCalendarCheck />
              </span>
              <span>Your upcoming and past appointments</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1D3557]">
              My Appointments
            </h1>
            <p className="text-xs sm:text-sm text-[#1D3557]/75">
              Manage bookings, payments, and follow-ups in one place.
            </p>
          </div>

          {/* Status legend */}
          <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-[#1D3557]/80">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 border border-[#A8DADC]/60">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span>Upcoming</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 border border-[#A8DADC]/60">
              <span className="h-2 w-2 rounded-full bg-[#eab308]" />
              <span>Payment pending</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 border border-[#A8DADC]/60">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 border border-[#A8DADC]/60">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span>Cancelled</span>
            </div>
          </div>
        </div>

        {/* Appointments List / Empty State */}
        {appointments.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white/90 border border-[#A8DADC]/60 shadow-md p-8 text-center text-sm text-[#1D3557]/75">
            <p className="font-medium text-[#1D3557] mb-2">
              No appointments found
            </p>
            <p className="mb-4">
              You haven&apos;t booked any appointments yet. Browse doctors and
              schedule your first visit.
            </p>
            <button
              onClick={() => navigate('/doctors')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#F1FAEE] bg-gradient-to-r from-[#457B9D] to-[#1D3557] hover:shadow-md hover:translate-y-[1px] transition-all"
            >
              Browse Doctors
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((item, index) => {
              const formattedDate = slotDateFormat(item.slotDate)
              const isPending =
                !item.cancelled && !item.payment && !item.isCompleted
              const isPaid = !item.cancelled && item.payment && !item.isCompleted
              const isCompleted = item.isCompleted
              const isCancelled = item.cancelled && !item.isCompleted

              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/90 border border-[#A8DADC]/60 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-stretch"
                >
                  {/* Doctor image */}
                  <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#A8DADC]/20">
                      <img
                        className="w-full h-full object-cover"
                        src={item.docData.image}
                        alt={item.docData.name}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-xs sm:text-sm text-[#1D3557]/80 flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[#1D3557] text-sm sm:text-base font-semibold">
                        {item.docData.name}
                      </p>
                      <span className="px-2 py-0.5 rounded-full bg-[#F1FAEE] border border-[#A8DADC]/70 text-[11px] text-[#457B9D]">
                        {item.docData.speciality}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#1D3557]/70">
                      <FaMapMarkerAlt className="text-[#457B9D]" />
                      <span>
                        {item.docData.address.line1},{' '}
                        {item.docData.address.line2}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#1D3557]/80">
                      <FaClock className="text-[#457B9D]" />
                      <span className="font-medium">Date &amp; time:</span>
                      <span>
                        {formattedDate} • {item.slotTime}
                      </span>
                    </div>

                    {/* Status pill */}
                    <div className="mt-1">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] bg-[#F1FAEE] border border-green-500 text-green-600">
                          <FaCheckCircle className="text-[10px]" />
                          Completed
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] bg-[#F1FAEE] border border-red-500 text-red-500">
                          <FaTimesCircle className="text-[10px]" />
                          Appointment cancelled
                        </span>
                      )}
                      {isPaid && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] bg-[#F1FAEE] border border-[#A8DADC] text-[#1D3557]">
                          <FaCheckCircle className="text-[10px] text-[#22c55e]" />
                          Payment received
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] bg-[#F1FAEE] border border-[#eab308] text-[#92400e]">
                          <FaClock className="text-[10px]" />
                          Payment pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-end text-xs sm:text-sm text-center">
                    {isPending && payment !== item._id && (
                      <button
                        onClick={() => setPayment(item._id)}
                        className="inline-flex items-center justify-center gap-2 text-[#1D3557] sm:min-w-40 py-2 border border-[#A8DADC] rounded-full bg-[#F1FAEE] hover:bg-[#A8DADC]/25 transition-all duration-300"
                      >
                        <FaCreditCard className="text-[12px] text-[#457B9D]" />
                        Pay Online
                      </button>
                    )}

                    {isPending && payment === item._id && (
                      <>
                        <button
                          onClick={() => appointmentStripe(item._id)}
                          className="sm:min-w-40 py-2 border border-[#A8DADC] rounded-full bg-white hover:bg-[#F1FAEE] transition-all duration-300 flex items-center justify-center"
                        >
                          <img
                            className="max-w-20 max-h-5"
                            src={assets.stripe_logo}
                            alt="Stripe"
                          />
                        </button>
                        <button
                          onClick={() => appointmentRazorpay(item._id)}
                          className="sm:min-w-40 py-2 border border-[#A8DADC] rounded-full bg-white hover:bg-[#F1FAEE] transition-all duration-300 flex items-center justify-center"
                        >
                          <img
                            className="max-w-20 max-h-5"
                            src={assets.razorpay_logo}
                            alt="Razorpay"
                          />
                        </button>
                      </>
                    )}

                    {isPaid && (
                      <button className="sm:min-w-40 py-2 border border-[#A8DADC] rounded-full text-[#1D3557] bg-[#F1FAEE]">
                        Paid
                      </button>
                    )}

                    {isCompleted && (
                      <button className="sm:min-w-40 py-2 border border-green-500 rounded-full text-green-600 bg-white">
                        Completed
                      </button>
                    )}

                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="sm:min-w-40 py-2 border border-red-500 rounded-full text-red-500 bg-white hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        Cancel appointment
                      </button>
                    )}

                    {isCancelled && !item.isCompleted && (
                      <button className="sm:min-w-40 py-2 border border-red-500 rounded-full text-red-500 bg-white">
                        Appointment cancelled
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
