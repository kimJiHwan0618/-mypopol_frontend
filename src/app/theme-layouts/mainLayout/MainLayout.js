import FuseSuspense from '@fuse/core/FuseSuspense';
import { memo, useContext, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import AppContext from 'app/AppContext';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import { useSelector } from 'react-redux';
import FuseMessage from '@fuse/core/FuseMessage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header, SideMenuBar } from './components';

function MainLayout() {
  const [menuBarStatus, setMenuBarStatus] = useState();
  const menuBarToggle = (menuBarStatus) => {
    setMenuBarStatus(menuBarStatus);
  };

  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div id="layout">
      <ToastContainer position="bottom-right" />
      {config.leftSidePanel.display && (
        <SideMenuBar menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
      )}
      <div className="modal__bg" />
      <main>
        {config.toolbar.display && (
          <Header menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
        )}
        <FuseSuspense>{useRoutes(routes)}</FuseSuspense>
      </main>
      <FuseMessage />
    </div>
  );
}

export default memo(MainLayout);
