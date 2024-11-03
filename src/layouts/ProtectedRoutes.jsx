import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoutes = () => {
    const {userInfo} = useSelector(state => state.auth)
    return userInfo && userInfo.isAdmin === false ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes