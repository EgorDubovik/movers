import { Navigate, Outlet } from 'react-router';
import Cookies from 'universal-cookie';

const AuthPrivetRoute = () => {
   const cookie = new Cookies();
   const auth_token = cookie.get('auth_token');
   return auth_token && auth_token.length > 5 ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default AuthPrivetRoute;
