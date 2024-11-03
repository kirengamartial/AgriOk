import React, { useState } from 'react';
import { User } from 'lucide-react';
import heroImage from '../../public/Section.png'

const AccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    street: '',
    postalCode: '',
    oldPassword: '',
    newPassword: ''
  });

  return (
    <>
    <div className=" relative h-64">
        {/* Background Image */}
        <div 
          className=" absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className=" absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Shop Text */}
        <div className="max-w-5xl relative z-10 container mx-auto h-full">
          <h1 className="text-3xl font-bold text-white pt-20 pl-4">Account</h1>
        </div>
      </div>
    <div className="max-w-5xl mx-auto px-4 py-8">
     

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User size={40} className="text-gray-400" />
            </div>
            <p className="text-lg font-medium mb-6">Hello, User</p>
            <nav className="w-full">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Orders</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Edit Profile</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Last Name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">State</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Street</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Street"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Postal Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Old Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter new password"
                />
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountPage;