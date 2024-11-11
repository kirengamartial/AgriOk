import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetSingleOrderQuery, useDeleteOrderMutation } from '../slices/userSlices/userApiSlice';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('items');
  const { data: order, isLoading } = useGetSingleOrderQuery(id);
  const [cancelOrder, { isLoading: cancelIsLoading }] = useDeleteOrderMutation();
  const [error, setError] = useState(null);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id).unwrap();
      navigate('/orders');
    } catch (err) {
      setError('Failed to cancel order. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-gray-800/80 rounded-lg p-8">
          <div className="animate-pulse space-y-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-700 rounded w-1/4"></div>
              <div className="h-6 bg-gray-700 rounded w-20"></div>
            </div>
            
            {/* Amount Cards Skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
            
            {/* Tabs Skeleton */}
            <div className="flex gap-2">
              <div className="h-10 bg-gray-700 rounded w-24"></div>
              <div className="h-10 bg-gray-700 rounded w-24"></div>
            </div>
            
            {/* Content Area Skeleton */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Timeline Skeleton */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
        <div className="text-white text-xl">Order not found</div>
      </div>
    );
  }

  const isPending = order.status === 'Pending';
  const items = order.items[0];
  
  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800/80 rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Order #{order.id}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium 
              ${isPending ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'}`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Total Amount</p>
              <p className="text-xl font-bold text-white">RWF {order.total_amount}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Payment Method</p>
              <p className="text-xl font-bold text-white">Flutterwave</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setActiveTab('items')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'items' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-700 text-white'
                }`}>
                Items
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'shipping' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-700 text-white'
                }`}>
                Shipping Address
              </button>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              {activeTab === 'items' ? (
                <div className="flex items-center gap-4">
                  <img 
                    src={items.product.photo} 
                    alt={items.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{items.product.name}</h3>
                    <p className="text-gray-400">
                      Quantity: {items.quantity}
                      <br />
                      Price: RWF {items.product.price}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-white">Shipping details will be updated</h3>
                  <p className="text-gray-400">Once the order is processed</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2 text-white">Order Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-gray-300">Order Created: {new Date(order.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white">
              Customer support?
            </button>
            {isPending ? (
              <div className="flex gap-2">
                <Link to={`/checkout/${id}`}>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  COMPLETE PAYMENT
                </button>
                </Link>
                <button 
                  onClick={handleCancelOrder}
                  disabled={cancelIsLoading}
                  className={`px-4 py-2 bg-red-500 text-white rounded-lg 
                    ${cancelIsLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                  {cancelIsLoading ? 'CANCELING...' : 'CANCEL ORDER'}
                </button>
                <Link to='/orders'>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                    BACK TO ORDERS
                  </button>
                </Link>
              </div>
            ) : (
              <Link to='/orders'>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                  BACK TO ORDERS
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;