import React from 'react';
import { Mail, Twitter, Facebook, Instagram, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlackHeader = () => {
  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail size={16} />
          <span className="text-sm">Marcel@gmail.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <Twitter size={16} className="cursor-pointer hover:text-gray-300" />
          <Facebook size={16} className="cursor-pointer hover:text-gray-300" />
          <Instagram size={16} className="cursor-pointer hover:text-gray-300" />
          
          <Link to='/cart'>
          <div className="relative">
            <ShoppingCart size={16} className="cursor-pointer hover:text-gray-300" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlackHeader;