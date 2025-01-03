import React, { useEffect } from 'react';
import { Mail, Twitter, Facebook, Instagram, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../slices/userSlices/userApiSlice';

const BlackHeader = () => {
  const {data: cart, refetch} = useGetCartQuery();

  useEffect(() => {
    if(cart) {
      refetch()
    }
  }, [cart, refetch])

  const cartLength = cart?.[0]?.items?.length || 0;

  return (
    <div className="bg-black text-white py-2 ">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail size={14} />
          <span className="text-xs">Marcel@gmail.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <Twitter size={14} className="cursor-pointer hover:text-gray-300" />
          <Facebook size={14} className="cursor-pointer hover:text-gray-300" />
          <Instagram size={14} className="cursor-pointer hover:text-gray-300" />
          
          <Link to='/cart'>
            <div className="relative">
              <ShoppingCart size={14} className="cursor-pointer hover:text-gray-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartLength}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlackHeader;