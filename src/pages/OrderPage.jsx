import React, { useState, useEffect } from 'react';
import BackgroundImage from '../../public/Background.png'
import { useParams } from 'react-router-dom';
import { 
  useGetSingleOrderQuery, 
  useGetProfileQuery 
} from '../slices/userSlices/userApiSlice';

const CheckoutPage = () => {
  const {id} = useParams()
  const {data: profile, refetch} = useGetProfileQuery()
  const {data: order} = useGetSingleOrderQuery(id)

  if(order) {
    console.log(order.items)
  }
  const calculateSubtotal = () => {
    return order?.items?.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0) || 0;
  };

  const subtotal = calculateSubtotal();

  useEffect(() => {
    if(profile) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        country: profile.country || '',
        townCity: profile.city || '',
      });
      refetch()
    }
  }, [profile])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    apartment: '',
    townCity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-48">
        <div className="absolute inset-0">
          {/* Replace with your hero image */}
          <img 
            src={BackgroundImage}
            alt="Hero background" 
            className="w-full h-full object-cover "
          />
        </div>
        {/* Navigation */}
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-md mt-36 mr-20">
          <div className="flex items-center gap-2 text-xs">
            <span>Home</span>
            <span className="text-yellow-400">/</span>
            <span className="text-yellow-400">Checkout</span>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Details */}
          <div>
            <h2 className="text-xl font-medium mb-6">Billing details</h2>
            <div className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>


              {/* Country */}
              <div>
                <label className="block text-sm mb-1">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select a country</option>
                  <option value="RWANDA">RWANDA</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm mb-1">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  placeholder="House number and street name"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              {/* Town/City */}
              <div>
                <label className="block text-sm mb-1">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="townCity"
                  required
                  value={formData.townCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

             
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-medium mb-6">Your order</h2>
            <div className="bg-gray-50 p-6">
              {/* Order Table */}
              <table className="w-full mb-6">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Product</th>
          <th className="text-right py-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {order?.items?.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="py-3">
              {item.product.name} × {item.quantity}
            </td>
            <td className="text-right">
              Rwf {(parseFloat(item.product.price) * item.quantity).toFixed(0)}
            </td>
          </tr>
        ))}
        <tr className="border-b">
          <td className="py-3 font-medium">Subtotal</td>
          <td className="text-right">Rwf {subtotal.toFixed(0)}</td>
        </tr>
        <tr>
          <td className="py-3 font-medium">Total</td>
          <td className="text-right font-medium">Rwf {subtotal.toFixed(0)}</td>
        </tr>
      </tbody>
    </table>

              {/* Payment Method */}
              <div className="mb-6">
                <div className="bg-white p-4 border rounded mb-4">
                  <label className="flex items-center">
                    <input type="radio" name="payment" value="bank" defaultChecked />
                    <span className="ml-2">Direct bank transfer</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-2 ml-6">
                    Make your payment directly into our bank account. Please use your Order ID as
                    the payment reference. Your order will not be shipped until the funds have
                    cleared in our account.
                  </p>
                </div>
              </div>

             
              <button 
                type="submit"
                className="w-full bg-yellow-400 text-white py-3 rounded hover:bg-yellow-500 transition-colors"
              >
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;