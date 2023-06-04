import { lazy } from 'react';

const PageManagements = lazy(() => import('./PageManagements'));
const PageManagement = lazy(() => import('./detail/PageManagement'));

const config = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'template/page',
      element: <PageManagements />,
    },
    {
      path: 'template/page/:userId',
      element: <PageManagement />,
    },
  ],
};

export default config;
