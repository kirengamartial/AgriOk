import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../slices/userSlices/userApiSlice';
import { useCreateCartMutation } from '../slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';
import { ShoppingCart, Star, Package } from 'lucide-react';
import BgImage from '../../public/Image.png'

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [createCart, { isLoading: isAddingToCart }] = useCreateCartMutation();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        product_id: parseInt(id),
        quantity
      };
      await createCart(productData).unwrap();
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error("Error adding product to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Failed to load product details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-80 bg-gradient-to-r from-green-800 to-green-600">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0">
          <img 
            src={BgImage}
            alt="Hero background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Product Details</h1>
          <div className="flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-yellow-400">{product?.category}</span>
            <span>/</span>
            <span>{product?.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-xl">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image Section */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 p-4">
                  <img
                    src={product?.photo || "/api/placeholder/600/600"}
                    alt={product?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square rounded-md overflow-hidden bg-gray-100 ${
                        selectedImage === i ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      <img
                        src={product?.photo || "/api/placeholder/150/150"}
                        alt={`Product view ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div> */}
              </div>

              {/* Product Info Section */}
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {product?.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold">{product?.name}</h2>
                
                <div className="text-3xl font-bold text-yellow-600">
                  ${product?.price}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {product?.description}
                </p>

                <div className="h-px bg-gray-200" />

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={isAddingToCart}
                      className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </form>

                {/* Product Meta */}
                <div className="space-y-3 pt-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Package className="w-5 h-5" />
                    <span>SKU: {product?.id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>Category: {product?.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;