import React, { useState } from 'react'
import { UserPlus } from 'lucide-react';
import axios from "axios"
import { BUTTONCLASSES, FIELDS, INPUT_WRAPPER, Inputwrapper, MESSAGE_ERROR, MESSAGE_SUCCESS } from "../assets/dummy"

const API_URL = "https://task-management-2b5f.onrender.com"
const INITIAL_FORM_DATA = { name: "", email: "", password: "" }

export const Signup = ({ onSwitchMode }) => {

  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      const  {data}  = await axios.post(`${API_URL}/api/user/register`, formData)
      console.log("Registration Succesfull",data)
      setMessage({ text: "Registration Succesfull you can log in now", type: "success" })
      setFormData(INITIAL_FORM_DATA)
    } catch (error) {
      console.error("Signup Error", error)
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again later.";
      setMessage({ text: errorMsg, type: "error" });
    }
    finally {
      setLoading(false)
    }

  }
  return (
    <div className='fixed inset-0 bg-black opacity-100 flex items-center justify-center'>

      <div className='max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8'>
        <div className='mb-6 text-center'>
          <div className='w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 '>
            <UserPlus className='w-8 h-8 text-white'></UserPlus>
          </div>

          <h2 className='text-2xl font-bold text-gray-800'>
            Create Account
          </h2>

          <p className='text-gray-500 text-sm mt-1'>
            Join TaskFlow to manage your tasks
          </p>
        </div>

        {message.text && (
          <div className={message.type === 'success' ? MESSAGE_SUCCESS : MESSAGE_ERROR}>
            {message.text}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleFormSubmit} className='space-y-4'>
          {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
            <div key={name} className={Inputwrapper}>
              <Icon className="text-purple-500 w-5 h-5 mr-2"></Icon>
              <input type={type} placeholder={placeholder} value={formData[name]} onChange={(e) => setFormData({ ...formData, [name]: e.target.value })} className='w-full focus:outline-none text-sm text-gray-700' required></input>
            </div>
          ))}

          <button type="submit" className={BUTTONCLASSES}>
            {loading ? "Signing up..." : <><UserPlus className='w-4 h-4' /> Sign up</>}
          </button>
        </form>

        <p className='text-center text-sm text-gray-600 mt-6'>
          Already have an account? {' '}

          <button onClick={onSwitchMode} className='text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors'>
            Login
          </button>
        </p>

      </div>
    </div>
  )
}
