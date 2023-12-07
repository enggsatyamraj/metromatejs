import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.jpeg";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { toggleTheme } from "../slices/themeSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const currentTheme = useSelector((state) => state.theme.mode);
  const [user, setUser] = useState([]);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Routes", href: "/routes" },
    { name: "History", href: "/history" },
    { name: "Help & Contact", href: "/helpandcontact" },
  ];

  //console.log("navbar part", user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDetails = async () => {
      // setLoading(true);
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/getalldetailsofaprofile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      //console.log(data);
      if (data.success) {
        setUser(data.userDetails);
        //console.log(user);
      } else {
        //console.log(data.message);
      }
      // setLoading(false);
    };

    fetchAllDetails();
  }, [token, user]);

  const handleLogout = () => {
    dispatch(setToken(null));
    // localStorage.setItem("token", "");
    localStorage.removeItem("token");
    toast.success("logged out successfully");
    //console.log("logout button token............", token);
    //console.log("logout button user.........", user);
    navigate("/");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <header
      className={`${
        currentTheme === "light" ? "light" : "dark"
      } absolute inset-x-0 top-0 z-50`}
    >
      <nav
        className="flex dark:text-white items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex  dark:text-white lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Metro Mate</span>
            <img
              className="h-[70px] dark:border-2 dark:border-white aspect-sqaure rounded-full"
              src={logo}
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center lg:hidden">
          <div className="flex items-center gap-2">
            {/* <MdOutlineDarkMode/>
            <MdOutlineLightMode/> */}
            <button
              type="button"
              onClick={handleToggleTheme}
              className="text-gray-700 focus:outline-none"
            >
              {currentTheme === "dark" ? (
                <MdOutlineDarkMode className="dark:text-white" size={30} />
              ) : (
                <MdOutlineLightMode size={30} />
              )}
            </button>
            {token == null && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="border-2 border-gray-600 dark:border-gray-50 dark:text-gray-50 rounded-sm mr-2 px-3 py-2 text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
            {user && token !== null && (
              <Link to="/profile">
                <img
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-10 mr-3 w-10 dark:border-2 dark:border-gray-50 rounded-full"
                  src={user?.image}
                  alt="profile picture"
                />
              </Link>
            )}
          </div>
          <button
            type="button"
            className="-m-2.5 dark:gray-50 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 dark:text-gray-50 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href &&
                "border-2 duration-200 transition-all border-gray-600 dark:border-gray-50 rounded-sm px-2 py-1"
              } dark:text-gray-50 text-sm duration-200 transition-all font-semibold leading-6 text-gray-900`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex gap-4 items-center lg:flex-1  lg:justify-end">
          <button
            type="button"
            onClick={handleToggleTheme}
            className="text-gray-700 focus:outline-none"
          >
            {currentTheme === "dark" ? (
              <MdOutlineDarkMode className="dark:text-white" size={30} />
            ) : (
              <MdOutlineLightMode size={30} />
            )}
          </button>
          {user && token !== null && (
            <Link to="/profile">
              <img
                className="h-10 w-10 dark:border-2 dark:border-gray-50 rounded-full"
                src={user?.image}
                alt="profile picture"
              />
            </Link>
          )}
          {token == null && (
            <Link
              to="/login"
              className="border-2 border-gray-600 dark:border-gray-50 dark:text-gray-50 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {token == null && (
            <Link
              to="/signup"
              className="border-2 border-gray-600 rounded-sm dark:border-gray-50 dark:text-gray-50 px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {token !== null && (
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              className="border-2 border-gray-600 rounded-sm dark:border-gray-50 dark:text-gray-50 px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div
          className="lg:hidden dark:bg-slate-950 dark:text-white"
          // open={mobileMenuOpen}
          // onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-slate-950 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  dark:sm:ring-gray-100/10">
            <div className="flex dark:bg-slate-950 dark:text-gray-50 items-center justify-between">
              <div className="-m-1.5 dark:bg-slate-950 dark:text-gray-50 p-1.5 flex items-center gap-3">
                <span className="sr-only">Your Company</span>
                <img
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                  className="h-[60px] rounded-full w-auto"
                  src={logo}
                  alt=""
                />
                <button
                  type="button"
                  onClick={handleToggleTheme}
                  className="text-gray-700 dark:text-white focus:outline-none"
                >
                  {currentTheme === "dark" ? (
                    <MdOutlineDarkMode size={30} />
                  ) : (
                    <MdOutlineLightMode size={30} />
                  )}
                </button>
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="flex gap-5 flex-col space-y-2  py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${
                        location.pathname === item.href &&
                        "border-2 duration-200 transition-all border-gray-600 rounded-sm px-2 py-1"
                      } text-xl duration-200 transition-all font-semibold leading-6 text-gray-900 dark:text-white dark:bg-slate-950`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="h-[1px] w-[100%] dark:bg-gray-50"/>
                <div className="py-6 flex gap-4">
                  {user && user.length > 0 && token !== null && (
                    <Link to="/profile">
                      <img
                        onClick={() => setMobileMenuOpen(false)}
                        className="h-10 w-10 rounded-full"
                        src={user?.image}
                        alt="profile picture"
                      />
                    </Link>
                  )}
                  {token === null && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="border-2 border-gray-600 dark:text-gray-50 dark:border-2 dark:border-gray-50 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
                    >
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  {token === null && (
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="border-2 border-gray-600 rounded-sm dark:border-2 dark:border-gray-50 dark:text-gray-50 px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
                    >
                      Sign in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  {token !== null && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                        navigate("/");
                      }}
                      className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900 dark:border-2  dark:border-gray-50 dark:text-gray-50"
                    >
                      Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
