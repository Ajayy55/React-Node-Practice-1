import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import UserDash from "./pages/User/UserDash";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/User/ResetPassword";
import ChangePassword from "./pages/User/ChangePassword";
import LandingPage from "./pages/Landing/LandingPage";
import LoginProtectedRoutes from "./components/ProtectedRoutes/LoginProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<LoginProtectedRoutes />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/user" element={<UserDash />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
