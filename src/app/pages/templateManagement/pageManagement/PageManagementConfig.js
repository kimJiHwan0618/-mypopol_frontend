import { lazy } from 'react';

const PageManagement = lazy(() => import('./PageManagement'));

const config = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'template/page',
      element: <PageManagement />,
    },
  ],
};

export default config;
