import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, ChevronDown } from 'lucide-react';

const WhiteHeader = () => {
  const {userInfo} = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center py-4">
            <div className="flex items-center space-x-6 flex-1">
              <Link to="/" className="text-xl font-bold">
                AgriOk
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
                {userInfo?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                    Admin Dashboard
                  </Link>
                )}
                {userInfo?.role === 'farmer' && (
                  <Link to="/farmer" className="text-gray-600 hover:text-gray-900">
                    Farmer Dashboard
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                className="md:hidden mr-4 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {userInfo ? (
                <div className="relative">
                  <div
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="text-sm text-gray-600">{userInfo.first_name}</span>
                    <ChevronDown className="ml-1" size={16} />
                  </div>
                  
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
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          // Add your logout logic here
                          setIsProfileOpen(false);
                        }}
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

        {/* Mobile menu */}
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
              {userInfo?.role === 'admin' && (
                <Link to="/admin" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                  Admin Dashboard
                </Link>
              )}
              {userInfo?.role === 'farmer' && (
                <Link to="/farmer" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                  Farmer Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
    </header>
  )
}

export default WhiteHeader