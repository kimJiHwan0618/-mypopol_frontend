import FuseSuspense from '@fuse/core/FuseSuspense';
import { memo, useState, useEffect, useRef } from 'react';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FuseMessage from '@fuse/core/FuseMessage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { selectUser } from 'app/store/userSlice';
import {
  setMails,
  setVistors,
  selectVistors,
  selectMails,
} from 'app/pages/dashboard/templateDashboard/store/TemplateDashboardSlice';
import {
  Header,
  SideMenuBar,
  MainTitleBar,
  CommonPageCom,
  LoadingWrap,
  PageServiceNotice,
} from './components/common';

function MainLayout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const vistors = useSelector(selectVistors);
  const mails = useSelector(selectMails);
  const vistorsRef = useRef(vistors);
  const mailsRef = useRef(mails);
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const [menuBarStatus, setMenuBarStatus] = useState('hide');
  const [ws, setWs] = useState(null);

  const menuBarToggle = (menuBarStatus) => {
    setMenuBarStatus(menuBarStatus);
  };

  useEffect(() => {
    vistorsRef.current = vistors;
    mailsRef.current = mails;
  }, [mails, vistors]);

  useEffect(() => {
    if (user?.userId) {
      try {
        const webSocket = new WebSocket(
          `${process.env.REACT_APP_WEBSOCKET_HOST}/websocket/?userId=${user.userId}`,
          undefined,
          {}
        );
        webSocket.onmessage = (evt) => {
          const message = JSON.parse(evt.data);
          switch (message?.type) {
            case '방문자 카운트':
              dispatch(setVistors([...vistorsRef.current, message.data]));
              break;
            case '이메일 카운트':
              dispatch(setMails([...mailsRef.current, message.data]));
              break;
            default:
          }
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
      } catch (error) {
        console.error('WebSocket Error: ', error);
      }
    }
  }, []);

  return (
    <div id="layout">
      <ToastContainer style={{ zIndex: 99999 }} position="bottom-center" />
      <LoadingWrap />
      {config.leftSidePanel.display && (
        <SideMenuBar menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
      )}
      <div
        className="modal__bg"
        onClick={() => {
          menuBarToggle('hide');
        }}
      />
      <main>
        {config.rightSidePanel.display && ( // header = rightSidePanel
          <Header menuBarStatus={menuBarStatus} menuBarToggle={menuBarToggle} />
        )}
        {/* {config.toolbar.display && location.pathname.split('/')[1] !== 'apps' && <MainTitleBar />} */}
        {config.toolbar.display && <MainTitleBar />} {/* toolbar = MainTitleBar */}
        <FuseSuspense>{!config.enabled ? <PageServiceNotice /> : <CommonPageCom />}</FuseSuspense>
      </main>
      <FuseMessage />
    </div>
  );
}

export default memo(MainLayout);
