import React from 'react';
import section from '../../public/Section2.png';
import { Calendar, Clock, Share2, Bookmark, MessageCircle, Heart, TrendingUp } from 'lucide-react';
import { useGetSingleTrendingQuery } from '../slices/userSlices/userApiSlice';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const { data: trending, isLoading } = useGetSingleTrendingQuery(id);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section - Kept unchanged */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition duration-700 hover:scale-105"
          style={{
            backgroundImage: `url(${section})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 text-white text-sm mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Featured Article
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            What's trending
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl leading-relaxed">
            Lorem ipsum quod grave ens levt nosce design teipsum gravi leve design nosce te ipsum
          </p>
        </div>
      </div>

      {/* Content Section - Using trending data */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(trending?.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
         
        </div>

        {/* Article Title */}
        <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          {trending?.title}
        </h2>

        {/* Main Image Container */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src={trending?.image}
            alt={trending?.title}
            className="w-full object-cover transform transition duration-500 hover:scale-105"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div className="flex justify-between items-center border-y border-gray-200 py-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 ring-2 ring-yellow-400">
                <img
                  src={trending?.user?.photo || "/api/placeholder/100/100"}
                  alt={trending?.user?.name || "Author"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{trending?.user?.first_name || "Author"}</h3>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>
            
            {/* Social Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {trending?.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              #design
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              #concept
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              #trending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;