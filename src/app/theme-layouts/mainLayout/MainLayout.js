import FuseSuspense from '@fuse/core/FuseSuspense';
import { memo, useContext, useState } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import AppContext from 'app/AppContext';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import { useSelector } from 'react-redux';
import FuseMessage from '@fuse/core/FuseMessage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoadingWrap from 'app/theme-layouts/mainLayout/components/LoadingWrap';
import { Header, SideMenuBar, MainTitleBar } from './components';

function MainLayout() {
  const location = useLocation();
  const [menuBarStatus, setMenuBarStatus] = useState();
  const menuBarToggle = (menuBarStatus) => {
    setMenuBarStatus(menuBarStatus);
  };

  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div id="layout">
      <ToastContainer style={{ zIndex: 99999 }} position="bottom-center" />
      <LoadingWrap />
      {config.leftSidePanel.display && (
        <SideMenuBar menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
      )}
      <div className="modal__bg" />
      <main>
        {config.toolbar.display && (
          <Header menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
        )}
        {config.toolbar.display && location.pathname.split('/')[1] !== 'apps' && <MainTitleBar />}
        <FuseSuspense>{useRoutes(routes)}</FuseSuspense>
      </main>
      <FuseMessage />
    </div>
  );
}

export default memo(MainLayout);
