import { lazy } from 'react';

const PageManagement = lazy(() => import('./PageManagement'));

const PageManagementConfig = {
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

export default PageManagementConfig;
