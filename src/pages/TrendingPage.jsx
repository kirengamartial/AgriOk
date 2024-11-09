import React from 'react';
import Section2 from '../../public/Section2.png';
import Rectange1 from '../../public/Rectangle 32.png';
import Rectange2 from '../../public/Rectangle 35.png';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

const trendingPosts = [
  {
    id: 1,
    image: Rectange1,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  },
  {
    id: 2,
    image: Rectange2,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  },
  {
    id: 3,
    image: Rectange1,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  },
  {
    id: 4,
    image: Rectange2,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  },
  {
    id: 5,
    image: Rectange1,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  },
  {
    id: 6,
    image: Rectange2,
    title: 'I try to look at the design from a more conceptual standpoint',
    dates: '19 August 2024 · 23 April 2024',
    description: 'Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum'
  }
];

const TrendingSection = () => {
  return (
    <div className="w-full mb-16">
      {/* Hero Section with enhanced overlay */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition duration-500 hover:scale-105"
          style={{
            backgroundImage: `url(${Section2})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 text-white text-sm mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Topics
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's trending
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trending Header */}
        <div className="py-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Trending Posts</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              44 articles
            </span>
          </div>
        </div>

        {/* Grid of posts with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/trending/${post.id}`}
              className="group"
            >
              <article className="flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transform transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.dates}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {post.description}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="flex items-center text-yellow-600 text-sm font-medium group/link">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover/link:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;