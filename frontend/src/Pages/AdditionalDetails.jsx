import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdditionalDetails = () => {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    gender: user?.additionalDetails?.gender,
    about: user?.additionalDetails?.about,
    dateOfBirth: user?.additionalDetails?.dateOfBirth,
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
        "https://metromate-ixmd.onrender.com/api/v1/updateadditionaldetails",
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
        //console.log(user);
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
      <div className="bg-white px-6 dark:bg-slate-950 dark:text-gray-50 lg:px-8 pt-[150px] pb-[50px]">
        <h1 className="text-3xl font-bold dark:text-gray-50 text-gray-700">
          Update Your Additional Details
        </h1>
        <div className="mt-4">
          <label
            htmlFor="gender"
            className="block text-xl font-medium leading-6 dark:text-gray-50 text-gray-900"
          >
            Gender
          </label>
          <div className="mt-2">
            <input
              id="gender"
              name="gender"
              type="text"
              placeholder="Gender"
              onChange={handleInputChange}
              value={userDetails.gender}
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="about"
            className="block mt-3 text-xl font-medium leading-6 dark:text-gray-50 text-gray-900"
          >
            About
          </label>
          <div className="mt-2">
            <input
              id="about"
              name="about"
              type="text"
              placeholder="About"
              onChange={handleInputChange}
              value={userDetails.about}
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="dateOfBirth"
            className="block mt-3 text-xl font-medium leading-6 dark:text-gray-50 text-gray-900"
          >
            Date Of Birth
          </label>
          <div className="mt-2">
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              placeholder="DD/MM/YYYY"
              onChange={handleInputChange}
              value={userDetails.dateOfBirth}
              required
              className="px-3 max-w-[500px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-gray-600 text-white px-3 dark:border-[1px] dark:border-gray-50 py-1 rounded-lg my-4 text-[15px]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
