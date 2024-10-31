import React from 'react';
import heroImage from '../../public/Container.png'
import Image1 from '../../public/image-4.jpg.png'
import Image2 from '../../public/image-5.jpg.png'
import Image3 from '../../public/image-6.jpg.png'
import Image4 from '../../public/image-7.jpg.png'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="max-w-5xl relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">About us</h1>
          <p className="text-white text-md">Organic food is very popular and good for health these days.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-yellow-400 transform rotate-45"></div>
              <span className="text-md">About Us</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">We're Best Agriculture<br/> & Organic Firms</h2>
            
            <p className="text-gray-600 mb-8">
              Nam et eros est ut ipsum et accusantium aut doloremque et laudantium. totam
              rem aperiam. eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt
            </p>

            {/* Progress Bars */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Organic Products</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-full bg-yellow-400 rounded" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Healthy Foods</span>
                  <span>89%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-full bg-yellow-400 rounded" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="lg:w-1/2">
  <div className="relative">
    {/* Central White Box */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-white shadow-lg rounded-full w-48 h-48 flex items-center justify-center text-center z-10">
      <p className="font-medium">Agriculture &<br/>Organic Farms</p>
    </div>
    
    {/* Image Grid */}
    <div className="relative grid grid-cols-2 gap-6">
      {/* Top Left - Orange Image */}
      <div className="h-48 mt-4">
        <img 
          src={Image1}
          alt="Orange juice" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      {/* Top Right - Green Smoothie */}
      <div className="h-48 mt-4">
        <img 
          src={Image2}
          alt="Green smoothie" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      {/* Bottom Left - Cabbage */}
      <div className="h-48 -mb-4">
        <img 
          src={Image3}
          alt="Cabbage" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      {/* Bottom Right - Farm */}
      <div className="h-48 mb-4">
        <img 
          src={Image4}
          alt="Farm" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;