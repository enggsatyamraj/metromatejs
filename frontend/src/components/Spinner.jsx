import React from 'react';

const Spinner = ({width, height}) => {
  return (
    <div className={`flex items-center w-[${width}] h-[${height}] justify-center`}>
      <div className="border-t-4 border-gray-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Spinner;
