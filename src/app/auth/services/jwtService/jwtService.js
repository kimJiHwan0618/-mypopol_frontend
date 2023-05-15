import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */
class JwtService extends FuseUtils.EventEmitter {
  init() {
    console.log('실행확인 1 --');
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    console.log('실행확인 2 --');
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    console.log('실행확인 3 --');
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (user) => {
    console.log('실행확인 4 --');
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signUp, user)
        .then((response) => {
          const data = response.data.response;
          if (data) {
            this.setSession(data.accessToken);
            resolve(data);
            this.emit('goLoginPage', data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  signInWithEmailAndPassword = (userKey, userId, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/login', {
          userKey,
          userId,
          password,
        })
        .then((response) => {
          if (response.data.code === 200) {
            const data = response.data.response;
            this.setSession(data.accessToken);
            resolve(data);
            this.emit('onLogin', data);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data?.code === 401) {
            reject(error.response.data);
          } else {
            this.emit('onAutoLogout', error.response.data);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          access_token: this.getAccessToken(),
        })
        .then((response) => {
          const data = response.data.response;
          if (response.data.code === 200) {
            this.setSession(data.accessToken);
            resolve(data);
          } else {
            this.logout();
            reject(data);
          }
        })
        .catch((error) => {
          this.logout();
          reject(error.response.data);
        });
    });
  };

  updateUserData = (user) => {
    console.log('실행확인 7 --');
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    console.log('실행확인 8 --');
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    console.log('실행확인 9 --');
    /* if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }
 */
    return true;
  };

  getAccessToken = () => {
    console.log('실행확인 10 --');
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
