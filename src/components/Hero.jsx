import React from 'react'
import backgroundImage from '../../public/rs-sbg-px → rs-sbg-wrap → slider-7.jpg.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-132px)]">
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
            <Link to='/about'>
            <button className="bg-yellow-400 text-sm text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
              About Us →
            </button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Hero
