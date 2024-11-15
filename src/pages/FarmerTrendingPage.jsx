import React, { useEffect } from 'react';
import { useGetTrendingQuery, useDeleteTrendingMutation } from '../slices/userSlices/userApiSlice';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const FarmerTrendingPage = () => {
  const { data: trending, isLoading, refetch } = useGetTrendingQuery();
  const [deleteTrending, { isLoading: isDeleting }] = useDeleteTrendingMutation();
  const {userInfo} = useSelector(state => state.auth)

  const getBaseRoute = () => userInfo.isAdmin ? 'admin' : 'farmer';

  useEffect(() => {
  if(trending) {
    refetch()
  }
  }, [trending])

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await deleteTrending(id).unwrap();
        toast.success('Item deleted successfully');
        refetch();
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete item');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Trending Items</h2>
        <Link
          to={`/dashboard/${getBaseRoute()}/trending/create`}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Add New Posts
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trending?.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No trending items found
                </td>
              </tr>
            ) : (
              trending?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/80/80';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {item.content.length > 100
                        ? `${item.content.substring(0, 100)}...`
                        : item.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      <Link
                        to={`/dashboard/${getBaseRoute()}/trending/edit/${item.id}`}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerTrendingPage;