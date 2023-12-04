import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { IoTrashBin } from "react-icons/io5";
import { setLoading } from "../slices/profileSlice";
import Spinner from "../components/Spinner";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  // const loading = useSelector((state) => state.auth.loading);
  // const dispatch = useDispatch();

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
          toast.success("All History Fetched");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(true);
      }
    };

    apiCalling();
  }, [token, loading]);

  const handleDeleteHistory = async () => {
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
    }
  };

  return (
    <div className="bg-white mt-[100px] px-6 lg-px-8 min-h-[80vh]">
      {loading ? (
        <Spinner width={"100vw"} height={"70vh"} />
      ) : (
        <div className="">
          <div className="flex  justify-between">
            <h1 className="text-[2.5rem] font-bold text-gray-700">History</h1>
            <div
              onClick={handleDeleteHistory}
              className="flex text-xl font-semibold border-[2px] cursor-pointer border-gray-600 px-3 py- rounded-lg items-center gap-3 w-fit"
            >
              Clear All <IoTrashBin />
            </div>
          </div>
          <div>
            {loading ? (
              <div className="bg-red-800 text-white px-3 py-1">Loading....</div>
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
                    <p className="font-semibold">
                      <span className="text-xl font-bold text-gray-700">
                        Source
                      </span>
                      : {item.source}
                    </p>
                    <p className="font-semibold">
                      <span className="text-xl font-bold text-gray-700">
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
      )}
    </div>
  );
};

export default History;
