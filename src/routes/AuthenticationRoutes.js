import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));
const NotFound = Loadable(lazy(() => import('../views/NotFound')));
const PrivacyPolicy = Loadable(lazy(() => import('../views/PrivacyPolicy')));
// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '',
      element: <AuthLogin />
    },
    {
      path: '/application/register',
      element: <AuthRegister />
    }
  ]
};

export default AuthenticationRoutes;
