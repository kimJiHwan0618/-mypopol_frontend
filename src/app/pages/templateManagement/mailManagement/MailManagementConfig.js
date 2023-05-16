import { lazy } from 'react';

const MailManagement = lazy(() => import('./MailManagement'));

const confg = {
  settings: {
    layout: {
      config: {},
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
