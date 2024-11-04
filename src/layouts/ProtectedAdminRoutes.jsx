import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedAdminRoutes = () => {
    const {userInfo} = useSelector(state => state.auth)
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedAdminRoutes