import React from 'react'

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
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
  )
}

export default EmptyState
