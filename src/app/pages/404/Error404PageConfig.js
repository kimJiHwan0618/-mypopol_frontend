import Error404Page from './Error404Page';

const SignUpConfig = {
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
      path: '404',
      element: <Error404Page />,
    },
  ],
};

export default SignUpConfig;
