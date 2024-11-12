import React from 'react';
import Image1 from '../../public/image-4.jpg.png'
import Image2 from '../../public/image-5.jpg.png'
import Image3 from '../../public/image-6.jpg.png'
import Image4 from '../../public/image-7.jpg.png'
import icon from '../../public/icon-heading.png.png'
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={icon} 
                alt="wheat icon" 
                className="w-6 h-6"
              />
              <span className="text-gray-600">About Us</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">
               AgriOk: Farm for Life
            </h2>
            
            <p className="text-gray-600 mb-8">
            AgriOk believes in farming for the long run—supporting healthier crops, sustainable practices, and empowered farmers. Through precision technology and eco-friendly solutions, AgriOk is transforming agriculture, making farms more resilient, productive, and future-ready.
            </p>
            
            <Link to='/about'>
            <button className="border-2 text-sm border-black px-6 py-3 flex items-center gap-2 hover:bg-gray-100 transition-colors">
              Learn More Us
              <span className="ml-2">→</span>
            </button>
            </Link>
          </div>

          {/* Right Image Grid */}
          <div className="md:w-1/2">
            <div className="relative">
              {/* Center white card with text */}
              <div className="absolute inset-0 flex items-center justify-center">
              <div
                   className="bg-white p-8 rounded-lg shadow-lg z-10 text-center h-48 w-52"
                   style={{
                     borderRadius: "30px", // Custom border radius
                   }}
                 >
                   <h3
                     className="mt-8"
                     style={{
                       fontSize: "20px", // Custom text size
                       fontWeight: "bold", // Custom boldness
                     }}
                   >
                    AgriOk: Farm for Life
                   </h3>
                 </div>

              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top right */}
                <div className="h-52 bg-gray-200 mt-9">
                  <img 
                    src={Image1} 
                    alt="Orange slices" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Top left */}
                <div className="h-52 bg-gray-200 mt-10">
                  <img 
                    src={Image2} 
                    alt="Green smoothie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Bottom right */}
                <div className="h-44 bg-gray-200">
                  <img 
                    src={Image3}
                    alt="Cabbage" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Bottom left */}
                <div className="h-52 bg-gray-200">
                  <img 
                    src={Image4}
                    alt="Farmer with animals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;