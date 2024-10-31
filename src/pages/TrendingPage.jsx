import React from 'react';
import Section2 from '../../public/Section2.png'
import Rectange1 from '../../public/Rectangle 32.png'
import Rectange2 from '../../public/Rectangle 35.png'
import { Link } from 'react-router-dom';

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
      <div className="relative h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Section2})`
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-white mb-2">What's trending</h1>
          <p className="text-white text-xs opacity-90">
            Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum
          </p>
        </div>
      </div>

      {/* Container for centered content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trending Header */}
        <div className="py-8 flex items-center gap-2">
          <h2 className="text-lg">Trending</h2>
          <span className="text-gray-500">44</span>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingPosts.map((post) => (
            <Link key={post.id} to={`/trending/${post.id}`}>
            <div  className="flex flex-col mb-14">
              <div className="mb-4">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">{post.dates}</div>
                <h3 className="font-medium">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {post.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;