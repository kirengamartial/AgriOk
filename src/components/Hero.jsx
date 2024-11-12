import React, { useRef, useEffect } from 'react';
import BackgroundVideo from '../../public/video3.mp4';
import { Link } from 'react-router-dom';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video.currentTime >= 71) { // 1:11 in seconds
        video.currentTime = 10; // Start loop back at 0:10
      }
    };

    if (video) {
      video.currentTime = 10; // Start initially at 0:10
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-132px)]">
      {/* Background Video */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover" 
        src={BackgroundVideo} 
        autoPlay 
        loop 
        muted 
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white  p-16 mx-4 shadow-lg">
          {/* <p className="text-sm mb-2">Organic Farms</p> */}
          <h1 className="text-6xl font-bold mb-4 whitespace-nowrap">
             AgriOk <br/> 
             Farm for Life
          </h1>
          <Link to='/about'>
            <button className="bg-yellow-400 text-sm text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
              About Us →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
