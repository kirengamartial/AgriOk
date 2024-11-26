import React, { useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useGetFarmlandsQuery, useDeleteFarmlandsMutation } from '../slices/userSlices/userApiSlice';
import Spinner from '../components/Loader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const FarmLand = () => {
  const { data: farmlands, refetch, isLoading } = useGetFarmlandsQuery();
  const { userInfo } = useSelector(state => state.auth);
  const [deleteFarm, { isLoading: deleteIsLoading }] = useDeleteFarmlandsMutation();

  const getBaseRoute = () => userInfo.isAdmin ? '/admin' : '/farmer';

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this farmland?')) {
        await deleteFarm(id).unwrap();
        refetch();
        toast.success("Farmland deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Failed to delete farmland");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Farmland Management
        </h1>
        <Link 
          to={`/dashboard${getBaseRoute()}/farmland/create`}
          className="w-full sm:w-auto"
        >
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-sm w-full sm:w-auto">
            <Plus size={20} />
            Add Farmland
          </button>
        </Link>
      </div>

      {deleteIsLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}

      {farmlands?.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-gray-500 text-sm sm:text-base">
              No farmlands found. Add your first farmland to get started.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {farmlands?.map((farmland) => (
            <Link 
              key={farmland.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden relative"
              to={`/dashboard${getBaseRoute()}/farmland/sensor-data/${farmland.id}`}
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <Link 
                  to={`/dashboard${getBaseRoute()}/farmland/edit/${farmland.id}`}
                  className="touch-manipulation"
                >
                  <button 
                    className="p-2 sm:p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Edit farmland"
                  >
                    <Pencil size={18} className="text-gray-600" />
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(farmland.id)}
                  className="p-2 sm:p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors touch-manipulation"
                  aria-label="Delete farmland"
                >
                  <Trash2 size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                      Location: {farmland.location}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-gray-600">
                      <span className="font-medium">Sensors:</span>{' '}
                      <span className="break-words">{farmland.sensors}</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      <span className="font-medium">Size:</span>{' '}
                      <span>{farmland.size} hectares</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      <span className="font-medium">ID:</span>{' '}
                      <span>{farmland.id}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmLand;