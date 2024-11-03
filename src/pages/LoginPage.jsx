import React, { useState, useEffect } from 'react';
import loginImage from '../../public/Image (1).png'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userSlices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCredentials } from '../slices/userSlices/authSlice';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  },[userInfo])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const res = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();
      dispatch(getCredentials({ ...res }));
      toast.success('Login successful', {
        duration: 4000,
        position: 'top-center',
      });
      navigate('/');
    } catch (err) {
      console.log(err)
      setError(err?.data?.non_field_errors || err?.data?.email || 'Something is wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link to='/' className="text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
      
      <div className="max-w-4xl w-full flex rounded-xl shadow-2xl overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src={loginImage}
            alt="Agricultural field with tractor"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent"></div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            </div>

            {error && (
              <div className="mb-4 p-2 text-red-500 text-sm text-center bg-red-50 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='EMAIL'
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  PASSWORD
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='PASSWORD'
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? <LoaderCircle className="animate-spin h-6 w-6" /> : 'Sign In'}
              </button>

              <div className="text-center text-sm">
                Not a member?{' '}
                <Link to='/register' className="font-medium text-green-600 hover:text-green-500">
                  Sign Up
                </Link>
              </div>
            </form>

            <div className="mt-6 flex justify-end space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;