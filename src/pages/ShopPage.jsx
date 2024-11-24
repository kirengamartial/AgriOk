import React, { useState, useMemo, useEffect } from 'react';
import heroImage from '../../public/Section.png';
import { useGetProductsQuery } from '../slices/userSlices/userApiSlice';
import { Link } from 'react-router-dom';
import { Tag, Heart } from 'lucide-react';
import Spinner from '../components/Spinner';

const ITEMS_PER_PAGE = 6;

const ShopPage = () => {
  const { data: Products = [], refetch, isLoading} = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (Products.length) {
      refetch();
    }
  }, [Products, refetch]);

  const sortedProducts = useMemo(() => {
    let sorted = [...Products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popularity':
        return sorted;
      default:
        return sorted;
    }
  }, [sortOption, Products]);

  const totalPages = Math.ceil(Products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-72">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="max-w-6xl relative z-10 container mx-auto h-full">
          <h1 className="text-4xl font-bold text-white pt-24 pl-4">Discover Our Shop</h1>
          <p className="text-gray-200 pl-4 mt-2">Find your perfect piece</p>
        </div>
  
        <div className="absolute bottom-0 left-0 right-0 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center h-14 px-4">
              <span className="text-gray-600 text-sm">Home</span>
              <span className="text-yellow-400 text-sm mx-2">/</span>
              <span className="text-yellow-400 text-sm">Products</span>
            </div>
          </div>
        </div>
      </div>
  
      <div className="max-w-6xl mx-auto py-12 relative min-h-[400px] px-4 lg:px-0">
        {isLoading ? (
          <Spinner/>
        ) : Products?.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-500 text-sm">
                Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, Products.length)} of {Products.length} results
              </p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {paginatedProducts.map((product) => (
    <Link 
      to={`/product/${product.id}`} 
      key={product.id}
      className="flex justify-center"
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="group w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative">
          <div className="overflow-hidden aspect-[4/3]">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
                      </div>
                      <button 
                        className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md transition-all duration-300 ${
                          hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <div className={`absolute bottom-4 left-4 transition-all duration-300 ${
                        hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}>
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-md flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900">
                          Rwf {Number(product.price).toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          In Stock
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
  
            <div className="flex gap-1 mt-12 justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            <p className="text-xl font-medium">No products found</p>
            <p className="mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;