import React from 'react';
import { Plus } from 'lucide-react';
import { useGetFarmlandsQuery } from '../slices/userSlices/userApiSlice';

const FarmLand = () => {
  const { data: farmlands } = useGetFarmlandsQuery();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Farmland Management</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
        >
          <Plus size={20} />
          Add Farmland
        </button>
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
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
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
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">ID:</span> {farmland.user}
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