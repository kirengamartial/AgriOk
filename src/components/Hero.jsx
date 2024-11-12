import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    // Load YouTube IFrame Player API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(iframeRef.current, {
        videoId: 'gjBFtoruO-I',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3, // Disable video annotations
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: 10,
          showinfo: 0,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            // Hide YouTube logo and other UI elements
            const iframe = event.target.getIframe();
            iframe.style.position = 'absolute';
            iframe.style.top = '50%';
            iframe.style.left = '50%';
            iframe.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Scale up to hide corners
            iframe.style.width = '150%'; // Make video wider to hide UI elements
            iframe.style.height = '150%'; // Make video taller to hide UI elements
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const timeChecker = setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                if (currentTime >= 71) {
                  event.target.seekTo(10);
                }
              }, 100);
              event.target.getIframe().setAttribute('data-interval', timeChecker);
            } else {
              const intervalId = event.target.getIframe().getAttribute('data-interval');
              if (intervalId) clearInterval(intervalId);
            }
          }
        }
      });
    };

    return () => {
      const iframe = iframeRef.current;
      if (iframe) {
        const intervalId = iframe.getAttribute('data-interval');
        if (intervalId) clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-132px)] overflow-hidden">
      {/* YouTube Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div 
          ref={iframeRef}
          className="w-full h-full"
        ></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white p-16 mx-4">
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


// import React, { useRef, useEffect } from 'react';
// import BackgroundVideo from '../../public/video3.mp4';
// import { Link } from 'react-router-dom';

// const Hero = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
    
//     const handleTimeUpdate = () => {
//       if (video.currentTime >= 71) { // 1:11 in seconds
//         video.currentTime = 10; // Start loop back at 0:10
//       }
//     };

//     if (video) {
//       video.currentTime = 10; // Start initially at 0:10
//       video.addEventListener('timeupdate', handleTimeUpdate);
//     }

//     return () => {
//       if (video) {
//         video.removeEventListener('timeupdate', handleTimeUpdate);
//       }
//     };
//   }, []);

//   return (
//     <div className="relative h-[calc(100vh-132px)]">
//       {/* Background Video */}
//       <video 
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover" 
//         src={BackgroundVideo} 
//         autoPlay 
//         loop 
//         muted 
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>
      
//       {/* Hero Content */}
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <div className="text-center text-white  p-16 mx-4 shadow-lg">
//           {/* <p className="text-sm mb-2">Organic Farms</p> */}
//           <h1 className="text-6xl font-bold mb-4 whitespace-nowrap">
//              AgriOk <br/> 
//              Farm for Life
//           </h1>
//           <Link to='/about'>
//             <button className="bg-yellow-400 text-sm text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
//               About Us →
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
