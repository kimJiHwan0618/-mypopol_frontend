import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import _ from '@lodash';

function DetailTitleBar({ saveBtnClick, isValid, dirtyFields, updateLoading }) {
  // function DetailTitleBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const historyBack = () => {
    navigate(location.state === null ? -1 : location.state.detailLink.goBackUrl);
  };

  return (
    <div className="sub__nav">
      <div className="left">
        <button onClick={historyBack}>
          <svg viewBox="0 0 24 24" stroke="white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>
        <dl>
          <dt className="f__medium">돌아가기</dt>
        </dl>
      </div>
      <div className="right btn__wrap">
        <Button
          variant="contained"
          className="custom__btn"
          disabled={_.isEmpty(dirtyFields) || !isValid || updateLoading}
          onClick={(e) => {
            // trigger().then((isValid) => {
            //   if (isValid) {
            //     saveBtnClick();
            //   }
            // });
            saveBtnClick();
          }}>
          <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <use href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#upload`} />
          </svg>
          {!updateLoading ? (
            <span className="f__medium">저장</span>
          ) : (
            <Lottie options={{ loop: true, autoplay: true, animationData }} />
          )}
        </Button>
      </div>
    </div>
  );
}

export default DetailTitleBar;
