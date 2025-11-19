import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi"

const Login = () => {
  const [state, setState] = useState("Sign Up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem("token", data.token)
          setToken(data.token)
          toast.success("Account created successfully!")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem("token", data.token)
          setToken(data.token)
          toast.success("Login successful!")
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    if (token) navigate("/")
  }, [token, navigate])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1FAEE] via-[#EAF4F4] to-[#DCEEF2] overflow-hidden mt-20 rounded-md">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 bg-[#A8DADC] blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-[-5rem] right-[-5rem] w-80 h-80 bg-[#457B9D] blur-3xl opacity-30" />

      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white/90 backdrop-blur-sm shadow-xl border border-[#E5E7EB] rounded-2xl px-6 py-7 sm:px-8 sm:py-8 w-[90%] max-w-[440px] flex flex-col gap-5"
      >
        {/* Top badge */}
        <div className="flex justify-center mb-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1FAEE] border border-[#A8DADC]/70 text-[11px] text-[#1D3557]/80">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-white text-[10px]">
              <FiUser />
            </span>
            <span>
              {state === "Sign Up"
                ? "Create your Prescripto account"
                : "Login to your Prescripto account"}
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-1">
          <h2 className="text-2xl font-semibold text-[#1D3557]">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-[#457B9D] mt-1">
            {state === "Sign Up"
              ? "Sign up to book your appointment"
              : "Login to continue your health journey"}
          </p>
        </div>

        {/* Switch tabs */}
        <div className="flex items-center justify-center gap-2 text-xs mt-1">
          <button
            type="button"
            onClick={() => setState("Login")}
            className={`px-4 py-1.5 rounded-full border text-[11px] ${
              state === "Login"
                ? "bg-[#1D3557] text-white border-[#1D3557]"
                : "bg-white text-[#1D3557] border-[#D1D5DB]"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setState("Sign Up")}
            className={`px-4 py-1.5 rounded-full border text-[11px] ${
              state === "Sign Up"
                ? "bg-[#1D3557] text-white border-[#1D3557]"
                : "bg-white text-[#1D3557] border-[#D1D5DB]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-3 flex flex-col gap-4 ">
          {state === "Sign Up" && (
            <div className="text-sm">
              <label className="text-xs text-[#5E5E5E] font-medium">
                Full Name
              </label>
              <div className="mt-1 flex items-center gap-2 border border-[#DADADA] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#A8DADC]">
                <FiUser className="text-[#94A3B8] text-sm" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full text-sm outline-none bg-transparent"
                  type="text"
                  required
                />
              </div>
            </div>
          )}

          <div className="text-sm">
            <label className="text-xs text-[#5E5E5E] font-medium">Email</label>
            <div className="mt-1 flex items-center gap-2 border border-[#DADADA] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#A8DADC]">
              <FiMail className="text-[#94A3B8] text-sm" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full text-sm outline-none bg-transparent"
                type="email"
                required
              />
            </div>
          </div>

          <div className="text-sm">
            <label className="text-xs text-[#5E5E5E] font-medium">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 border border-[#DADADA] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#A8DADC]">
              <FiLock className="text-[#94A3B8] text-sm" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full text-sm outline-none bg-transparent"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#94A3B8] hover:text-[#1D3557] transition-colors text-sm"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#1D3557] hover:bg-[#457B9D] text-white font-medium py-2.5 rounded-lg transition-all duration-300 mt-1 shadow-md"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Small helper text */}
        <div className="text-center text-[11px] text-[#9CA3AF] mt-1">
          By continuing, you agree to our Terms & Privacy Policy.
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <span className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-[11px] text-[#9CA3AF]">or</span>
          <span className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {/* Bottom switch text */}
        <div className="text-center text-sm text-[#5E5E5E] mt-1">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[#1D3557] font-medium hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#1D3557] font-medium hover:underline cursor-pointer"
              >
                Sign up now
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
