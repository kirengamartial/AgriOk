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
  const [deleteFarm, {isLoading: deleteIsLoading}] = useDeleteFarmlandsMutation()

  // Get the base route based on user role
  const getBaseRoute = () => userInfo.isAdmin ? '/admin' : '/farmer';

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  const handleDelete = async(id) =>{
    try {
      await deleteFarm(id).unwrap()
      refetch()
      toast.success("farmland deleted successfully")
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || "failed to delete farmland")
    }
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Farmland Management</h1>
        <Link to={`/dashboard${getBaseRoute()}/farmland/create`}>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-sm">
            <Plus size={20} />
            Add Farmland
          </button>
        </Link>
      </div>
      <div className='flex justify-center items-center '>
        {deleteIsLoading && <Spinner/>}
      </div>

      {farmlands?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No farmlands found. Add your first farmland to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmlands?.map((farmland) => (
            <div 
              key={farmland.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <Link to={`/dashboard${getBaseRoute()}/farmland/edit/${farmland.id}`}>
                  <button 
                    className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Edit farmland"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(farmland.id)}
                  className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Delete farmland"
                >
                  <Trash2 size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Location: {farmland.location}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Sensors:</span> {farmland.sensors}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Size:</span> {farmland.size} hectares
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmLand;