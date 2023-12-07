import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/profileSlice";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
    contactNumber: user?.contactNumber || "",
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDetails),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/profile");
        dispatch(setUser(userDetails));
        //console.log("khana")
        //console.log("user updated in ProfileUpdate.jsx part",user);
        // //console.log("profile update",userDetails);
      } else {
        //console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      //console.log(err.message);
      toast.error(err.message);
    }
  };

  const currentTheme = useSelector((state) => state.theme.mode);

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="bg-white px-6 dark:bg-slate-950 lg:px-8 pt-[140px] pb-[40px]">
        <h1 className="text-3xl font-bold dark:text-gray-50 text-gray-700">
          Update Your Additional Details
        </h1>
        <div className="mt-4">
          <label
            htmlFor="firstName"
            className="block text-xl font-medium leading-6 dark:text-gray-50 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
              value={userDetails.firstName}
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="lastName"
            className="block mt-3 text-xl font-medium dark:text-gray-50 leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={userDetails.lastName}
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="email"
            className="block mt-3 text-xl font-medium dark:text-gray-50 leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={userDetails.email}
              required
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="password"
            className="block mt-3 text-xl font-medium dark:text-gray-50 leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={userDetails.password}
              required
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="contactNumber"
            className="block mt-3 text-xl font-medium dark:text-gray-50 leading-6 text-gray-900"
          >
            Contact Number
          </label>
          <div className="mt-2">
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="Contact Number"
              onChange={handleInputChange}
              value={userDetails.contactNumber}
              required
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-gray-600 text-white  px-3 py-2 rounded-lg my-4 font-semibold min-w-[150px] mt-[20px]  text-[16px]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
