import React from 'react'
import { Link } from 'react-router-dom';

const WhiteHeader = () => {
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
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin Dashboard
                </Link>
                <Link to="/farmer" className="text-gray-600 hover:text-gray-900">
                  Farmer Dashboard
                </Link>
              </nav>
            </div>

            <div>
              <Link to='/login'>
              <button className="bg-yellow-400 text-sm text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
  )
}

export default WhiteHeader
