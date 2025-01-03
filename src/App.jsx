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
import OrdersPage from './pages/AllOrdersPage'
import OrderDetails from './pages/SingleOrderPage'
import FarmLand from './pages/FarmLand'
import CreateFarmland from './pages/CreateFarmland'
import EditFarmland from './pages/EditFarmLand'
import FarmerTrendingPage from './pages/FarmerTrendingPage'
import FarmerEditTrendingPage from './pages/FarmerEditTrendingPage'
import SensorDataPage from './pages/SensorDataPage'
import SingleSensorData from './pages/SingleSensorData'

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
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          <Route path='' element={<ProtectedRoutes/>}>
            <Route path='/checkout/:id' element={<CheckoutPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/profile' element={<AccountPage/>}/>
            <Route path='/orders' element={<OrdersPage/>}/>
            <Route path='/orders/:id' element={<OrderDetails/>}/>
          </Route>

        </Route>
        <Route path='*' element={<NotFoundPage/>}/>

        <Route path='/dashboard' element={<ProtectedAdminRoutes/>}> 
        <Route path='' element={<AdminLayout/>}>
          <Route path='admin' element={<AdminHomePage/>}/>
          <Route path='insights' element={<FarmerHomePage/>}/>
          <Route path='admin/product/create' element={<AdminCreateProductPage/>}/>
          <Route path='admin/product/list' element={<AdminListProductsPage/>}/>
          <Route path='admin/product/edit/:id' element={<EditProductForm/>}/>
          <Route path='admin/farmland/create' element={<CreateFarmland/>}/>
          <Route path='admin/farmland/edit/:id' element={<EditFarmland/>}/>
          <Route path='admin/farmland/list' element={<FarmLand/>}/>
          <Route path='admin/trending/create' element={<FarmerCreateTrendingPage/>}/>
          <Route path='admin/trending/edit/:id' element={<FarmerEditTrendingPage/>}/>
          <Route path='admin/trending' element={<FarmerTrendingPage/>}/>
          <Route path='admin/farmland/sensor-data/:id' element={<SensorDataPage/>}/>
          <Route path='admin/sensor-detail/:id/:id' element={<SingleSensorData/>}/>
        </Route>
        </Route>

        <Route path='/dashboard' element={<ProtectedRoutes/>}>
        <Route path='' element={<FarmerLayout/>}>
          <Route path='farmer' element={<FarmerHomePage/>}/>
          <Route path='farmer/trending/create' element={<FarmerCreateTrendingPage/>}/>
          <Route path='farmer/trending/edit/:id' element={<FarmerEditTrendingPage/>}/>
          <Route path='farmer/trending' element={<FarmerTrendingPage/>}/>
          <Route path='farmer/farmland/create' element={<CreateFarmland/>}/>
          <Route path='farmer/farmland/edit/:id' element={<EditFarmland/>}/>
          <Route path='farmer/farmland/list' element={<FarmLand/>}/>
          <Route path='farmer/farmland/sensor-data/:id' element={<SensorDataPage/>}/>
          <Route path='farmer/sensor-detail/:id/:id' element={<SingleSensorData/>}/>
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