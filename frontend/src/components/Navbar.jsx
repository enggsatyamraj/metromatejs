import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/authSlice";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState([]);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Routes", href: "/routes" },
    { name: "History", href: "/history" },
    { name: "Help & Contact", href: "/helpandcontact" },
  ];

  console.log("navbar part", user);
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
      console.log(data);
      if (data.success) {
        setUser(data.userDetails);
        console.log(user);
      } else {
        console.log(data.message);
      }
      // setLoading(false);
    };

    fetchAllDetails();
  });

  const handleLogout = () => {
    dispatch(setToken(null));
    toast.success("logged out successfully");
    Navigate("/login");
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Metro Mate</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <div>
            {token === null && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="border-2 border-gray-600 rounded-sm mr-2 px-3 py-2 text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
            {user && token !== null && (
              <Link to="/profile">
                <img
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-10 mr-3 w-10 rounded-full"
                  src={user?.image}
                  alt="profile picture"
                />
                {/* {
                  user?.image ? (<div>hello</div>) : (<img
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-10 w-10 rounded-full"
                    src={user?.image}
                    alt="profile picture"
                  />)
                } */}
              </Link>
            )}
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href &&
                "border-2 duration-200 transition-all border-gray-600 rounded-sm px-2 py-1"
              } text-sm duration-200 transition-all font-semibold leading-6 text-gray-900`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex gap-4 items-center lg:flex-1  lg:justify-end">
          {user && token !== null && (
            <Link to="/profile">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.image}
                alt="profile picture"
              />
            </Link>
          )}
          {token === null && (
            <Link
              to="/login"
              className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {token === null && (
            <Link
              to="/signup"
              className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
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
              className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                    } text-xl duration-200 transition-all font-semibold leading-6 text-gray-900`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex gap-4">
                {user && token !== null && (
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
                    className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
                {token === null && (
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
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
                    className="border-2 border-gray-600 rounded-sm px-2 py-1 text-sm font-semibold leading-6 text-gray-900"
                  >
                    Log out <span aria-hidden="true">&rarr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
