import React, { useState } from 'react';
import { useCreateProductMutation } from '../slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const ProductForm = () => {
  const navigate = useNavigate()
  const [createProduct, {isLoading}] = useCreateProductMutation()

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    quantity: '',
    category: '',
    price: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.productName);
    productData.append('description', formData.description);
    productData.append('quantity', formData.quantity);
    productData.append('category', formData.category);
    productData.append('price', formData.price);
    if (formData.photo) {
      productData.append('photo', formData.photo);
    }
  
    try {
     const res = await createProduct(productData).unwrap(); 
      toast.success('Product created successfully');
      navigate('/dashboard/admin/product/list');
    } catch (error) {
      toast.error('Failed to create product. Please try again.');
      console.log(error)
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700">Add Product</h2>
        
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-6">Product Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Item Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                row={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex justify-center"
            >
              {isLoading? <LoaderCircle className='animate-spin h-6 w-9'/> : 'Send'}
            </button>
          </div>
        </form>
      </div>
      
     
    </div>
  );
};

export default ProductForm;