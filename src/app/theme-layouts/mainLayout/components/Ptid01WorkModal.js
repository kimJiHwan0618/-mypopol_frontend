import Modal from 'react-modal';
import css from 'assets/css/workPopup.module.css';
import css2 from 'assets/css/pageManagement.module.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { toast } from 'react-toastify';

const Ptid01WorkModal = ({ isOpen, onRequestClose, popInfo }) => {
  const [ptid, setPtid] = useState('');
  const [state, setState] = useState('');
  const [bannerImg, setBannerImg] = useState('');
  const [titleImg, setTitleImg] = useState('');

  const handleFileSelect = (arg) => {
    arg.file = new File([arg.file], arg.file.name.replaceAll(' ', ''), { type: arg.file.type });
    // ptId01Banner;
    if (arg.file.type.startsWith('image/')) {
      switch (arg.name) {
        case 'ptId01Banner':
          setBannerImg(arg.file);
          break;
        case 'ptId01Logo':
          setTitleImg(arg.file);
          break;
        default:
          console.log('default case');
      }
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  useEffect(() => {
    console.log(isOpen);
    console.log(popInfo);
    setPtid(popInfo.ptId);
    setState(popInfo.state);
  }, []);

  const workSaveClick = () => {
    onRequestClose();
  };

  const customStyles = {
    overlay: {
      zIndex: 9999,
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgb(241, 245, 249)',
      padding: '0px',
      inset: 'unset',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`작품 `}
      style={customStyles}>
      <div className={`${css.wrap__inner} vertical__scroll`}>
        <div className={css2.list__item}>
          <p className="f__medium">메인 배너</p>
          <FileUpload name="ptId01Banner" onFileSelect={handleFileSelect} height="361px" />
        </div>
        <div className={css2.list__item}>
          <p className="f__medium">타이틀 이미지</p>
          <FileUpload name="ptId01Banner" onFileSelect={handleFileSelect} height="80px" />
        </div>
        <div className={css2.list__item}>
          <p className="f__medium">로고 이미지</p>
          <p className="f__medium">로고 이미지</p>
          <p className="f__medium">로고 이미지</p>
          <p className="f__medium">로고 이미지</p>
        </div>
        <div className={`${css.save__btn__wrap}`}>
          <Button
            variant="contained"
            className="custom__btn"
            onClick={() => {
              workSaveClick();
            }}>
            <span className="f__medium">작품 추가</span>
            <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <use href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#plus`} />
            </svg>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Ptid01WorkModal;
