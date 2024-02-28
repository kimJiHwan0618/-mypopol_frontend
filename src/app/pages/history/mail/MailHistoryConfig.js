import { lazy } from 'react';

const MailHistory = lazy(() => import('./MailHistory'));

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
      path: 'history/mail',
      element: <MailHistory />,
    },
  ],
};

export default config;
