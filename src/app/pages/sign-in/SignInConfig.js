import SignInPage from './SignInPage';

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
      path: 'sign-in',
      element: <SignInPage />,
    },
    {
      path: 'sign-in/:paramEmail',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
