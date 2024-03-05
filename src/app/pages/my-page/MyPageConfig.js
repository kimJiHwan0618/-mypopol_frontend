import { lazy } from 'react';

const ProfileSetting = lazy(() => import('./ProfileSetting'));

const config = {
  settings: {
    layout: {
      config: {
        toolbar: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: 'my-page/profile',
      element: <ProfileSetting />,
    },
  ],
};

export default config;
