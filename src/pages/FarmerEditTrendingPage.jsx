import React, { useEffect, useState } from 'react';
import { useGetSingleTrendingQuery } from '../slices/userSlices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditTrendingForm = () => {
  const {id} = useParams()
  const {data: trending, refetch} = useGetSingleTrendingQuery(id)
  const navigate = useNavigate();
  const {userInfo} = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  const getBaseRoute = () => userInfo.isAdmin ? 'admin' : 'farmer';

  useEffect(() => {
    if(trending) {
      setFormData({
        title: trending.title || '',
        content: trending.content || ''
      });
      refetch()
    }
  }, [trending])
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    image: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation (required, length between 1-200)
    if (!formData.title) {
      newErrors.title = 'This field is required.';
    } else if (formData.title.length < 1 || formData.title.length > 200) {
      newErrors.title = 'Title must be between 1 and 200 characters.';
    }

    // Content validation (required, minimum length 1)
    if (!formData.content) {
      newErrors.content = 'This field is required.';
    } else if (formData.content.length < 1) {
      newErrors.content = 'Content must not be empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
    setErrors(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (!validateForm()) {
      toast.error('Please fix the form errors.');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content); 
      if (formData.image) {
        data.append('image', formData.image);
      }
      const token = userInfo.access_token
      await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        method: 'PUT',
        headers: {"Authorization" : `Bearer ${token}`},
        body: data
      })
      toast.success('Edited successfully');
      navigate(`/dashboard/${getBaseRoute()}/trending`);
    } catch (err) {
      console.error('Creation failed:', err);
      toast.error(err?.data?.detail || 'Failed to create trending news');
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700">Create Trending News</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={200}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter content"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            accept="image/*"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Editing..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditTrendingForm;