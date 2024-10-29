import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
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

          <form className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Gender Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Gender"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Day"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* State Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Postal code"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <input
                type="text"
                placeholder="Country"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Register as a farmer
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              REGISTER
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