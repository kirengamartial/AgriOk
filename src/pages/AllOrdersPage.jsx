import React, { useState } from 'react';
import { useGetOrderQuery } from '../slices/userSlices/userApiSlice';
import EmptyState from '../components/EmptyOrderState';


const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const { data, isLoading, error } = useGetOrderQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading orders. Please try again later.</div>
      </div>
    );
  }

  const processedOrders = data && Array.isArray(data) ? data.map(order => ({
    id: order?.id || 'N/A',
    amount: parseFloat(order?.total_amount || 0),
    date: order?.created_at ? new Date(order.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'N/A',
    items: order?.items?.length || 0,
    status: (order?.status || 'pending').toLowerCase()
  })) : [];

  const totalPages = Math.ceil(processedOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = processedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

 
  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Orders</h1>
        
        {processedOrders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentOrders.map((order) => (
                <a 
                  key={order.id} 
                  href={`/#/orders/${order.id}`}
                  className="block bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-gray-400 mb-2">Order #{order.id}</h2>
                        <p className="text-white text-2xl font-semibold">
                          Rwf {order.amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                        </p>
                        <p className="text-gray-400 mt-2">{order.date}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-gray-400">Items: {order.items}</span>
                      <span className="text-blue-400 hover:text-blue-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

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