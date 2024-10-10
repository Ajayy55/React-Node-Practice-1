import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PORT } from '../../port/Port';
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/Toastify';



function Login() {

    const [rememberMe,setRemeberMe]=useState(false)
    const [formData,SetFormData]=useState({email:'',password:''})
    const navigate=useNavigate();

    useEffect(()=>{

        if(localStorage.getItem("email") || localStorage.getItem("password")){
            console.log(localStorage.getItem("email"));
            
            SetFormData({email:localStorage.getItem("email"),
                        password:localStorage.getItem("password")
                        })
        }
    },[])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copyLogiInfo = { ...formData };
        copyLogiInfo[name] = value;
        SetFormData(copyLogiInfo);    
    }

    
    const handleSubmit=async(e)=>{
        e.preventDefault();
       try {

         const url=`${PORT}/login  `;
         const response= await axios.post(url,formData)
        //  console.log(response);
         if(response?.status===200)
         {
                
            if(rememberMe)
                {
                    localStorage.setItem("Token", response?.data.Token)
                    localStorage.setItem("email",formData.email)
                    localStorage.setItem("password",formData.password)
                }
                 else{
                    sessionStorage.setItem("Token",response?.data?.Token)
                }
            
            handleSuccess(response.data.message);
             setTimeout(()=>{ navigate('/user');},1000)
        }

       } catch (error) {
        console.log('login error ',error);
        handleError(error.response.data.message)
       }
        
    }


    return (
        <>
        <div className="container">
            <center className='display-6 fw-bold'>
                Login
            </center>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label" >Email address</label>
                    <input type="email" className="form-control" placeholder="enter email" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="enter password" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <input type='checkbox' id="remember-me" onChange={()=>{rememberMe? setRemeberMe(false): setRemeberMe(true)}}/>
                    <label htmlFor='remember-me' className='px-2'> Remember Me</label>
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary btn-lg mb-4">Login</button>
                <Link to='/signup'  className='px-5  text-dark'>Don't have account ? Register</Link>

            </form>

        </div>

        <ToastContainer/>   
        </>
    )
}

export default Login
