import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import {SignUpSchema} from './../../schema';
import axios from 'axios'
import { PORT } from '../../port/Port';
import { ToastContainer } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils/Toastify';

const initialValues = {
    username: '',
    email: '',
    mobile: '',
    gender: '',
    qualification: "",
    password: "",
    password1: ""
}

function Signup() {
    const navigate=useNavigate();
    const [qual,setQual]=useState([]);
    const { values, errors, handleBlur, touched,handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema:SignUpSchema,
        onSubmit: async(values) => {
           try {
             const url=`${PORT}/register`;
             const response=await axios.post(url,values);
            //  console.log(response);
                if(response.status===201){
                    handleSuccess(response.data.message)
                    setTimeout(()=>{navigate('/login')},1000)
                }


           } catch (error) {
            console.log('error while Signup ',error);
            handleError(error.response.data.message)
           }
        },
    }
    )

 

   const handleClick=()=>{
    console.log('clicked');
    
   }
// console.log(errors);

    return (
        <>
            <div className="container">
                <center className='display-6 fw-bold mb-3'>Register / Signup </center>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="username" className="form-control" placeholder="enter username"  name="username" maxLength={25} value={values.username} onChange={handleChange} onBlur={handleBlur} />
                        {errors.username&& touched.username ?(<span className='text-danger'>{errors.username}</span>):null}
                     </div>

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email"placeholder="enter email address" maxLength={45} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ?(<span className='text-danger'>{errors.email}</span>):null}

                    </div>


                    <div className="mb-3">
                        <label className="form-label">Mobile number</label>
                        <input type="Number" className="form-control" name="mobile" onwheel="return false;" maxLength={10} placeholder="enter mobile number" value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
                        {errors.mobile&&touched.mobile ?(<span className='text-danger'>{errors.mobile}</span>):null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Gender</label><br />
                        <input type="radio" id="male" name="gender" className='mx-2' value='male' onChange={handleChange}  onBlur={handleBlur} />
                        <label htmlFor='male'> Male  </label>
                        <input type="radio" id="female" name="gender" className='mx-2' value='female' onChange={handleChange} onBlur={handleBlur} />
                        <label htmlFor='female'> Female  </label>
                        <input type="radio" id="other" name="gender" className='mx-2' value='others' onChange={handleChange} onBlur={handleBlur} />
                        <label htmlFor='other'> Others  </label>
                        <br/>{errors.gender&& touched.gender ?(<span className='text-danger'>{errors.gender}</span>):null}
                    </div>

                    <div className="mb-3">
                        <span className='mb-3'>Qualification</span> <br />
                        <input type="checkbox" name="qualification" id="matric"  value="matric" className='mx-1' onChange={handleChange} onBlur={handleBlur} />
                         <label htmlFor='matric'> Matric  </label>
                        <input type="checkbox" name="qualification" id="pm" value="post-matric" className='mx-1' onChange={handleChange} onBlur={handleBlur} />
                         <label htmlFor='pm'> Post Matric  </label>
                        <input type="checkbox" name="qualification" id="graduate" value="graduate" className='mx-1' onChange={handleChange} onBlur={handleBlur} />
                         <label htmlFor='graduate'> Graduate  </label>
                        <input type="checkbox" name="qualification" value="post-graduate"  id="pg" className='mx-1' onChange={handleChange} onBlur={handleBlur} />
                        <label htmlFor='pg'>  Post Graduate  </label>
                        <br/>{errors.qualification&&touched.qualification ?(<span className='text-danger'>{errors.qualification}</span>):null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" maxLength={12} placeholder="enter password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password&&touched.password ?(<span className='text-danger'>{errors.password}</span>):null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Confirm Password</label>
                        <input type="password1" className="form-control" maxLength={12} name="password1" placeholder="confirm password" value={values.password1} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password1&&touched.password1 ?(<span className='text-danger'>{errors.password1}</span>):null}
                    </div>

                    <button type="submit" className="sign-btn btn btn-primary shadow mb-3 px-5">Submit</button>
                    <Link to='/login' className='px-4 text-dark'> Already Registered ? Login</Link>
                </form>
            </div>
            <ToastContainer icon={false} />

        </>
    )
}

export default Signup
