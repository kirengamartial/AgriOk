import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import BlackHeader from '../components/BlackHeader'
import WhiteHeader from '../components/WhiteHeader'
import Footer from '../components/Footer'

const MainLayout = () => {
  const location = useLocation()
 
  return (
    <>
      <Toaster/>
      <BlackHeader/>
      <WhiteHeader/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default MainLayout