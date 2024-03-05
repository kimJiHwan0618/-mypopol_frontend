import css from 'assets/css/mypage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { Button } from '@mui/material';
import { Save } from '@mui/icons-material';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
// import { setUser } from 'app/store/userSlice';
// dispatch(setUser(user)),

const ProfileSetting = () => {
  const user = useSelector(selectUser);
  const [profileImg, setProfileImg] = useState(null);

  const handleFileSelect = (arg) => {
    arg.file = new File([arg.file], arg.file.name.replaceAll(' ', ''), { type: arg.file.type });
    if (arg.file.type.startsWith('image/')) {
      setProfileImg(arg.file);
      // setValue(arg.name, arg.file.name);
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  return (
    <div className="section__grid__wrap content">
      {/* mypage navigation */}
      <section >
        <div className={css.section__item}>
          <dl>
            <dt className={`${css.section__title}`}>
              <h3 className='f__medium'>프로필 세팅</h3>
            </dt>
            <dd className={css.sub__navi__desc}>사용자 계정 관련 정보를 수정합니다.</dd>
          </dl>
        </div>
      </section>
      {/* mypage navigation */}
      <section className={css.mypage__content}>
        <div className={css.section__item}>
          <div className={css.section__title}>
            <h3 className="f__medium">프로필 사진</h3>
            <Button
              variant="contained"
              color="secondary"
              className="custom__btn f__medium"
              size="large"
              disabled={false}
              onClick={() => {
                // authTypeClick('휴대폰');
              }}>
              <span className="mx-8 text-white font-bold">저장</span>
              <Save />
            </Button>
          </div>
          <div>
            {profileImg === null || !profileImg.type.startsWith('image/') ? (
              <FileUpload
                name="profileImg"
                height="200px"
                onFileSelect={handleFileSelect}
              />
            ) : (
              <>
                <div className={css.profile__img__box}>
                  <img src={URL.createObjectURL(profileImg)} alt={profileImg.name} />
                </div>
                <div className={css.file__status}>
                  <p className="f__regular">{profileImg.name}</p>
                  <span
                    onClick={(e) => {
                      setProfileImg(null);
                    }}
                    className={css.remove__btn}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={css.section__item}>
          <div className={css.section__title}>
            <h3 className="f__medium">사용자 정보</h3>
            <Button
              variant="contained"
              color="secondary"
              className="custom__btn f__medium"
              size="large"
              disabled={false}
              onClick={() => {
                // authTypeClick('휴대폰');
              }}>
              <span className="mx-8 text-white font-bold">저장</span>
              <Save />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileSetting;