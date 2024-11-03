import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../slices/userSlices/userApiSlice';
import { LoaderCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  },[userInfo])

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    city: '',
    postal_code: '',
    country: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await register(formData).unwrap();
      toast.success('Register successful', {
        duration: 4000,
        position: 'top-center',
      });
      navigate('/login');
    } catch (err) {
      setError(err?.data?.non_field_errors ||  err?.data?.email || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      {/* Home Icon */}
      <div className="absolute top-4 left-4">
        <Link to='/' className="text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-center text-gray-900">REGISTER</h2>
          </div>

          {error && (
            <div className="mb-4 p-2 text-red-500 text-sm text-center bg-red-50 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isLoading ? <LoaderCircle className="animate-spin h-6 w-6" /> : 'Sign Up'}
            </button>

            {/* Additional Links */}
            <div className="text-center text-sm text-gray-500">
              <p className="mt-4">
                Already have an account?{' '}
                <Link to='/login' className="text-black hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;