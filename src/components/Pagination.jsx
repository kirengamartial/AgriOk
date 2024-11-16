import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 border-t gap-4">
      <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} orders
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 text-sm rounded-md bg-white border disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex flex-wrap gap-1 max-w-[200px] justify-center">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-2 sm:px-3 py-1 text-sm rounded-md ${
                currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-white border'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-1 text-sm rounded-md bg-white border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Pagination
