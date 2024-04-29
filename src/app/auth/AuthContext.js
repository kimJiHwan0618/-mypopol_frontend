import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { appReset, setUser } from 'app/store/userSlice';
import { getSideMenus } from 'app/store/common/navigationSlice';
import jwtService from './services/jwtService';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on('onAutoLogin', () => {
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, '유저 인증 토큰을 갱신했습니다.');
        })
        .catch((message) => {
          dispatch(appReset());
          pass(message);
          jwtService.setSession(null);
        });
    });

    jwtService.on('onLogin', (user) => {
      success(user, '로그인 되었습니다.');
    });

    jwtService.on('goLoginPage', (user) => {
      goLoginPage(user, '회원가입이 정상 처리되었습니다.');
    });

    jwtService.on('onLogout', () => {
      pass('로그아웃 되었습니다.');
      dispatch(appReset());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);
      dispatch(appReset());
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message, variant: 'info' }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
        dispatch(getSideMenus(user)),
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message, variant: 'info' }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }

    function goLoginPage(user, message) {
      if (message) {
        dispatch(showMessage({ message, variant: 'info' }));
      }
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
