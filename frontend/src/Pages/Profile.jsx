import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setToken } from "../slices/authSlice";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { user } = useSelector((state) => state.profile);
  const imageUrl = user?.image;
  //console.log(imageUrl);
  //console.log(user);

  useEffect(() => {
    const fetchAllDetails = async () => {
      setLoading(true);
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
        // dispatch(setToken(null));
      } else {
        //console.log(data.message);
      }
      setLoading(false);
    };

    fetchAllDetails();
  }, []);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/deleteaccount",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      //console.log(data);
      if (data.success) {
        //console.log(user);
        navigate("/");
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.success(data.message);
      } else {
        //console.log(data.message);
      }
    } catch (err) {
      //console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const currentTheme = useSelector((state)=>state.theme.mode);
  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className=" dark:bg-slate-950">
        {loading ? (
          <div className="pt-[100px] pb-10 bg-white dark:bg-slate-950 flex justify-center items-center sm:h-[80vh] h-[100vh]">
            <Spinner width={"100vw"} height={"70vh"} />
          </div>
        ) : (
          <div className="pt-[100px] pb-10 bg-white dark:bg-slate-950 px-6 lg:px-8">
            <div className="w-[100%] sm:min-h-[80vh] gap-2 flex flex-col sm:flex-row">
              <div className="sm:w-[30%] dark:text-gray-50  rounded-lg py-2  ">
                <img
                  src={user?.image}
                  className=" max-w-[150px] dark:border-[1px] dark:border-gray-50 mx-auto rounded-full"
                  alt=""
                />
                <p className="text-center font-semibold text-[20px] w-[80%] mx-auto">
                  {user?.additionalDetails?.about
                    ? user?.additionalDetails?.about
                    : "Hey There, I am using MetroMate"}
                </p>
              </div>
              <div className="sm:w-[70%] dark:text-gray-50 rounded-lg  px-3 ">
                <div className="flex gap-5">
                  <div className="flex flex-col">
                    <p className="block text-xl my-2 font-medium leading-6 dark:text-gray-50 text-gray-900">
                      First Name
                    </p>
                    <input
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                      type="text"
                      value={user?.firstName}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="block text-xl my-2 font-medium leading-6 dark:text-gray-50 text-gray-900">
                      Last Name
                    </p>
                    <input
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                      type="text"
                      value={user?.lastName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="block text-xl mb-2 mt-3 dark:text-gray-50 font-medium leading-6 text-gray-900">
                    Email
                  </p>
                  <input
                    className="px-3 block max-w-[400px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400   focus:ring-2  sm:text-lg sm:leading-6"
                    type="text"
                    value={user?.email}
                    readOnly
                  />
                </div>
                <div className="mt-[50px] border-2 relative dark:text-gray-50 dark:border-gray-50 border-gray-700 rounded-lg my-3 p-3">
                  <div className="absolute bg-gray-800 dark:border-[1px] dark:border-gray-50 dark:text-gray-50 text-gray-100 px-3 py-1 rounded-lg top-[-20px] right-[10px]">
                    Additional Details
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="block text-xl mb-2 dark:text-gray-50 font-medium leading-6 text-gray-900">
                        Date Of Birth
                      </p>
                      <input
                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                        type="text"
                        value={
                          user?.additionalDetails?.dateOfBirth
                            ? user?.additionalDetails?.dateOfBirth
                            : "----not provided----"
                        }
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="block text-xl mb-2 dark:text-gray-50 font-medium leading-6 text-gray-900">
                        Gender
                      </p>
                      <input
                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                        type="text"
                        value={
                          user?.additionalDetails?.gender
                            ? user?.additionalDetails?.gender
                            : "----not provided----"
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="block text-xl my-2 font-medium dark:text-gray-50 leading-6 text-gray-900">
                      About
                    </p>
                    <input
                      className="px-3 block w-fit min-w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2  ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                      type="text"
                      value={
                        user?.additionalDetails?.about
                          ? user?.additionalDetails?.about
                          : "Hey There, I am using MetroMate"
                      }
                      readOnly
                    />
                  </div>
                  <button
                    onClick={() => {
                      navigate("/additionalDetails");
                    }}
                    className="mt-[20px] bg-gray-700 px-3 py-1 dark:border-[1px] dark:border-gray-50 text-gray-50 cursor-pointer rounded-lg"
                  >
                    Update Additional Details
                  </button>
                </div>

                <div className="mt-[50px] border-2 relative dark:border-gray-50 border-gray-700 rounded-lg my-3 p-3">
                  <div className="absolute bg-gray-800 dark:border-[1px] dark:text-gray-50 dark:border-gray-50 text-gray-100 px-3 py-1 rounded-lg top-[-16px] right-[10px]">
                    More Information
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="block text-xl mb-2 font-medium leading-6 dark:text-gray-50 text-gray-900">
                        Total Searches
                      </p>
                      <input
                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                        type="text"
                        value={
                          user.history
                            ? user.history.length
                            : "----Not Searched Anything."
                        }
                        readOnly
                      />
                    </div>
                    {/* <div className="flex flex-col">
                    <p className="block text-xl mb-2 font-medium leading-6 text-gray-900">
                      Gender
                    </p>
                    <input
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                      type="text"
                      value={
                        user?.additionalDetails?.gender
                          ? user?.additionalDetails?.gender
                          : "----not provided----"
                      }
                      readOnly
                    />
                  </div> */}
                  </div>
                  <div className="flex flex-col">
                    <p className="block text-xl my-2 font-medium leading-6 dark:text-gray-50 text-gray-900">
                      About
                    </p>
                    <input
                      className="px-3 block w-fit min-w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2  ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2  sm:text-lg sm:leading-6"
                      type="text"
                      value={
                        user?.additionalDetails?.about
                          ? user?.additionalDetails?.about
                          : "Hey There, I am using MetroMate"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/profileUpdate");
                  }}
                  className="mt-[20px] mb-[10px] bg-gray-700 px-3 py-1 dark:border-[1px] dark:border-gray-50 text-gray-50 cursor-pointer rounded-lg"
                >
                  update Profile
                </button>
                <button
                  onClick={() => {
                    handleDeleteAccount();
                  }}
                  className="mt-[20px] ml-5 mb-[10px] dark:border-[1px] dark:border-gray-50 bg-gray-700 px-3 py-1 text-gray-50 cursor-pointer rounded-lg"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
