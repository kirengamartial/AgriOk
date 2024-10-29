import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa";

const AppAside = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleLogout, setToggleLogout] = useState(false);
  const [toggleProducts, setToggleProducts] = useState(true);

  return (
    <aside className="h-screen w-64 bg-[#1a1a1a] text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Marcel</h2>
          <button 
            onClick={() => setToggleLogout(!toggleLogout)}
            className="text-gray-400 hover:text-white"
          >
            <FaChevronDown size={12} />
          </button>
        </div>
        
        {/* Logout Popup */}
        {toggleLogout && (
          <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-[#262626] ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                onClick={() => {
                  // Add your logout logic here
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto">
        {/* Dashboard Section */}
        <div className="px-3 py-4">
          <p className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Dashboard
          </p>
        </div>
        
        {/* Products Section */}
        <div className="px-3 py-4">
          {/* Products Header with Toggle */}
          <div 
            className="px-3 flex items-center justify-between cursor-pointer group"
            onClick={() => setToggleProducts(!toggleProducts)}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Products
            </p>
            <FaChevronDown 
              size={12} 
              className={`text-gray-400 transition-transform duration-200 ${
                toggleProducts ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          
          {/* Products Dropdown */}
          {toggleProducts && (
            <nav className="mt-3 space-y-1 pl-3">
              <Link
                to="/products/list"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/products/list'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="inline-block w-5 h-5 mr-3">•</span>
                List
              </Link>
              <Link
                to="/products/create"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/products/create'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="inline-block w-5 h-5 mr-3">•</span>
                Create
              </Link>
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppAside;