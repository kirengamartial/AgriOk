import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BlackHeader from '../components/BlackHeader';
import WhiteHeader from '../components/WhiteHeader';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            zIndex: 9999,
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {!isAuthPage && (
        <>
          <BlackHeader />
          <WhiteHeader />
        </>
      )}
      
      <Outlet />
      
      {!isAuthPage && <Footer />}
    </>
  );
};

export default MainLayout;