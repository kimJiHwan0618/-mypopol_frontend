import { lazy } from 'react';

const Manual = lazy(() => import('./Manual'));

const config = {
  settings: {
    layout: {
      config: {
        enabled: false,
      },
    },
  },
  routes: [
    {
      path: 'guide/manual',
      element: <Manual />,
    },
  ],
};

export default config;
