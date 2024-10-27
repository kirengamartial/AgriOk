import React from 'react'
import {
   Route,
   createBrowserRouter,
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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/trending' element={<TrendingPage/>}/>
        </Route>
    )
  )
  
  return (
    <Provider store={store}>
     <RouterProvider  router={router}/>
    </Provider>
  )
}

export default App