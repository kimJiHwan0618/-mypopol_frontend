import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';

function Manual() {
  const user = useSelector(selectUser);

  return (
    <div className="section__grid__wrap content">
      <h1>사용방법 페이지 입니다.</h1>
    </div>
  );
}

export default Manual;
