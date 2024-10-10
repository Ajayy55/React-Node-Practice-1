import React, { useEffect, useState } from "react";
import "./style.css";
import { jwtDecode } from "jwt-decode";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { handleError } from "../../utils/Toastify";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2/dist/sweetalert2.js";


function Navbar() {
  const [TokenExp, SetTokenExp] = useState(null);
  const navigate = useNavigate();
  const token =
    localStorage.getItem("Token") || sessionStorage.getItem("Token");

  function myStopFunction(stopCheck) {
    clearInterval(stopCheck);
    navigate("/login");
    localStorage.removeItem("Token");
    sessionStorage.removeItem("Token");
  }

  const checkTokenExpiry = () => {
    if (token) {
      SetTokenExp(token);
      const decode = jwtDecode(token);
      const stopCheck = setInterval(() => {
        // console.log('now', Math.round((Date.now() / 1000)));
        // console.log('decode', decode.exp);
        if (decode.exp < Math.round(Date.now() / 1000)) {
          console.log("expired");
          SetTokenExp(null);
          myStopFunction(stopCheck);
        }
      }, 5000);
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, [token]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loged Out!",
          text: "You have been Logged Out.",
          icon: "success"
        });
        localStorage.removeItem("Token");
        sessionStorage.removeItem("Token");
        SetTokenExp(null)
        navigate('/login')
      }
    });
  };

  return (
    <>
      <nav className=" navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid nav-container">
          <a className="navbar-brand fw-bold" href="#">
            Coder's Ponit
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end mx-5"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              {token ? (
                <>
                  <Link
                    to="/"
                    className="nav-link active me-5"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </Link>

                  <Link to="/about" className="nav-link me-5" href="#">
                    About
                  </Link>

                  <Link
                    to="/login"
                    className="nav-link me-5"
                    href="#"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>

                  <Link to="/user">
                    <FaUserCircle className="m-2 " />
                  </Link>
                </>
              ) : (
                // <Link to="/login" className="nav-link" href="#">
                //   Login
                // </Link>
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
