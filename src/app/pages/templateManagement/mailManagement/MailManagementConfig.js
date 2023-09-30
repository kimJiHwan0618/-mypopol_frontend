import { lazy } from 'react';

const MailManagement = lazy(() => import('./MailManagement'));

const confg = {
  settings: {
    layout: {
      config: {
        enabled: false,
      },
    },
  },
  routes: [
    {
      path: 'template/mail',
      element: <MailManagement />,
    },
  ],
};

export default confg;
