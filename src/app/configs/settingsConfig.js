const settingsConfig = {
  layout: {
    style: 'mainLayout', // layout1 layout2 layout3 MainLayout
    config: {}, // checkout default layout configs at app/theme-layouts for example  app/theme-layouts/layout1/Layout1Config.js
  },
  /*
   To make whole app auth protected by default set defaultAuth:['admin','staff','user']
   To make whole app accessible without authorization by default set defaultAuth: null
   *** The individual route configs which has auth option won't be overridden.
   */
  defaultAuth: ['SUPER', 'PREMIUM', 'BASIC', 'FREE'],
  /*
    Default redirect url for the logged-in user,
   */
  loginRedirectUrl: '/template/page',
  // 임시로 페이지 템플릿을 메인으로
  // 기능 완료시 /dashboard/template
};

export default settingsConfig;
