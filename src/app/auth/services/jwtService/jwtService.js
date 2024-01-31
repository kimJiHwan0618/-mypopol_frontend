import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */
class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
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

  signInWithEmailAndPassword = (userId, password, setLoginLoading) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_API_HOST + jwtServiceConfig.signIn, {
          userId,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.response;
            this.setSession(data.accessToken);
            resolve(data);
            this.emit('onLogin', data);
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            reject(error.response.data);
          } else {
            this.emit('onAutoLogout', error.response.data);
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .put(process.env.REACT_APP_API_HOST + jwtServiceConfig.accessToken, {
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
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
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
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
