import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
    return children;
  } else {
    toast.error("Login Please First");
    //console.log("login in first sir")
    return (
      <>
        return <Navigate to="/login" />;
      </>
    );
  }
};

export default PrivateRoute;
