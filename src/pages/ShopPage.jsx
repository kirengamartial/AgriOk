import React from 'react';
import product1 from '../../public/product-2-550x550.jpg.png'
import product2 from '../../public/product-3-550x550.jpg.png'
import product3 from '../../public/product-4-550x550.jpg.png'
import product4 from '../../public/product-5-550x550.jpg.png'
import heroImage from '../../public/Section.png' 

const products = [
  {
    id: 1,
    name: '100% Natural Fresh Sea Fish',
    price: '$800',
    category: 'Value Fish',
    image: product1
  },
  {
    id: 2,
    name: 'Green Fresh Apples Organic Foods',
    price: '$600',
    category: 'Organic Finds',
    image: product2
  },
  {
    id: 3,
    name: 'Organics Delicious Cutting Pear',
    price: '$580',
    category: 'Delightful Pick',
    image: product3
  },
  {
    id: 4,
    name: 'Organice Delicious Fresh Banana',
    price: '$900',
    category: 'Delightful Health',
    image: product4
  },
  {
    id: 5,
    name: 'Organice Delicious Fresh Orange',
    price: '$900',
    category: 'Delightful Health',
    image: product3
  },
  {
    id: 6,
    name: 'Organics Delicious Fresh Tomato',
    price: '$1,200',
    category: 'Value Fresh',
    image: product2
  }
];

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Shop Text */}
        <div className="relative z-10 container mx-auto h-full">
          <h1 className="text-4xl font-bold text-white pt-20 pl-4">Shop</h1>
        </div>

        {/* Navigation Bar - positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white">
          <div className="container mx-auto">
            <div className="flex items-center h-12 px-4">
              <span className="text-gray-600 text-sm">Home</span>
              <span className="text-yellow-400 text-sm mx-2">/</span>
              <span className="text-yellow-400 text-sm">Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto py-8">
        {/* Header Info */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500">Showing 1–6 of 9 results</p>
          <select className="border rounded px-4 py-2 text-sm text-gray-600">
            <option>Default sorting</option>
            <option>Sort by price: low to high</option>
            <option>Sort by price: high to low</option>
            <option>Sort by popularity</option>
          </select>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="mb-4 overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-xs text-gray-500 mb-2">{product.category}</div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
              <div className="text-sm text-gray-900">{product.price}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-1 mt-12">
          <button className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;