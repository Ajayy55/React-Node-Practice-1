import { Navigate, useNavigate } from "react-router-dom";
import "./UserCard.css"; // Import custom CSS for styling
import { useEffect, useState } from "react";
import { PORT } from "../../port/Port";
import axios from "axios";
import { handleError } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";

function UserCard({ data }) {
  const [userData, setuserData] = useState({username:'',mobile:'',email:'',gender:''});
  const navigate = useNavigate();

  useEffect(() => {
    setuserData(data);
  }, [data]);

  // console.log(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogiInfo = { ...userData };
    copyLogiInfo[name] = value;
    setuserData(copyLogiInfo);
    // setuserData({name:e.target.value})
    // console.log(e.target.value);
  };

  const updateUser = async (e) => {
    try {
      e.preventDefault();
      const mob = String(userData.mobile);
      console.log(mob.length);

      if (mob.length != 10) {
        return handleError("Mobile number only have 10 digits !");
      }
      const url = `${PORT}/updateUser/${userData._id}`;
      const response = await axios.patch(url, {
        username: userData.username,
        gender: userData.gender,
        mobile: userData.mobile,
      });
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/user");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: error?.response?.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("update user error ", error);
    }
  };

  return (
    <>
      <div className="card shadow-lg rounded-lg overflow-hidden">
        <div className="card-header bg-primary text-white text-center">
          <h1 className="text-uppercase fs-3 pe-3">{userData?.username}</h1>
        </div>
        <div className="card-body px-5">
          <img src="/abhirr.avif" alt="Profile" className="profile-picture" />
          <p className="title">
            <i className="fa fa-envelope me-3 " aria-hidden="true"></i>
            {userData?.email}
          </p>
          <p className="mobile">
            <i className="fa fa-phone me-3" aria-hidden="true"></i>
            {userData?.mobile}
          </p>

          <button
            className="btn btn-primary mt-3 mb-3 text-center"
            onClick={() => {
              navigate("/resetPassword");
            }}
          >
            Reset Password
          </button>
          <br />
          <button
            className="btn btn-primary mt-3 mb-3 text-center"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        show="true "
      >
        <div className="modal-dialog">
          className
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Change username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    required
                    maxLength={25}
                    value={userData?.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Change mobile number:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="mobile"
                    id="mobile"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={userData?.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label me-3"> Change Gender :</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    className="mx-2"
                    value="male"
                    checked={"male" == userData?.gender}
                    onChange={handleChange}
                  />
                  <label htmlFor="male"> Male </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    className="mx-2"
                    value="female"
                    checked={"female" == userData?.gender}
                    onChange={handleChange}
                  />
                  <label htmlFor="female"> Female </label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    className="mx-2"
                    value="others"
                    checked={"others" == userData?.gender}
                    onChange={handleChange}
                  />
                  <label htmlFor="other"> Others </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={updateUser}
              >
                Update User Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserCard;
