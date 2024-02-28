import { lazy } from 'react';

const VisitorHistory = lazy(() => import('./VisitorHistory'));

const config = {
  settings: {
    layout: {
      config: {
        enabled: true,
      },
    },
  },
  routes: [
    {
      path: 'history/visitor',
      element: <VisitorHistory />,
    },
  ],
};

export default config;
