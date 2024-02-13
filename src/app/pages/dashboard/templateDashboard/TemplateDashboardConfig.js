import { lazy } from 'react';

const TemplatesDashboard = lazy(() => import('./TemplateDashboard'));

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
      path: 'dashboard/home',
      element: <TemplatesDashboard />,
    },
  ],
};

export default config;
