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
          <div className="lg:w-1/2 mt-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-yellow-400 transform rotate-45"></div>
              <span className="text-md">About Us</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">AgriOk: Farm for Life</h2>
            
            <p className="text-gray-600 mb-8">
              AgriOk believes in farming for the long run—supporting healthier crops, sustainable practices, and empowered farmers. Through precision technology and eco-friendly solutions, AgriOk is transforming agriculture, making farms more resilient, productive, and future-ready.
            </p>

            {/* Core Features Section */}
         
          </div>

          {/* Right Image Grid */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Central White Box */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-white shadow-lg rounded-full w-48 h-48 flex items-center justify-center text-center z-10">
                <p className="font-medium"> AgriOk: Farm for Life</p>
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
      <div className='max-w-5xl mx-auto'>
  <div className='flex justify-center'>
    <h2 className="text-3xl font-bold mb-6 border-b-4 border-yellow-400 pb-2">
      Core Features
    </h2>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-9">
    {/* Feature 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="text-white text-2xl fas fa-chart-line"></i> {/* Icon for monitoring */}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Precision Field Monitoring</h3>
      <p className="text-gray-600">
        With AgriOk’s Real-Time Field Monitoring Sensors, farmers can observe crop health at every stage. The sensors provide critical data on soil and crop conditions, delivering personalized insights for optimized farming.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="text-white text-2xl fas fa-drone"></i> {/* Icon for drones */}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Drone-Enabled Precision Fumigation</h3>
      <p className="text-gray-600">
        AgriOk’s Drone Fumigation Service brings aerial precision to crop care. These drones apply targeted doses of organic pesticides and nutrients exactly where they’re needed, saving resources and ensuring effective treatment for each part of the field.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="text-white text-2xl fas fa-leaf"></i> {/* Icon for eco-friendly */}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Eco-Friendly Crop Solutions</h3>
      <p className="text-gray-600">
        In the Shop section, AgriOk offers organic pesticides and soil enhancers designed to improve yield sustainably. These products empower farmers to combat crop diseases while supporting the environment.
      </p>
    </div>

    {/* Feature 4 */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="text-white text-2xl fas fa-book"></i> {/* Icon for education */}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Educational and Opportunity Hub</h3>
      <p className="text-gray-600">
        The Trending section provides educational content, live demos, and new agricultural opportunities, keeping farmers informed on best practices and industry advancements.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default AboutPage;
