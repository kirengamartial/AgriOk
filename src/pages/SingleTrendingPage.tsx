import React from 'react';
const BlogPost = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(../../public/Section2.png)`
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-2">What's trending</h1>
          <p className="text-white text-sm opacity-90">
            Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum
          </p>
        </div>
      </div>
      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-12 text-center text-2xl font-medium text-gray-900">
          I try to look at the design from a more conceptual standpoint
        </h2>

        {/* Single Image Container */}
        <div className="mb-12">
          <img
            src="../../public/Rectangle 43.png"
            alt="Concept"
            className="w-full object-contain"
          />
        </div>

        {/* Post Details */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Post Details</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>hosted by</span>
              <span>12-03-2024</span>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200"></div>
              <span className="font-medium">Marcel</span>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;