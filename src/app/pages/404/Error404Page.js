import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Error404Page() {
  const navigate = useNavigate();

  return (
    <div className="section__grid__wrap content page404">
      <img src={require('assets/img/404.png')} alt="404 이미지" />
      <Button className='custom__btn' onClick={() => {
        navigate('/')
      }}>
        <span className='f__medium'>메인으로 이동</span>
      </Button>
      <dl>
        <dt className='f__medium'>원하시는 페이지를 찾을 수 없습니다.</dt>
        <dd>찾으려는 페이지의 주소가 잘못 입력되었거나, <br /> 주소의 변경 혹은 삭제로 인해 사용하실수 없습니다. <br /> 입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.</dd>
      </dl>
    </div>
  );
}

export default Error404Page;
