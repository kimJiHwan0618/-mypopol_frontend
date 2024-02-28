import FuseSuspense from '@fuse/core/FuseSuspense';
import { memo, useState, useEffect } from 'react';
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
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  const menuBarToggle = (menuBarStatus) => {
    setMenuBarStatus(menuBarStatus);
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_HOST, undefined, {});
    webSocket.onmessage = (event) => {
      console.log(`onmessage : ${event}`)
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    webSocket.onopen = () => {
      console.log('WebSocket Connected');
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  const config = useSelector(selectFuseCurrentLayoutConfig);

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
        <FuseSuspense>{!config.enabled ? <PageServiceNotice /> : <CommonPageCom />}</FuseSuspense>
      </main>
      <FuseMessage />
    </div>
  );
}

export default memo(MainLayout);
