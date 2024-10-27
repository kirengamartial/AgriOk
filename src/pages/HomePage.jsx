import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../public/rs-sbg-px → rs-sbg-wrap → slider-7.jpg.png';
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const HeaderAndHero = () => {
  return (
    <div>
      {/* Black Top Header */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mail size={16} />
            <span className="text-sm">support@sovirgo.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Twitter size={16} className="cursor-pointer hover:text-gray-300" />
            <Facebook size={16} className="cursor-pointer hover:text-gray-300" />
            <Instagram size={16} className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Main White Header */}
      <header className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4">
            {/* Logo and Navigation grouped together */}
            <div className="flex items-center space-x-6 flex-1">
              <Link to="/" className="text-xl font-bold">
                Marcel
              </Link>

              <nav className="hidden md:flex space-x-6">
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
              </nav>
            </div>

            {/* Right Side - Only Login Button */}
            <div>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <div className="relative h-[calc(100vh-132px)]">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center bg-white rounded-full p-16 mx-4 shadow-lg">
            <p className="text-sm mb-2">Organic Farms</p>
            <h1 className="text-4xl font-bold mb-4 whitespace-nowrap">
              Organic &<br />
              Agriculture<br />
              Farms
            </h1>
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
              About Us →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAndHero;