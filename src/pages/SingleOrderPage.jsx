import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState('items');
  
  const order = {
    id: "6",
    status: "PAID",
    amount: 36000.00,
    item: {
      name: "Stylish T-Shirt",
      quantity: 1,
      price: 36000.00,
      image: "/api/placeholder/400/320"
    },
    shipping: {
      address: "Kg 08st",
      location: "Kigali, Rwanda"
    },
    timeline: {
      placed: "11/5/2024, 9:44:55 AM",
      processing: "11/5/2024, 9:46:03 AM"
    }
  };

  const isPending = order.status === 'PENDING';
  
  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800/80 rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Order #{order.id}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium 
              ${isPending ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}`}>
              {isPending ? 'PENDING' : 'PAID'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Total Amount</p>
              <p className="text-xl font-bold text-white">RWF {order.amount.toFixed(2)}</p>
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
                    src={order.item.image} 
                    alt={order.item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{order.item.name}</h3>
                    <p className="text-gray-400">
                      Quantity: {order.item.quantity}
                      <br />
                      Price: RWF {order.item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-white">{order.shipping.address}</h3>
                  <p className="text-gray-400">{order.shipping.location}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2 text-white">Order Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-gray-300">Order Placed: {order.timeline.placed}</p>
              </div>
              {order.timeline.processing && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-gray-300">Processing Started: {order.timeline.processing}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white">
              Customer support?
            </button>
            {isPending ? (
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  COMPLETE PAYMENT
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  CANCEL ORDER
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