import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-40">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-orange-500 animate-spin"></div>
        {/* Inner spinner */}
        <div className="absolute top-1 left-1 w-10 h-10 rounded-full border-4 border-gray-200 border-t-orange-300 animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;