import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import { logOut } from "../../slices/userSlices/authSlice";
import { useLogoutMutation } from "../../slices/userSlices/userApiSlice";

const NavigationContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleLogout, setToggleLogout] = useState(false);
  const [toggleFarmland, setToggleFarmland] = useState(false);
  const [toggleTrending, setToggleTrending] = useState(false);
  const [logout] = useLogoutMutation()

  const handleLogout = async() => {
    try {
      dispatch(logOut())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
    }

  return (
    <aside className="h-screen w-60 bg-[#1a1a1a] text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Link to='/'>
          <h2 className="text-lg font-medium">AgriOk</h2>
          </Link>
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
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto">
        {/* General Section */}
       

        <div className="px-3 py-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Insights
          </p>
          <nav className="mt-3 space-y-1">
            <Link
              to="/dashboard/farmer"
              className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
            >
              <span className="inline-block w-5 h-5 mr-3">📊</span>
              Insights
            </Link>
          </nav>
        </div>
        
     
        <div className="px-3 py-4">
          <div 
            className="px-3 flex items-center justify-between cursor-pointer group"
            onClick={() => setToggleTrending(!toggleTrending)}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              TRENDING
            </p>
            <FaChevronDown 
              size={12} 
              className={`text-gray-400 transition-transform duration-200 ${
                toggleTrending ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          
          {/* Products Dropdown */}
          {toggleTrending && (
            <nav className="mt-3 space-y-1 pl-3">
              <Link
                to="/dashboard/farmer/trending"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard/farmer/trending'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="inline-block w-5 h-5 mr-3">•</span>
                List
              </Link>
              <Link
                to="/dashboard/farmer/trending/create"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard/farmer/trending/create'
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
     
        <div className="px-3 py-4">
          <div 
            className="px-3 flex items-center justify-between cursor-pointer group"
            onClick={() => setToggleFarmland(!toggleFarmland)}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Farmland
            </p>
            <FaChevronDown 
              size={12} 
              className={`text-gray-400 transition-transform duration-200 ${
                toggleFarmland ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          
          {/* Products Dropdown */}
          {toggleFarmland && (
            <nav className="mt-3 space-y-1 pl-3">
              <Link
                to="/dashboard/farmer/farmland/list"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/dashboard/farmer/product/list'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="inline-block w-5 h-5 mr-3">•</span>
                List
              </Link>
              
            </nav>
          )}
        </div>

       
      </div>
    </aside>
  );
};

export default NavigationContent;