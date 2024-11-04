import React, { useState } from 'react';
import BgImage from '../../public/Image.png'
import SingleProduct from '../../public/product-1.jpg.png'
import { useGetProductQuery } from '../slices/userSlices/userApiSlice';
import { useParams } from 'react-router-dom';
import { useCreateCartMutation } from '../slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id);
  const [createCart] = useCreateCartMutation();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    try {
      const productData = {
        product_id: parseInt(id), // assuming `id` is the product ID
        quantity
      };
      await createCart(productData).unwrap();
      toast.success('added to cart successfully')
      console.log("Product added to cart:", productData);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80">
        <div className="absolute inset-0 bg-green-800">
          <img 
            src={BgImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-semibold mb-2">Single Product</h1>
            <p className="text-lg">The Best Business IoT Sensor Farm</p>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-8">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product && product.name}
                alt={product && product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-medium mb-4">product name</h2>
            <div className="text-yellow-500 text-2xl font-medium mb-6">${product && product.price}</div>
            <p className="text-gray-600 mb-8">{product && product.description}</p>

            {/* Quantity and Add to Cart */}
            <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-yellow-400 text-white px-8 py-2 rounded hover:bg-yellow-500 transition-colors">
                ADD TO CART
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
