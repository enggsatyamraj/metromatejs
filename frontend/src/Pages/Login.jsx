import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
// import LoginComponent from "../components/LoginComponent";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { setToken } from "../slices/authSlice";

const Login = () => {
  const user = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/login",
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
        dispatch(setToken(result?.token));
        //console.log(result.message);
        //console.log(result?.token);
        localStorage.setItem("token", result?.token);
        const userImage = result?.user?.image;
        //console.log(userImage);
        dispatch(setUser(result.user));
        //console.log("login jsx", user);
        navigate("/");
        toast.success("logged in successfully");
      } else {
        //console.log(result.message);
        //console.log(result.error);
        toast.error(result.message);
      }
    } catch (err) {
      //console.log("error during login", err);
      toast.error(err.message);
    }
    setLoading(false);
  };

  const currentTheme = useSelector((state) => state.theme.mode);

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="flex dark:bg-slate-950 dark:text-gray-50 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-50">
            Log In
          </h2>
        </div>

        {loading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <Spinner width={"100vw"} height={"90vh"} />
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form className="space-y-6" action="#" method="POST"> */}
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium leading-6 text-gray-900 dark:text-gray-50"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xl font-medium leading-6 dark:text-gray-50 mt-3 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  value={userDetails.password}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 mt-7 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
            {/* </form> */}

            <p className="mt-10 text-center text-[0.95rem] font-semibold text-gray-500 dark:text-gray-50 ">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
