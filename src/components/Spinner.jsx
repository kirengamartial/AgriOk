import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center mt-16  z-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-400/30 border-t-yellow-400 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-yellow-400/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;