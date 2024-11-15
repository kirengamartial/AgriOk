import AppLayout from "../FarmerComponents/AppLayout.jsx";
import { Outlet } from "react-router-dom";
import AppAside from "../FarmerComponents/AppSide.jsx";
import AppHeader from "../FarmerComponents/AppHeader.jsx";
import React from "react";
import { Toaster } from "react-hot-toast";


const FarmerLayout= () => {

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
    <AppLayout
      aside={
        <AppAside/>
      }
      header={<AppHeader/>}
      main={<Outlet />}
    />
  </>
  );
};

export default FarmerLayout;
