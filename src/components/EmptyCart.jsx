import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
        <Link to="/shop" className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
          Continue Shopping
        </Link>
    </div>
  )
}

export default EmptyCart
