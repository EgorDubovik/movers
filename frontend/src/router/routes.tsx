import { lazy } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import AuthPrivetRoute from '../middleware/AuthPrivetRoute';
import BlankLayout from '../components/Layouts/BlankLayout';
import LoginBoxed from '../pages/Authentication/LoginBoxed';
import SingUp from '../pages/Authentication/SingUp';
import CreateJob from '../pages/Job/Create';
import Dashboard from '../pages/Dashboad/Dashboard';
import Index from '../pages/MainPage/Index';
import List from '../pages/Job/List';

const routes = [
   // dashboard
   {
      path: '/panel',
      element: <AuthPrivetRoute />,
      children: [
         {
            path: '',
            element: (
               <DefaultLayout>
                  <Dashboard />
               </DefaultLayout>
            ),
         },
         {
            path: 'job/create',
            element: (
               <DefaultLayout>
                  <CreateJob />
               </DefaultLayout>
            ),
         },
         {
            path: 'job/list',
            element: (
               <DefaultLayout>
                  <List />
               </DefaultLayout>
            ),
         },
         {
            path: 'job/map',
            element: (
               <DefaultLayout>
                  <Index />
               </DefaultLayout>
            ),
         },
      ],
   },

   {
      path: '/',
      element: (
         <BlankLayout>
            <Index />
         </BlankLayout>
      ),
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
