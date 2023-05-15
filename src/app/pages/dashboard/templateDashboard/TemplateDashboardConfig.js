import { lazy } from 'react';

const TemplatesDashboard = lazy(() => import('./TemplateDashboard'));

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboard/template',
      element: <TemplatesDashboard />,
    },
  ],
};

export default DashboardConfig;
