import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation } from '../slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';
import Spinner from '../components/Loader';

const ProductList = () => {
  const { data: Products, refetch, isLoading: productIsLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading, refetch: deleteProductRefresh }] = useDeleteProductMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Products && Math.ceil(Products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Products && Products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (Products) {
      refetch();
    }
  }, [Products, refetch]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      refetch();
      toast.success('deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">All Product List</h1>
        <div className="flex gap-4">
          <Link to="/dashboard/admin/product/create">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {productIsLoading ? (
          <div className="py-8">
            <Spinner />
          </div>
        ) : (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product Name</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {Products &&
                  currentItems.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.photo}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">Rwf {Number(product.price).toFixed(0)}</td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link to={`/dashboard/admin/product/edit/${product.id}`}>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                              <Pencil className="w-5 h-5 text-orange-500" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
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
        )}
      </div>
    </div>
  );
};

export default ProductList;