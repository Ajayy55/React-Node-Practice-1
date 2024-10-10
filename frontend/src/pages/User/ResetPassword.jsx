
import React, { useState } from 'react'
import { PORT } from '../../port/Port';
import axios from 'axios';
import { handleError, handleSuccess } from '../../utils/Toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import useCountdown from '../../hooks/useCountdown';

function ResetPassword() {
    const navigate=useNavigate();
    const [userData, setUserData] = useState({ email: '', OTP: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    const [emailFlag, setEmailFlag] = useState(false);
    const [serverOTP, setServerOTP] = useState(null);
    const {start,secondsLeft,minsLeft,ms}=useCountdown(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLogiInfo = { ...userData };
        copyLogiInfo[name] = value;
        setUserData(copyLogiInfo);
    }
//otp session expired
    if(secondsLeft==0){
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Session Expired',
            showConfirmButton: false,
            timer: 1500
            });
            setTimeout(()=>{
                navigate('/user')
                setServerOTP(null)
            },1500)
    }

    //generate Otp
    const sendOTP = async () => {
        setEmailFlag(true);
        // console.log(emailFlag);

        try {
            const url = `${PORT}/sentOTP`;
            const response = await axios.post(url, { email: userData.email });
            console.log(response);

            if (response.status === 200) {
                // handleSuccess(response.data.message);
                Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
                });
                setServerOTP(response.data.OTP);
                start(120)
            }
        } catch (error) {
            console.log("set otp error", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
                });
            // handleError(error.response.data.message);
            setEmailFlag(false);
        }
    }

    //chk otp
    const checkOTP = () => {
        if (serverOTP == userData.OTP) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "OTP matched ...!",
                showConfirmButton: false,
                timer: 1500
                });
            navigate('/changePassword',{state:userData.email})
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "OTP not matched ...!",
                showConfirmButton: false,
                timer: 1500
                });
            
        }

    }
    return (
        <>
        
            <div className="card p-3 border-1 shadow rounded-4">
            <div className="card-header bg-primary text-white text-center rounded">
            <h3 className="text-center fs-5 ">Reset Your Password</h3>
            </div>
                    {
                    emailFlag ? (<> <div className="mb-3">
                                    <input type="email" className="form-control mt-4" disabled placeholder="enter email" name="email" onChange={handleChange} required />
                                     </div>
                                     <p><button className="btn btn-primary" disabled onClick={sendOTP}>Send OTP</button></p>
                                </>  
                                )
                                 :
                                 (
                                 <> <div className="mb-3">
                                    <input type="email" className="form-control mt-4" placeholder="enter email" name="email" onChange={handleChange} required />
                                     </div>
                                    <p><button className="btn btn-primary" onClick={sendOTP}>Send OTP</button></p>
                                 </>
                                 )
                     }
                

               
                {ms?<h5 className='text-danger mt-2 mb-0'>0{minsLeft} : {ms<=9?`0${ms}`:ms}</h5>:""}

                
                {emailFlag ? (<> <div className="mb-3 pt-4">
                                <input type="number" className="form-control" maxLength={4} placeholder="enter OTP" name="OTP" onChange={handleChange} />
                                 </div>
                                <p><button className="btn btn-success" onClick={checkOTP}>Submit OTP</button></p>
                                </> 
                            ) :
                            (<> <div className="mb-3 pt-4">
                                <input type="number" className="form-control" disabled placeholder="enter OTP" name="OTP" onChange={handleChange} />
                                 </div>
                                <p><button className="btn btn-success" disabled onClick={checkOTP}>Submit OTP</button></p>
                                </>
                            )
                     }

                
            </div>
            <ToastContainer />

        </>
    )
}

export default ResetPassword
