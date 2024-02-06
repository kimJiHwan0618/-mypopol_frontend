import ForgotPw from './ForgotPw';

const SignInConfig = {
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
  auth: [],
  routes: [
    {
      path: 'forgot-password',
      element: <ForgotPw />,
    },
    {
      path: 'forgot-password/:step',
      element: <ForgotPw />,
    },
  ],
};

export default SignInConfig;
