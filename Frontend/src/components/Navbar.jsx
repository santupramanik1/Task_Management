import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Settings, Zap } from 'lucide-react';
import { useRef } from 'react';
import { useState } from 'react';

export const Navbar = ({user={},onLogout}) => {

    // for testing
    // const user = {
    //     name: "Santu",
    //     email: "santu700141@gmail.com"
    // }

    const menuRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const nevigate = useNavigate()

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev)
    }

    const handleLogout=()=>{
        onLogout()
        setMenuOpen(false)
    }

    return (
        <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans'>
            <div className='flex justify-between items-center px-4 py-3 md:px-6  max-w-7xl mx-auto'>
                {/* LOGO */}
                <div className='flex items-center gap-2 cursor-pointer group' onClick={() => nevigate("/")}>
                    {/* LOGO */}
                    <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br  from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover::scale-105 transition-all duration-300'>
                        <Zap className='h-6 w-6 text-white' />
                        <div className='absolute -bottom-1 -middle-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping'></div>
                    </div>
                    {/* BRAND */}
                    <span className='text-2xl font-extrabold bg-gradient-to-r  from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide'>TaskPilot</span>
                </div>

                {/* RIGHT SIDE */}
                <div className='flex items-center gap-4 '>
                    <button className='p-2 text-gray-600 hover:text-purple-500 transition-colors duration-300 hover:bg-purple-50 rounded-full' onClick={() => nevigate("/profile")}>
                        <Settings className='h-5 w-5' />
                    </button>

                    {/* USER DROPDOWN  */}
                    <div ref={menuRef} className='relative'>
                        <button onClick={handleMenuToggle} className='flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200'>
                            <div className='relative'>
                                {user?.avatar ?
                                    (<img src={user.avater} alt="avater" className='w-9 h-9 rounded-full shadow-sm'></img>) :
                                    (<div className='w-9 h-9 flex items-center justify-center bg-gradient-to-br  from-fuchsia-500 via-purple-600 text-white font-semibold shadow-md rounded-full' >{user?.name[0]?.toUpperCase() || 'U'}</div>)}

                                <div className='w-3 h-3 absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full border-2 border-white animate-pulse'></div>
                            </div>


                            <div className='text-left hidden md:block'>
                                <p className='text-sm font-medium text-gray-800 '>{user?.name}</p>
                                <p className='text-xs  font-normal text-gray-500 '>{user?.email}</p>
                            </div>

                            <ChevronDown className={`text-gray-500 h-4 w-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""} `} />
                        </button>

                        {menuOpen && (
                            <ul className='absolute top-14 right-0 bg-white w-56 rounded-2xl shadow-xl border-purple-100 z-50 overflow-hidden animate-fadeIn'>
                                <li className='p-2'>
                                    <button onClick={() => { setMenuOpen(false), nevigate("/profile") }} className='w-full px-4 py-2.5 text-left hover:bg-purple-50 text-sm  text-gray-700 transition-colors flex items-center gap-2 group ' role='menuItem'>
                                        <Settings className='w-4 h-4 text-gray-700'></Settings>
                                        Profile Setting
                                    </button>
                                </li>
                                <li className='p-2'>
                                    <button className='w-full px-3 py-2 flex items-center gap-2 text-sm rounded-lg hover:bg-red-50 text-red-600 ' onClick={()=>handleLogout}>
                                        <LogOut className='w-4 h-4' />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
