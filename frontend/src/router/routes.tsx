import { lazy } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import AuthPrivetRoute from '../middleware/AuthPrivetRoute';
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
];

export { routes };
