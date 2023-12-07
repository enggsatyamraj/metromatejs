import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student",
    contactNumber: "",
  });
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      const result = await response.json();
      if (result.success) {
        //console.log(result.message);
        navigate("/login");
        dispatch(setSignupData(userDetails));
        toast.success("Signed Up Successfully");
        // //console.log(userDetails);
      } else {
        //console.log(result.message);
        //console.log(result.error);
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error during registration", err);
    } finally {
      setLoading(false);
    }
  };
  const currentTheme = useSelector((state)=>state.theme.mode);
  return (
    <div className={`${currentTheme==="light" ? "light" : "dark"}`}>
      <div className="dark:bg-slate-950 dark:text-gray-50 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-50 text-gray-900">
            Sign Up
          </h2>
        </div>

        {loading ? (
          <div className="w-[100%] h-[60vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form className="space-y-6" action="#" method="POST"> */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xl font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    autoComplete="given-name"
                    required
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xl font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={userDetails.lastName}
                    autoComplete="family-name"
                    onChange={handleInputChange}
                    required
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl mt-3 font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={userDetails.email}
                  autoComplete="email"
                  onChange={handleInputChange}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl mt-3 font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={userDetails.password}
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xl mt-3 font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={userDetails.confirmPassword}
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="accountType"
                className="block text-xl mt-3 font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Account Type
              </label>
              <div className="mt-2">
                <input
                  readOnly
                  id="accountType"
                  name="accountType"
                  type="text"
                  value={userDetails.accountType}
                  onChange={handleInputChange}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="mt-3 block text-xl font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="Contact number"
                  value={userDetails.contactNumber}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSignup}
                className="flex w-full mt-10 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
            {/* </form> */}

            <p className="mt-10 text-center text-[0.95rem] text-gray-500 font-semibold dark:text-gray-50">
              Already have an account?{" "}
              <Link
                to="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
