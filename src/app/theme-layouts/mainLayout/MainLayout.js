import FuseSuspense from '@fuse/core/FuseSuspense';
import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import { useSelector } from 'react-redux';
import FuseMessage from '@fuse/core/FuseMessage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header, SideMenuBar, MainTitleBar, CommonPageCom, LoadingWrap, PageServiceNotice } from './components/common';

function MainLayout() {
  const location = useLocation();
  const [menuBarStatus, setMenuBarStatus] = useState();
  const menuBarToggle = (menuBarStatus) => {
    setMenuBarStatus(menuBarStatus);
  };

  const config = useSelector(selectFuseCurrentLayoutConfig);

  return (
    <div id="layout">
      <ToastContainer style={{ zIndex: 99999 }} position="bottom-center" />
      <LoadingWrap />
      <div className="modal__bg" />
      {config.leftSidePanel.display && (
        <SideMenuBar menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
      )}
      <main>
        {config.toolbar.display && (
          <Header menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
        )}
        {config.toolbar.display && location.pathname.split('/')[1] !== 'apps' && <MainTitleBar />}
        <FuseSuspense>{!config.enabled ? <PageServiceNotice /> : <CommonPageCom />}</FuseSuspense>
      </main>
      <FuseMessage />
    </div>
  );
}

export default memo(MainLayout);
