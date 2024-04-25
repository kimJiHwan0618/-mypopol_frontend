const jwtServiceConfig = {
  signIn: '/common/login',
  accessToken: '/auth/jwt/refresh',
  logout: '/auth/logout',
  updateUser: '/auth/user/update', // 아직 미개발
};

export default jwtServiceConfig;
