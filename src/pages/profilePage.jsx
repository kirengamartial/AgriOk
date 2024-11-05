import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import heroImage from '../../public/Section.png'
import { useGetProfileQuery } from '../slices/userSlices/userApiSlice';
import { useUpdateProfileMutation, useUpdatePasswordMutation } from '../slices/userSlices/userApiSlice';
import { updateUserInfo } from '../slices/userSlices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const {data: profile, refetch} = useGetProfileQuery()
  const [update, {isLoading}] = useUpdateProfileMutation()
  const [updatePassword, {isLoading: isLoadingPassword}] = useUpdatePasswordMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone_number: profile.phone_number || '',
        country: profile.country || '',
        city: profile.city || '',
        postal_code: profile.postal_code || ''
      });
      refetch()
    }
  }, [profile])

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    country: '',
    city: '',
    postal_code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await update(formData).unwrap()
      console.log(res.first_name)
      toast.success('Edited successfully')
      dispatch(updateUserInfo({first_name: res.first_name}))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  
  const [formPasswordData, setFormPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPasswordData(prevState => ({ 
      ...prevState,
      [name]: value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!formPasswordData.oldPassword || !formPasswordData.newPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updatePassword({
        old_password: formPasswordData.oldPassword,
        new_password: formPasswordData.newPassword
      }).unwrap();

      toast.success('Password updated successfully');
   
      setFormPasswordData({
        oldPassword: '',
        newPassword: ''
      });
    } catch (err) {
      toast.error(
        err?.data?.message || 
        err?.data?.old_password || 
        err?.data?.new_password || 
        'Failed to update password'
      );
    }
  };
 
  return (
    <>
    <div className="relative h-64">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
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
            <p className="text-lg font-medium mb-6">Hello, {formData.first_name || 'User'}</p>
            <nav className="w-full">
              <ul className="space-y-2">
                <li>
                  <Link to="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
                </li>
                <li className="text-gray-600 hover:text-gray-900 font-medium">
                  Edit Profile
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* Personal Information */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Last Name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Country"
                  />
                </div>
              
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
              <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center">
               {isLoading ? <LoaderCircle className="animate-spin h-6 w-6" /> : 'Save changes'}
            </button>
            </div>
          </form>

          {/* Change Password */}
          <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formPasswordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formPasswordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter new password"
                />
              </div>
              <button
                disabled={isLoadingPassword}
                type='submit'
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 flex items-center justify-center">
                  {isLoadingPassword ? <LoaderCircle className="animate-spin h-6 w-6" /> : 'Change password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountPage;