import React, { useState } from 'react';
import BackgroundImage from '../../public/Background.png'
import apple from '../../public/Screenshot 2024-10-29 102534.png'
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  
  const itemPrice = 800;
  const subtotal = itemPrice * quantity;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-48 bg-gray-900">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          {/* Replace with your hero image */}
          <img 
            src={BackgroundImage}
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left"></th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">
                  <button className="text-gray-500 hover:text-gray-700">×</button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-sm">
                    {/* Replace with your product image */}
                    <img
                      src={apple}
                      alt="Product"
                      className="w-20 h-20 object-cover"
                    />
                    <span>Green Fresh Apples Organic Foods</span>
                  </div>
                </td>
                <td className="px-6 py-4">${itemPrice}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">${subtotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Update Cart Button */}
        <div className="flex justify-end mt-4 ">
          <button className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
            Update cart
          </button>
        </div>

        {/* Cart Totals */}
        <div className="mt-12">
          <h2 className="text-lg font-medium mb-4">Cart totals</h2>
          <div className="bg-white p-6 max-w-md">
            <div className="flex justify-between py-3 border-b">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-medium">Total</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <Link to='/checkout'>
            <button className="w-full text-sm bg-yellow-400 text-white py-3 px-4 mt-6 rounded uppercase font-medium hover:bg-yellow-500 transition-colors">
              Proceed to checkout
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;