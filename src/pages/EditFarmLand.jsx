import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import {  useEditFarmlandsMutation, useGetSingleFarmlandsQuery } from '../slices/userSlices/userApiSlice';
import { useParams } from 'react-router-dom';

const EditFarmland = () => {
  const [editFarm, { isLoading }] = useEditFarmlandsMutation();
  const {id} = useParams()
  const {data:farmland, refetch} = useGetSingleFarmlandsQuery(id)

  useEffect(() => {
    if(farmland) {
      setFormData({
        sensors: farmland.sensors || '',
        size: farmland.size || '',
        location: farmland.location || ''
      });
      refetch()
    }
  }, [farmland])

  const [formData, setFormData] = useState({
    sensors: '',
    size: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const data = {
        id,
        sensors: formData.sensors,
        size: formData.size,
        location: formData.location
    }

    try {
      await editFarm(data).unwrap();
      setSuccess(true);
      setFormData({
        sensors: '',
        size: '',
        location: ''
      });
    } catch (err) {
      setError(err?.data?.message || 'Failed to Edit farmland');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Farmland</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md border border-green-200">
              Farmland Edited successfully!
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="sensors" className="block text-sm font-medium text-gray-700">
              Sensors*
            </label>
            <input
              id="sensors"
              name="sensors"
              value={formData.sensors}
              onChange={handleChange}
              maxLength={200}
              required
              placeholder="Enter sensors information"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              Size*
            </label>
            <input
              id="size"
              name="size"
              type="number"
              step="0.1"
              value={formData.size}
              onChange={handleChange}
              required
              placeholder="Enter farmland size"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength={255}
              required
              placeholder="Enter farmland location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Editing...
              </div>
            ) : (
              'Edit Farmland'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFarmland;