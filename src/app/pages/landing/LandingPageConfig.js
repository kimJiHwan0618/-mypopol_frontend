import LandingPage from './LandingPage';
import { authRoles } from '../../auth';

const landingPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'landing',
      element: <LandingPage />,
    },
  ],
};

export default landingPageConfig;
