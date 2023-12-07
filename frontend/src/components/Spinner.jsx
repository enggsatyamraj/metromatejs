import React from "react";
import { useSelector } from "react-redux";

const Spinner = ({ width, height }) => {
  const currentTheme = useSelector((state) => state.theme.mode);
  return (
  <div className={`${currentTheme==="light" ? "light" : "dark"}`}>
      <div
        className={`flex items-center w-[${width}] h-[${height}] justify-center`}
      >
        <div className="border-t-4 border-gray-500 border-solid dark:border-gray-50 rounded-full h-12 w-12 animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
