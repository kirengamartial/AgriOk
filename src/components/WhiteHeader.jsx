import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useLogoutMutation } from '../slices/userSlices/userApiSlice';
import { logOut } from '../slices/userSlices/authSlice';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '../slices/userSlices/userApiSlice';
import image from '../../public/AgriOK Branding-01.png'

const WhiteHeader = () => {
  const {userInfo} = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {data: profile, refetch} = useGetProfileQuery()
  
 useEffect(() => {
  if(profile) {
    refetch()
  }
 }, [])
 
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(logOut());
      setIsProfileOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center py-4">
            <div className="flex items-center space-x-6 flex-1">
              <Link to="/" className="text-xl font-bold">
                <img
                src={image}
                alt='logo'
                className='h-9'
                />
              </Link>

              <nav className="hidden md:flex space-x-6 text-sm">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">
                  Shop
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link to="/trending" className="text-gray-600 hover:text-gray-900">
                  Trending
                </Link>
                {userInfo && userInfo?.isAdmin === true && (
                  <Link to="/dashboard/admin" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                )}
                {userInfo && userInfo?.isAdmin === false && (
                  <Link to="/dashboard/farmer" className="text-gray-600 hover:text-gray-900">
                     Dashboard
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center">
              <button
                className="md:hidden mr-4 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <div className="flex items-center">
                      {profile?.photo ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition-colors">
                          <img 
                            src={profile.photo} 
                            alt={userInfo.first_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-transparent group-hover:border-yellow-400 transition-colors">
                            <User size={16} className="text-gray-500" />
                          </div>
                          <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                            {userInfo.first_name}
                          </span>
                        </div>
                      )}
                      <ChevronDown className="ml-1 text-gray-400 group-hover:text-gray-600" size={16} />
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to='/login'>
                  <button className="bg-yellow-400 text-sm text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
  <div className="md:hidden border-t">
    <div className="px-4 py-2 space-y-2">
      <Link to="/" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
        Home
      </Link>
      <Link to="/shop" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
        Shop
      </Link>
      <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
        About
      </Link>
      <Link to="/trending" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
        Trending
      </Link>
      {/* Admin Dashboard Link */}
      {userInfo && userInfo.isAdmin === true && (
        <Link to="/dashboard/admin" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
          Dashboard
        </Link>
      )}
      {/* Farmer Dashboard Link */}
      {userInfo && userInfo.isAdmin === false && (
        <Link to="/dashboard/farmer" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
          Dashboard
        </Link>
      )}
    </div>
  </div>
)}
    </header>
  );
};

export default WhiteHeader;