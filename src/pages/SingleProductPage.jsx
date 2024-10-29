import React from 'react';
import BgImage from '../../public/Image.png'
import SingleProduct from '../../public/product-1.jpg.png'

const ProductDetail = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80">
        {/* Background Image Container */}
        <div className="absolute inset-0 bg-green-800">
          {/* Image placeholder - replace src with your actual hero image */}
          <img 
            src={BgImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-semibold mb-2">single Product</h1>
            <p className="text-lg">The Best Business IoT Sensor Farm</p>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-8">
            {/* Replace with your actual product image */}
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={SingleProduct}
                alt="Product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-medium mb-4">Organice Delicious Pomegranate</h2>
            
            {/* Price */}
            <div className="text-yellow-500 text-2xl font-medium mb-6">$800</div>
            
            {/* Description */}
            <p className="text-gray-600 mb-8">
              Excepteur sint occaecat cupidatat non proident sunt in culpa qui deserunt
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error et
              voluptatem accusantium doloremque laudantium.
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <input
                type="number"
                defaultValue="1"
                min="1"
                className="w-20 px-3 py-2 border border-gray-300 rounded"
              />
              <button className="bg-yellow-400 text-white px-8 py-2 rounded hover:bg-yellow-500 transition-colors">
                ADD TO CART
              </button>
            </div>

            {/* Categories and Tags */}
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900">Design & Tech</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600">Tags:</span>
                <span className="text-gray-900">Classic, Decor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;