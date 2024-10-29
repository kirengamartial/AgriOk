import React, { useState } from 'react';
import { Eye, Pencil, Trash2, Star } from 'lucide-react';
import product1 from '../../public/product-2-550x550.jpg.png'
import product2 from '../../public/product-3-550x550.jpg.png'
import product3 from '../../public/product-4-550x550.jpg.png'
import product4 from '../../public/product-5-550x550.jpg.png'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Orange',
      size: 'S, M, L, XL',
      price: 80.00,
      itemsLeft: 486,
      sold: 155,
      category: 'Fashion',
      rating: 4.5,
      reviews: 55,
      image: product1
    },
    {
      id: 2,
      name: 'Watermelon',
      price: 136.00,
      itemsLeft: 784,
      sold: 674,
      category: 'Hand Bag',
      rating: 4.3,
      reviews: 163,
      image: product2
    },
    {
      id: 3,
      name: 'Orange',
      price: 219.00,
      itemsLeft: 769,
      sold: 380,
      category: 'Fashion',
      rating: 4.4,
      reviews: 174,
      image: product3
    },
    {
      id: 4,
      name: 'Watermelon',
      price: 76.00,
      itemsLeft: 571,
      sold: 87,
      category: 'Cap',
      rating: 4.2,
      reviews: 23,
      image: product4
    },
    {
      id: 5,
      name: 'Orange',
      price: 110.00,
      itemsLeft: 241,
      sold: 342,
      category: 'Fashion',
      rating: 4.4,
      reviews: 109,
      image: product2
    },
    {
      id: 6,
      name: 'Watermelon',
      price: 231.00,
      itemsLeft: 821,
      sold: 233,
      category: 'Electronics',
      rating: 4.2,
      reviews: 200,
      image: product1
    },
    {
      id: 7,
      name: 'Orange',
      price: 89.00,
      itemsLeft: 321,
      sold: 681,
      category: 'Shoes',
      rating: 4.5,
      reviews: 321,
      image: product3
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">All Product List</h1>
        <div className="flex gap-4">
            <Link to='/admin/product/create'>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Add Product
          </button>
            </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              
              <th className="text-left p-4">Product Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      {product.size && (
                        <div className="text-sm text-gray-500">
                          Size: {product.size}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <div>
                    {product.itemsLeft} Item Left
                    <div className="text-sm text-gray-500">
                      {product.sold} Sold
                    </div>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link to={`/admin/product/edit/${product.id}`}>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Pencil className="w-5 h-5 text-orange-500" />
                    </button>
                    </Link>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end items-center gap-2 p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;