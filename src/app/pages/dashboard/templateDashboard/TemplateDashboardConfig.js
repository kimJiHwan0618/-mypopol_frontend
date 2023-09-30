import { lazy } from 'react';

const TemplatesDashboard = lazy(() => import('./TemplateDashboard'));

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
      path: 'dashboard/template',
      element: <TemplatesDashboard />,
    },
  ],
};

export default config;
