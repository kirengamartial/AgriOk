import React from 'react';
import Section2 from '../../public/Section2.png';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useGetTrendingQuery } from '../slices/userSlices/userApiSlice';

const TrendingSection = () => {
  const { data: trending, isLoading } = useGetTrendingQuery();

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
            Stay updated with the latest trends and innovations in farming
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
              {trending?.length || 0} articles
            </span>
          </div>
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl" />
                <div className="p-6 bg-white rounded-b-xl">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : trending?.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-gray-500">No trending posts available</p>
          </div>
        ) : (
          // Grid of posts with enhanced cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trending?.map((post) => (
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
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/320'; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
                        : post.content}
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
        )}
      </div>
    </div>
  );
};

export default TrendingSection;