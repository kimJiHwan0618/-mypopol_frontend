import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseLayout from '@fuse/core/FuseLayout';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import axios from 'axios';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import 'assets/css/styles.css';

/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Api-Version'] = '1.0';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <AuthProvider>
      <BrowserRouter>
        <FuseAuthorization userRole={user.role} loginRedirectUrl={settingsConfig.loginRedirectUrl}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            classes={{
              containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
            }}
          >
            <FuseLayout layouts={themeLayouts} />
          </SnackbarProvider>
        </FuseAuthorization>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default withAppProviders(App)();
