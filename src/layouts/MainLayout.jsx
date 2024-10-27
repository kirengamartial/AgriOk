import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
  const location = useLocation()
 
  return (
    <>
      <Toaster/>
      <Outlet/>
    </>
  )
}

export default MainLayout