import { lazy } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import AuthPrivetRoute from '../middleware/AuthPrivetRoute';
import BlankLayout from '../components/Layouts/BlankLayout';
import LoginBoxed from '../pages/Authentication/LoginBoxed';
import SingUp from '../pages/Authentication/SingUp';
const Index = lazy(() => import('../pages/Index'));

const routes = [
   // dashboard
   {
      path: '/',
      element: <AuthPrivetRoute />,
      children: [
         {
            path: '/',
            element: (
               <DefaultLayout>
                  <Index />
               </DefaultLayout>
            ),
         },
      ],
   },

   // Auth routes
   {
      path: '/auth/signin',
      element: (
         <BlankLayout>
            <LoginBoxed />
         </BlankLayout>
      ),
   },
   {
      path: '/auth/signup',
      element: (
         <BlankLayout>
            <SingUp />
         </BlankLayout>
      ),
   },
];

export { routes };
