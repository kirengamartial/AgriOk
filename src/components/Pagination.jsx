import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t">
    <div className="text-sm text-gray-500">
      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} orders
    </div>
    <div className="flex space-x-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-white border'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
  )
}

export default Pagination
