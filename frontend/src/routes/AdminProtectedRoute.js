import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
    const {isAuthenticated, loading, user} = useSelector((state) => state.user)

    if(loading === false){
        if(!isAuthenticated){
            return <Navigate to="/admin" replace/>
        } else if(user && user.role !== "admin"){
            return <Navigate to="/admin" replace/>
        } 
        return children
    }
}

export default AdminProtectedRoute;