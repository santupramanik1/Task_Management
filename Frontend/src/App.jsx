import React, {useEffect, useState} from "react";
import {Navigate, Outlet, replace, Route, Routes, useNavigate} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {Dashboard} from "./pages/Dashboard";
import {PendingPage} from "./pages/PendingPage";
import {CompletePage} from "./pages/CompletePage";
import {Profile} from "./components/Profile";

const App = () => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem("currentUser");
        return stored ? JSON.parse(stored) : null;
    });

    // Persisting User Data with useEffect
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    //  HANDLE LOGIN
    const handleAuthSubmit = (data) => {
        const user = {
            email: data.email,
            name: data.name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}&background=random`,
        };
        setCurrentUser(user);
        navigate("/", {replace: true});
    };

    // HANDLE LOGOUT FUNCTIONALITY
    const handleLogout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/login", {replace: true});
    };

    // PROTECTED LAYOUT
    const ProtectedLayout = () => (
        <Layout user={currentUser} onLogout={handleLogout}>
            <Outlet></Outlet>
        </Layout>
    );

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <div className="fixed inset-0 bg-black opacity-100 flex items-center justify-center ">
                        <Login onSubmit={handleAuthSubmit} onSwitchMode={() => navigate("/signup")}></Login>
                    </div>
                }
            ></Route>

            <Route
                path="/signup"
                element={
                    <div className="fixed inset-0 bg-black opacity-100 flex items-center justify-center ">
                        <Signup onSubmit={handleAuthSubmit} onSwitchMode={() => navigate("/login")}></Signup>
                    </div>
                }
            ></Route>

            {/* <Route path="/" element={<Layout user={currentUser} onLogout={handleLogout}></Layout>}></Route> */}

            <Route path="/" element={currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />}>
                <Route index element={<Dashboard />} />
                <Route path="/pending" element={<PendingPage></PendingPage>} />
                <Route path="/complete" element={<CompletePage></CompletePage>} />
                <Route
                    path="/profile"
                    element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />}
                ></Route>
            </Route>

            <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
    );
};

export default App;

