import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import './style.css'
import axios from 'axios';
import { PORT } from '../../port/Port';
import UserCard from './UserCard';
import { useLocation } from 'react-router-dom';

function UserDash() {
  const [data, setData] = useState();
  const fetchUser=async()=>
    {
       const token=localStorage.getItem("Token")||sessionStorage.getItem("Token");
      const decode = jwtDecode(token)
     
      const url=`${PORT}/api/user/${decode.id}`;
    
     const headers={
        headers:{
          Authorization:token,
        },
      }
      const response=await axios.get(url,headers)
      setData(response.data.response);

    }
  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <>
    <UserCard data={data}/>
  </>
  )
}

export default UserDash
