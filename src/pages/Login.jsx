import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1FAEE] via-[#EAF4F4] to-[#DCEEF2]">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/90 backdrop-blur-sm shadow-lg border border-[#E5E7EB] rounded-2xl p-8 w-[90%] sm:w-[420px] flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-semibold text-[#1D3557]">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-[#457B9D] mt-1">
            {state === "Sign Up"
              ? "Sign up to book your appointment"
              : "Login to continue your health journey"}
          </p>
        </div>

        {state === "Sign Up" && (
          <div>
            <label className="text-sm text-[#5E5E5E] font-medium">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-[#DADADA] rounded-lg p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
              type="text"
              required
            />
          </div>
        )}

        <div>
          <label className="text-sm text-[#5E5E5E] font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-[#DADADA] rounded-lg p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
            type="email"
            required
          />
        </div>

        <div>
          <label className="text-sm text-[#5E5E5E] font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-[#DADADA] rounded-lg p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#1D3557] hover:bg-[#457B9D] text-white font-medium py-2.5 rounded-lg transition-all duration-300 mt-2 shadow-md"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="text-center text-sm text-[#5E5E5E] mt-2">
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
  );
};

export default Login;
