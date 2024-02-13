import settingsConfig from 'app/configs/settingsConfig';
import FuseUtils from '@fuse/utils';
import { Navigate } from 'react-router-dom';
import SignInConfig from 'app/pages/sign-in/SignInConfig';
import SignOutConfig from 'app/pages/sign-out/SignOutConfig';
import signUpConfig from 'app/pages/sign-up/SignUpConfig';
import LandingPageConfig from 'app/pages/landing/LandingPageConfig';
import TemplateDashboardConfig from 'app/pages/dashboard/templateDashboard/TemplateDashboardConfig';
import MailManagementConfig from 'app/pages/templateManagement/mailManagement/MailManagementConfig';
import PageManagementConfig from 'app/pages/templateManagement/pageManagement/PageManagementConfig';
import ContactusConfig from 'app/pages/guide/contactus/ContactusConfig';
import ForgotPwConfig from 'app/pages/forgot-password/ForgotPwConfig';
import ManualConfig from 'app/pages/guide/manual/ManualConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/pages/404/Error404Page';
import Error404PageConfig from 'app/pages/404/Error404PageConfig';

// 페이지 별 Router 설정
const routeConfigs = [
  LandingPageConfig,
  SignInConfig,
  SignOutConfig,
  signUpConfig,
  TemplateDashboardConfig,
  MailManagementConfig,
  PageManagementConfig,
  ContactusConfig,
  Error404PageConfig,
  ForgotPwConfig,
  ManualConfig,
];

const routes = [
  // 권한 체크
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboard/home" />,
    // 임시로 페이지 템플릿을 메인으로
    // 기능 완료시 /dashboard/template
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
