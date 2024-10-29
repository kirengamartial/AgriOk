import React, { useState, useMemo } from 'react';
import product1 from '../../public/product-2-550x550.jpg.png'
import product2 from '../../public/product-3-550x550.jpg.png'
import product3 from '../../public/product-4-550x550.jpg.png'
import product4 from '../../public/product-5-550x550.jpg.png'
import heroImage from '../../public/Section.png'
import { Link } from 'react-router-dom';

// Extended products array with more items
const products = [
  {
    id: 1,
    name: '100% Natural Fresh Sea Fish',
    price: 800,
    priceDisplay: '$800',
    category: 'Value Fish',
    image: product1
  },
  {
    id: 2,
    name: 'Green Fresh Apples Organic Foods',
    price: 600,
    priceDisplay: '$600',
    category: 'Organic Finds',
    image: product2
  },
  {
    id: 3,
    name: 'Organics Delicious Cutting Pear',
    price: 580,
    priceDisplay: '$580',
    category: 'Delightful Pick',
    image: product3
  },
  {
    id: 4,
    name: 'Organice Delicious Fresh Banana',
    price: 900,
    priceDisplay: '$900',
    category: 'Delightful Health',
    image: product4
  },
  {
    id: 5,
    name: 'Organice Delicious Fresh Orange',
    price: 900,
    priceDisplay: '$900',
    category: 'Delightful Health',
    image: product3
  },
  {
    id: 6,
    name: 'Organics Delicious Fresh Tomato',
    price: 1200,
    priceDisplay: '$1,200',
    category: 'Value Fresh',
    image: product2
  },
  {
    id: 7,
    name: 'Fresh Organic Strawberries',
    price: 700,
    priceDisplay: '$700',
    category: 'Organic Finds',
    image: product1
  },
  {
    id: 8,
    name: 'Premium Atlantic Salmon',
    price: 1500,
    priceDisplay: '$1,500',
    category: 'Value Fish',
    image: product4
  },
  {
    id: 9,
    name: 'Organic Green Vegetables',
    price: 450,
    priceDisplay: '$450',
    category: 'Value Fresh',
    image: product2
  }
];

const ITEMS_PER_PAGE = 6;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popularity':
        // In a real app, you'd have a popularity metric
        return sorted;
      default:
        return sorted;
    }
  }, [sortOption]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

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

        {/* Navigation Bar */}
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
          <p className="text-gray-500">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
          </p>
          <select 
            className="border rounded px-4 py-2 text-sm text-gray-600"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="default">Default sorting</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
            <option value="popularity">Sort by popularity</option>
          </select>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {paginatedProducts.map((product) => (
            <Link to={`/product/${product.id}`}>
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
              <div className="text-sm text-gray-900">{product.priceDisplay}</div>
            </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-1 mt-12 justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${
                currentPage === page
                  ? 'bg-yellow-400 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;