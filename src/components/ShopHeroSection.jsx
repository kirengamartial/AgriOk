import React from 'react'
import BackgroundImage from '../../public/Background.png';

const HeroSection = () => {
  return (
    <div className="relative h-48 bg-gray-900 mb-8">
        <div className="absolute inset-0">
          <img 
            src={BackgroundImage}
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>
  )
}

export default HeroSection
