import React, { useState } from 'react';
import { handleError, handleSuccess } from '../../utils/Toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { PORT } from '../../port/Port';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2/dist/sweetalert2.js";

function ChangePassword() {
    const navigate=useNavigate();
    const location=useLocation();
    const email=location.state;

    const [userData, setUserData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLogiInfo = { ...userData };
        copyLogiInfo[name] = value;
        setUserData(copyLogiInfo);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (userData.newPassword !== userData.confirmPassword) {
            return handleError('New password and confirm password do not match');
        }

        try {
            const url = `${PORT}/changePassword`;
            const response = await axios.patch(url, {
                email,
                currentPassword: userData.currentPassword,
                newPassword: userData.newPassword,
            });

            if (response.status === 200) {
                // handleSuccess('Password changed successfully');
                // Reset the form
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Password changed successfully..!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                setUserData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                localStorage.removeItem('Token');
                localStorage.removeItem('password');


                navigate('/login')
            }
        } catch (error) {
            // handleError(error.response?.data?.message || 'Error changing password');
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response?.data?.message || 'Error changing password',
                showConfirmButton: false,
                timer: 1500
                });
        }
    };
// console.log('eee',email);

    return (
        <>
            <div className="card p-4 shadow-lg rounded-4">
                <h3 className="text-center mb-4">Change Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            name="currentPassword"
                            value={userData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success" type="submit">
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default ChangePassword;
