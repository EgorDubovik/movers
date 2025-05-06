import { Navigate, Outlet } from 'react-router';
// import {useIsAuthenticated} from 'react-auth-kit';

const AuthPrivetRoute = () => {
   // const isAuthenticated = useIsAuthenticated();
   const isAuth = true; //isAuthenticated()
   return isAuth ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default AuthPrivetRoute;
