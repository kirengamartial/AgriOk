import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* SVG Illustration */}
        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 8L16 16M16 8L8 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="mb-4">
          <span className="block text-6xl font-bold text-gray-800 mb-2">404</span>
          <span className="block text-2xl font-semibold text-gray-600">Page Not Found</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8 text-lg">
          Oops! The page you're looking for seems to have gone on vacation. 
          Let's get you back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
          
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Additional Help */}
       

        {/* Visual Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-20" />
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-t from-purple-50 to-transparent rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;