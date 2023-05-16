import { lazy } from 'react';

const Contactus = lazy(() => import('./Contactus'));

const config = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'guide/contactus',
      element: <Contactus />,
    },
  ],
};

export default config;
