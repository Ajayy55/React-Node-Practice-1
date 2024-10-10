import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function LoginProtectedRoutes() {
    const user=localStorage.getItem("Token") ||sessionStorage.getItem("Token");

    return user?<Navigate to="/user" /> : <Outlet/>;
}

export default LoginProtectedRoutes
