import css from 'assets/css/mypage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from 'app/store/userSlice';
import { Button, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import convertFile from 'app/utils/convertFile';
import { putProfileImg, putProfileInfo } from 'app/pages/my-page/store/ProfileSettingSlice';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

const ProfileSetting = () => {
  const user = useSelector(selectUser);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgBack, setProfileImgBack] = useState(null);
  const dispatch = useDispatch();
  const activeOption = {
    shouldDirty: true,
    shouldValidate: true,
  };

  const schema = yup.object().shape({
    userId: yup.string(), // readOnly
    roleName: yup.string(), // readOnly
    authValue: yup.string(), // readOnly
    userName: yup.string().required('유저명은 필수 정보 입니다.'),
    newPassword: yup.string(),
    newPasswordCheck: yup.string(),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    register,
    reset,
    watch,
    control,
    getValues,
    setValue,
    onChange,
    setError,
    formState,
    trigger,
  } = methods;
  const { errors, isValid, dirtyFields } = formState;

  const handleUserInfoSubmit = async () => {
    const excuteUpdate = async () => {
      const { payload } = await dispatch(
        putProfileInfo({
          userId: user.userId,
          username: getValues('userName'),
          password: getValues('newPassword'),
        })
      );
      if (payload.status === 200) {
        await dispatch(
          setUser({
            ...user,
            username: getValues('userName'),
          })
        );
        await toast.success('사용자 정보를 업데이트 하였습니다.');
      } else {
        toast.error('사용자 정보 업데이트 에러');
      }
    };
    try {
      if (getValues('newPassword') !== getValues('newPasswordCheck')) {
        toast.warning('새 비밀번호를 확인해주세요.');
      } else if (getValues('newPassword') === '') {
        setLoading2(true);
        await excuteUpdate();
      } else if (getValues('newPassword').length >= 6 && getValues('newPassword').length <= 12) {
        setLoading2(true);
        await excuteUpdate();
      } else {
        toast.warning('비밀번호는 6자리이상 12자리 이하로 입력해주세요.');
      }
    } catch (err) {
      toast.error('사용자 정보 업데이트 에러');
      console.log(err);
    } finally {
      setLoading2(false);
    }
  };

  const handleProfileImgSave = async () => {
    try {
      setLoading1(true);
      const { payload } = await dispatch(
        putProfileImg({ file: profileImg, oldFileName: profileImgBack, userId: user.userId })
      );
      if (payload.status === 200) {
        if (profileImg?.name) {
          await setProfileImgBack(profileImg.name);
          await dispatch(
            setUser({
              ...user,
              profileImg: profileImg.name,
            })
          );
        } else {
          await dispatch(
            setUser({
              ...user,
              profileImg: '',
            })
          );
        }
        await toast.success('프로필 이미지를 업데이트 하였습니다.');
      } else {
        await toast.error('프로필 이미지 업데이트 에러');
      }
    } catch (err) {
      toast.error('프로필 이미지 업데이트 에러');
      console.log(err);
    } finally {
      setLoading1(false);
    }
  };

  const handleFileSelect = (arg) => {
    arg.file = new File([arg.file], arg.file.name.replaceAll(' ', ''), { type: arg.file.type });
    if (arg.file.type.startsWith('image/')) {
      setProfileImg(arg.file);
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  const handleSetImgFile = () => {
    const { profileImg } = user;
    if (profileImg) {
      setProfileImgBack(profileImg);
      const remoteImageUrl = `https://site.mypopol.com/src/img/profile/${user.userId}/${profileImg}`;
      const fileName = profileImg;
      const imgType =
        `${profileImg.split('.')[1]}` === 'jpg' ? 'jpeg' : `${profileImg.split('.')[1]}`;
      convertFile(remoteImageUrl, fileName, `image/${imgType}`, async function (error, file) {
        if (error) {
          toast.error(error);
          return;
        }
        const loadComplate = () => {
          setProfileImg(file);
        };

        await loadComplate();
      });
    }
  };

  useEffect(() => {
    handleSetImgFile();
    if (user) {
      setValue('userId', user.userId, activeOption);
      setValue('roleName', `${user.role} : 기본 사용자 권한`, activeOption);
      setValue('authValue', user.authValue, activeOption);
      setValue('userName', user.username, activeOption);
      setValue('newPassword', '', activeOption);
      setValue('newPasswordCheck', '', activeOption);
    }
  }, [user?.userId]);

  return (
    <div className="section__grid__wrap content">
      {/* mypage navigation */}
      <section className={css.sub__nav}>
        <div className={css.section__item}>
          <dl>
            <dt className={`${css.section__title}`}>
              <h3 className="f__medium">프로필 세팅</h3>
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
              disabled={loading1}
              onClick={handleProfileImgSave}>
              {!loading1 ? (
                <>
                  <span className="mx-8 text-white font-bold">저장</span>
                  <Save />
                </>
              ) : (
                <Lottie options={{ loop: true, autoplay: true, animationData }} />
              )}
            </Button>
          </div>
          <div>
            {profileImg === null || !profileImg.type.startsWith('image/') ? (
              <FileUpload name="profileImg" height="200px" onFileSelect={handleFileSelect} />
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
              disabled={!isValid || loading2}
              onClick={handleUserInfoSubmit}>
              {!loading2 ? (
                <>
                  <span className="mx-8 text-white font-bold">저장</span>
                  <Save />
                </>
              ) : (
                <Lottie options={{ loop: true, autoplay: true, animationData }} />
              )}
            </Button>
          </div>
          <ul className={css.user__info__list__wrap}>
            <li>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className="custom__input__readonly"
                    label="유저 ID"
                    InputProps={{
                      readOnly: true,
                    }}
                    type="text"
                    error={!!errors.userId}
                    helperText={errors?.userId?.message}
                    required
                  />
                )}
              />
            </li>
            <li>
              <Controller
                name="roleName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="유저 권한"
                    className="custom__input__readonly"
                    InputProps={{
                      readOnly: true,
                    }}
                    type="text"
                    error={!!errors.roleName}
                    helperText={errors?.roleName?.message}
                    required
                  />
                )}
              />
            </li>
            <li>
              <Controller
                name="authValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="본인 인증 이메일"
                    className="custom__input__readonly"
                    InputProps={{
                      readOnly: true,
                    }}
                    type="text"
                    error={!!errors.authValue}
                    helperText={errors?.authValue?.message}
                    required
                  />
                )}
              />
            </li>
            <li>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="유저명"
                    type="text"
                    error={!!errors.userName}
                    helperText={errors?.userName?.message}
                    required
                  />
                )}
              />
            </li>
            <li>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="새비밀번호"
                    error={!!errors.newPassword}
                    helperText="6자리 이상 12자리 이하로 입력해주세요."
                  />
                )}
              />
            </li>
            <li>
              <Controller
                name="newPasswordCheck"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="새비밀번호 확인"
                    error={!!errors.newPasswordCheck}
                    helperText="6자리 이상 12자리 이하로 입력해주세요."
                  />
                )}
              />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProfileSetting;
