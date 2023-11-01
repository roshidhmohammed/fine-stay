 import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

 const PartnerProtectedRoute = ({ children}) =>{
  const { isPartner,  isLoading } = useSelector(
    (state) => state.partner
  );
    if(isLoading === true) {
       return <Loader/>;
    } else {
      if(!isPartner){
         return <Navigate to={`/login-partner`} replace/>
      }
      return children
    }
 };

 export default PartnerProtectedRoute;