import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const orders = [
    { id: 6, amount: 36000.00, date: 'Nov 5, 2024', items: 1, status: 'paid' },
    { id: 7, amount: 15000.00, date: 'Nov 5, 2024', items: 1, status: 'unpaid' },
    { id: 8, amount: 25000.00, date: 'Nov 4, 2024', items: 2, status: 'unpaid' },
    { id: 9, amount: 42000.00, date: 'Nov 4, 2024', items: 3, status: 'paid' },
    { id: 10, amount: 18500.00, date: 'Nov 3, 2024', items: 1, status: 'unpaid' },
    { id: 11, amount: 22000.00, date: 'Nov 3, 2024', items: 2, status: 'paid' },
    { id: 12, amount: 31000.00, date: 'Nov 2, 2024', items: 2, status: 'unpaid' },
    { id: 13, amount: 27500.00, date: 'Nov 2, 2024', items: 1, status: 'paid' },
  ];

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Shopping bag icon */}
      <div className="w-24 h-24 mb-8 bg-slate-800 rounded-full flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-slate-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-white mb-4">No Orders Yet</h2>
      <p className="text-slate-400 text-center mb-8 max-w-md">
        Looks like you haven't placed any orders yet. Browse our products and find something you like!
      </p>
      <Link 
        to="/shop"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Orders</h1>
        
        {orders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentOrders.map((order) => (
                <Link 
                  key={order.id} 
                  to={`/orders/${order.id}`}
                  className="block bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-gray-400 mb-2">Order #{order.id}</h2>
                        <p className="text-white text-2xl font-semibold">
                          Rwf {order.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-gray-400 mt-2">{order.date}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'unpaid' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-gray-400">Items: {order.items}</span>
                      <span className="text-blue-400 hover:text-blue-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1 
                        ? 'bg-slate-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    ←
                  </button>

                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-4 py-2 rounded ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages 
                        ? 'bg-slate-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-800 rounded-lg">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;