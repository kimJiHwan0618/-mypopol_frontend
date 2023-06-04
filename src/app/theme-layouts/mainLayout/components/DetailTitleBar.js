import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

// function DetailTitleBar({ flag, deleteBtnClick, saveBtnClick, trigger }) {
function DetailTitleBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const historyBack = () => {
    // navigate(location.state === null ? -1 : location.state.detailLink.goBackUrl);
    navigate(-1);
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
          // disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={(e) => {
            // trigger().then((isValid) => {
            //   if (isValid) {
            //     saveBtnClick();
            //   }
            // });
          }}>
          <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <use href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#upload`} />
          </svg>
          <span className="f__medium">저장</span>
        </Button>
      </div>
    </div>
  );
}

export default DetailTitleBar;
