import AppLayout from "../FarmerComponents/AppLayout.jsx";
import { Outlet } from "react-router-dom";
import AppAside from "../FarmerComponents/AppSide.jsx";
import AppHeader from "../FarmerComponents/AppHeader.jsx";
import React from "react";


const FarmerLayout= () => {

  return (
    <AppLayout
      aside={
        <AppAside/>
      }
      header={<AppHeader/>}
      main={<Outlet />}
    />
  );
};

export default FarmerLayout;
