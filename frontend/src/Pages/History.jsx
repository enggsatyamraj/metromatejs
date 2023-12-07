import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { IoTrashBin } from "react-icons/io5";
import Spinner from "../components/Spinner";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  // const loading = useSelector((state) => state.auth.loading);
  // const dispatch = useDispatch();

  const currentTheme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const apiCalling = async () => {
      setLoading(true);
      try {
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

        if (data.success) {
          setHistory(data?.userDetails?.history);
          // toast.success("All History Fetched");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    apiCalling();
  }, [token]);

  const handleDeleteHistory = async () => {
    if (history.length < 1) {
      toast.error("History is already deleted.");
    } else {
      setLoading(true);
      try {
        const response = await fetch(
          "https://metromate-ixmd.onrender.com/api/v1/deletehistory",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          // Clear the history in the state
          setHistory([]);
          toast.success("History Cleared Successfully");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting history:", error);
        toast.error("An error occurred while deleting history");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"} dark:bg-slate-950`}>
      <div className="bg-white dark:bg-slate-950 pt-[100px] px-6 lg-px-8 min-h-[90vh] pb-[40px]">
        {loading ? (
          <div className="flex items-center justify-center sm:h-[60vh] h-[300px]">
            <Spinner width={"100vw"} height={"70vh"} />
          </div>
        ) : history.length > 0 ? (
          <div className="dark:text-gray-50">
            <div className="flex  justify-between">
              <h1 className="text-[2.5rem] font-bold dark:text-gray-50 text-gray-700">History</h1>
              <div
                onClick={handleDeleteHistory}
                className="flex text-xl font-semibold border-[2px] cursor-pointer dark:border-gray-50 border-gray-600 px-3 py- rounded-lg items-center gap-3 w-fit"
              >
                Clear All <IoTrashBin />
              </div>
            </div>
            <div>
              {loading ? (
                <div className="bg-red-800 hidden text-white px-3 py-1">
                  Loading....
                </div>
              ) : (
                history.map((item, index) => {
                  const date = new Date(item.timeStamp);

                  // Format the time using Intl.DateTimeFormat
                  const formattedTime = new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZone: "UTC", // Adjust timezone if needed
                  }).format(date);

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col border-2 border-gray-600 max-w-[600px] rounded-lg px-4 py-3 my-7"
                    >
                      <p className="font-semibold opacity-80">
                        <span className="text-xl font-bold opacity-100 dark:text-gray-50 text-gray-700">
                          Source
                        </span>
                        : {item.source}
                      </p>
                      <p className="font-semibold opacity-80">
                        <span className="text-xl font-bold dark:text-gray-50 opacity-100 text-gray-700">
                          Destination
                        </span>
                        : {item.destination}
                      </p>
                      <p className="absolute right-3 top-[-15px] bg-gray-700 px-3 text-sm font-normal py-1 rounded text-gray-100">
                        {formattedTime}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex  justify-between">
              <h1 className="text-[2.5rem] font-bold dark:text-gray-50 text-gray-700">History</h1>
              <div
                onClick={handleDeleteHistory}
                className="flex text-xl font-semibold border-[2px] dark:border-gray-50 dark:text-gray-50 cursor-pointer border-gray-600 px-3 py- rounded-lg items-center gap-3 w-fit"
              >
                Clear All <IoTrashBin />
              </div>
            </div>
            <div className="w-[100%] h-[70vh] flex items-center justify-center">
              <h1 className="text-2xl text-gray-700 font-bold dark:text-gray-50">No Searches</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
