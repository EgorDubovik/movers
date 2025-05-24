import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/themeConfigSlice';
import Cookies from 'universal-cookie';

const LogOut = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cookies = new Cookies();

   useEffect(() => {
      dispatch(setUser(null));
      cookies.remove('auth_token');
      navigate('/auth/signin');
   }, []);

   return null;
};

export default LogOut;
