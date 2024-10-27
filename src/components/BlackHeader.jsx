import React from 'react'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const BlackHeader = () => {
  return (
    <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mail size={16} />
            <span className="text-sm">support@sovirgo.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Twitter size={16} className="cursor-pointer hover:text-gray-300" />
            <Facebook size={16} className="cursor-pointer hover:text-gray-300" />
            <Instagram size={16} className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>
  )
}

export default BlackHeader
