import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';

function PageManagement() {
  const user = useSelector(selectUser);

  return (
    <div className="section__grid__wrap content">
      <h1>페이지템플릿 관리 페이지 입니다.</h1>
    </div>
  );
}

export default PageManagement;
