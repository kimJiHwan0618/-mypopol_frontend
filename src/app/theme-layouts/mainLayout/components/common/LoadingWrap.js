import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingWrapState } from 'app/store/common/loadingWrap';
import { PropagateLoader } from 'react-spinners';

function LoadingWrap() {
  const state = useSelector(selectLoadingWrapState);

  return (
    <>
      {state && (
        <div id="loadingWrap">
          <div className="bg" />
          <div className="spinner-wrap">
            <PropagateLoader color="#2786f3" />
          </div>
        </div>
      )}
    </>
  );
}

export default memo(LoadingWrap);