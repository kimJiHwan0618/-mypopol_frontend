import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import { DetailTitleBar } from 'app/theme-layouts/mainLayout/components';

function PageManagement() {
  const user = useSelector(selectUser);

  return (
    <div className="section__grid__wrap content common__detail">
      <DetailTitleBar
      // flag={locationState.detailLink.title}
      // saveBtnClick={saveBtnClick}
      // trigger={trigger}
      />
    </div>
  );
}

export default PageManagement;
