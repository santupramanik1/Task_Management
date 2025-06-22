import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {toast, ToastContainer} from "react-toastify";
import {
    BACK_BUTTON,
    DANGER_BTN,
    FULL_BUTTON,
    INPUTWRAPPER,
    Inputwrapper,
    personalFields,
    SECTION_WRAPPER,
    securityFields,
} from "../assets/dummy";
import {ChevronLeft, Lock, LogOut, Save, Shield, UserCircle} from "lucide-react";
import axios from "axios";

const API_URL = "https://task-management-2b5f.onrender.com";

export const Profile = ({currentUser, setCurrentUser, onLogout}) => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({name: "", email: ""});
    const [password, setPassword] = useState({current: "", new: "", confirm: ""});

    // GET THE CURRENT USER
    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const {data} = await axios.get(`${API_URL}/api/user/me`, {headers: {Authorization: `Bearer ${token}`}});

            if (data.success) {
                setProfile({name: data.user.name, email: data.user.email});
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("UNABLE TO LOAD PROFILE");
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    // UPDATE THE PROFILE
    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            const {data} = await axios.put(
                `${API_URL}/api/user/profile`,
                {name: profile.name, email: profile.email},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (data.success) {
                setCurrentUser((prev) => ({
                    ...prev,
                    name: profile.name,
                    email: profile.email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name || "User"
                    )}&background=random`,
                }));
                 toast.success("Password change");
                toast.success("Profile Update Successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update Failed");
        }
    };

    // PASSWORD CHANGE
    const changePassword = async (e) => {
        e.preventDefault();

        if (password.new !== password.confirm) {
            return toast.error("Password Didn't match");
        }

        try {
            const token = localStorage.getItem("token");
            const {data} = await axios.put(
                `${API_URL}/api/user/password`,
                {currentPassword: password.current, newPassword: password.new},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (data.success) {
                toast.success("Password change");
                setPassword({current: "", new: "", confirm: ""});
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Password change  Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 border">
            <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
            <div className="max-w-4xl p-6 mx-auto">
                <button className={` ${BACK_BUTTON} cursor-pointer`} onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-5 h-5 mr-1 " />
                    Back to Dashboard
                </button>

                <div className="flex gap-4 mb-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white text-2xl font-bold shadow-md">
                        {profile.name ? profile.name[0].toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-600">Account Settings</h1>
                        <p className="text-gray-500 text-sm">Manage your profile and security settings</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className={SECTION_WRAPPER}>
                        <div className="flex gap-2 mb-6 items-center">
                            <UserCircle className="text-purple-500 w-5 h-5"></UserCircle>
                            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        </div>
                        {/* PERSONAL INFO NAME,EMAIL */}
                        <form onSubmit={saveProfile} className="space-y-4">
                            {personalFields.map(({name, type, placeholder, icon: Icon}) => (
                                <div key={name} className={INPUTWRAPPER}>
                                    <Icon className="text-purple-500 w-5 h-5 mr-2"></Icon>
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        value={profile[name]}
                                        onChange={(e) => setProfile({...profile, [name]: e.target.value})}
                                        className="w-full focus:outline-none text-sm "
                                        required
                                    ></input>
                                </div>
                            ))}
                            <button className={` ${FULL_BUTTON} cursor-pointer`}>
                                <Save className="w-4 h-4 "></Save>
                                Save Changes
                            </button>
                        </form>
                    </section>

                    {/* ANOTHER SECTION */}
                    <div className={SECTION_WRAPPER}>
                        <div className="flex gap-2 mb-6 items-center">
                            <Shield className="text-purple-500 w-5 h-5" />
                            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
                        </div>

                        <form onSubmit={changePassword} className="space-y-4">
                            {securityFields.map(({name, placeholder}) => (
                                <div key={name} className={INPUTWRAPPER}>
                                    <Lock className="text-purple-500 w-5 h-5 mr-2"></Lock>
                                    <input
                                        type="password"
                                        placeholder={placeholder}
                                        value={profile[name]}
                                        onChange={(e) => setPassword({...password, [name]: e.target.value})}
                                        className="w-full focus:outline-none text-sm "
                                        required
                                    ></input>
                                </div>
                            ))}

                            <button className={` ${FULL_BUTTON} cursor-pointer`}>
                                <Shield className="w-4 h-4 "></Shield>
                                Change Password
                            </button>

                            <div className="mt-8 pt-6 border-t border-purple-100">
                                <h3 className="text-red-600 font-semibold mb-4 flex items-center gap-2">
                                    <LogOut className="w-4 h-4"></LogOut>
                                    Danger Zone
                                </h3>
                                <button className={`${DANGER_BTN} cursor-pointer`} onClick={onLogout}>
                                    Logout
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
