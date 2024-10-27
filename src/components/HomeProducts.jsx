import React from 'react';
import product1 from '../../public/product-2-550x550.jpg.png'
import product2 from '../../public/product-3-550x550.jpg.png'
import product3 from '../../public/product-4-550x550.jpg.png'
import product4 from '../../public/product-5-550x550.jpg.png'

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: "100% Natural Fresh Sea Fish",
      category: "Video | Files",
      price: "$850",
      image: product1 
    },
    {
      id: 2,
      name: "Organice Delicious Cutting Pear",
      category: "Design | Tech",
      price: "$980",
      image: product2
    },
    {
      id: 3,
      name: "Organice Delicious Fresh Tomato",
      category: "Video | Files",
      price: "$1,200",
      image: product3
    },
    {
      id: 4,
      name: "Organice Delicious Strawberry",
      category: "Video | Files",
      price: "$965 $800",
      image: product4,
      isOnSale: true
    },
    {
      id: 5,
      name: "100% Natural Fresh Sea Fish",
      category: "Video | Files",
      price: "$850",
      image: product1 
    },
    {
      id: 6,
      name: "Organice Delicious Cutting Pear",
      category: "Design | Tech",
      price: "$980",
      image: product2
    },
    {
      id: 7,
      name: "Organice Delicious Fresh Tomato",
      category: "Video | Files",
      price: "$1,200",
      image: product3
    },
    {
      id: 8,
      name: "Organice Delicious Strawberry",
      category: "Video | Files",
      price: "$965 $800",
      image: product4,
      isOnSale: true
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-yellow-400">🌾</span>
          <span className="text-gray-600">Popular Products</span>
          <span className="text-yellow-400">🌾</span>
        </div>
        <h2 className="text-3xl font-semibold">Our Shop</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              {product.isOnSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  -16%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow">
              <span className="text-gray-500 text-sm mb-1">{product.category}</span>
              <h3 className="text-gray-900 font-medium mb-2">{product.name}</h3>
              <span className="text-gray-900">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;