import React from 'react'
import {
   Route,
   createBrowserRouter,
   createHashRouter,
   createRoutesFromElements,
   RouterProvider

} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import TrendingPage from './pages/TrendingPage'
import SingleProductPage from './pages/SingleProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/OrderPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import FarmerLayout from './layouts/FarmerLayout/FarmerLayout'
import FarmerHomePage from './pages/FarmerHomePage'
import AdminCreateProductPage from './pages/AdminCreateProductPage'
import AdminListProductsPage from './pages/AdminListProductsPage'
import FarmerCreateTrendingPage from './pages/FarmerCreateTrendingPage'
import EditProductForm from './pages/AdminEditProductPage'
import SingleTrendingPage from './pages/SingleTrendingPage'
import NotFoundPage from './pages/NotFoundPage'
import AccountPage from './pages/profilePage'
import ProtectedRoutes from './layouts/ProtectedRoutes'
import ProtectedAdminRoutes from './layouts/ProtectedAdminRoutes'

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/trending' element={<TrendingPage/>}/>
          <Route path='/trending/:id' element={<SingleTrendingPage/>}/>
          <Route path='/product/:id' element={<SingleProductPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/profile' element={<AccountPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>

        <Route path='/dashboard' element={<ProtectedAdminRoutes/>}> 
        <Route path='' element={<AdminLayout/>}>
          <Route path='admin' element={<AdminHomePage/>}/>
          <Route path='admin/product/create' element={<AdminCreateProductPage/>}/>
          <Route path='admin/product/list' element={<AdminListProductsPage/>}/>
          <Route path='admin/product/edit/:id' element={<EditProductForm/>}/>
        </Route>
        </Route>

        <Route path='/dashboard' element={<ProtectedRoutes/>}>
        <Route path='' element={<FarmerLayout/>}>
          <Route path='farmer' element={<FarmerHomePage/>}/>
          <Route path='farmer/trending/create' element={<FarmerCreateTrendingPage/>}/>
        </Route>
        </Route>
      </>
    )
  )
  
  return (
    <Provider store={store}>
     <RouterProvider  router={router}/>
    </Provider>
  )
}

export default App