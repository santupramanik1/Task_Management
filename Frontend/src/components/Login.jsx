import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  BUTTONCLASSES,
  Inputwrapper,
} from "../assets/dummy";

const INITIAL_FORM_DATA = { email: "", password: "" };

export const Login = ({ onSubmit, onSwitchMode }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [rememeberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const url = "https://task-management-2b5f.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(`${url}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })

          if (data.success) {
            onSubmit?.({ token, userId, ...data.user })
            toast.success("Session Restored Redirecting ....")
            navigate("/")
          }
          else {
            localStorage.clear()
          }
        } catch (error) {
          localStorage.clear()
        }
      })
    }
  }, [navigate, onSubmit])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!rememeberMe) {
      toast.error("You must unable RememeberMe before login");
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.post(`${url}/api/user/login`, formData);
      if (!data.token) {
        throw new Error(data.message || "Login Failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      setFormData(INITIAL_FORM_DATA);
      onSubmit?.({ token: data.token, userId: data.user.id, ...data.user });

      toast.success("Login Succesfull Redirecting.....");

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    toast.dismiss();
    onSwitchMode();
  };

  // FOR INPUT FIELDS
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: Mail
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: Lock,
      isPassword: true
    }
  ]

  return (
    // <div className="fixed inset-0 bg-black opacity-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
        ></ToastContainer>
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 ">
            <LogIn className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>

          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to TaskFlow
          </p>
        </div>

        {/* {message.text && (
          <div
            className={
              message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR
            }
          >
            {message.text}
          </div>
        )} */}

        {/* FORM */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
            <div key={name} className={Inputwrapper}>
              <Icon className="text-purple-500 w-5 h-5 mr-2"></Icon>
              <input
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                className="w-full focus:outline-none text-sm text-gray-700"
                required
              ></input>

              {isPassword && (
                <button
                  type="button"
                  className="ml-2 text-gray-500 hover:text-purple-500 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          ))}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememeberMe}
              onChange={() => setRememberMe(!rememeberMe)}
              className="h-4 w-4 text-purple-500 border-gray-300 rounded"
              required
            ></input>
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm block text-gray-700"
            >
              Remember Me
            </label>
          </div>

          <button type="submit" className={BUTTONCLASSES} disabled={loading}>
            {loading ? (
              "Log in..."
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Login
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={handleSwitchMode}
            className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    // </div>
  );
};
