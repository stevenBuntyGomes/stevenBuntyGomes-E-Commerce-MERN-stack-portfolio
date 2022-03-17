import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoute({isAdmin, component: Component }) {
    // const history = useNavigate();
    const {isAuthenticated, user, loading} = useSelector((state) => state.user);
    if(isAdmin === true && user.role !== "admin"){
        return <Navigate to = "/login"/>
    }

    return isAuthenticated === false ? <Navigate to = "/login"/> :  <Outlet/>; 
//   return (
    
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
    
//   )
}

export default ProtectedRoute;
