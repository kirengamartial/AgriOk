import AppLayout from "../adminComponents/AppLayout.jsx";
import { Outlet } from "react-router-dom";
import AppAside from "../adminComponents/AppSide.jsx";
import AppHeader from "../adminComponents/AppHeader.jsx";
import React from "react";


const AdminLayout= () => {

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

export default AdminLayout;
