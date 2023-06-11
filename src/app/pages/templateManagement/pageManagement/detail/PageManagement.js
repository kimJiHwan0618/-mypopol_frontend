import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selectUser } from 'app/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { DetailTitleBar } from 'app/theme-layouts/mainLayout/components';
import { useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import css from 'assets/css/pageManagement.module.css';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { useEffect, useState, useRef } from 'react';
import convertFile from 'app/utils/convertFile';
import { toast } from 'react-toastify';
import { MenuItem, TextField, Button } from '@mui/material';
import { updatePageTem } from '../store/PageTemplateSlice';
import { setSearchedFlag } from '../store/PageTemplatesSlice';

function PageManagement() {
  // const routeParams = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const [profileImg, setProfileImg] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [snsSelected, setSnsSelected] = useState('twitter');
  const [snsList, setSnsList] = useState({});
  const popolSection = useRef(null);
  const profileSection = useRef(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const activeOption = {
    shouldDirty: true,
    shouldValidate: true,
  };

  const schema = yup.object().shape({
    popolName: yup.string().required('포폴명은 필수 정보 입니다.'),
    thumbnail: yup.string(), // 파일여부?
    mainColor: yup.string().notOneOf([' ', null], '메인색상을 선택해 주세요.'),
    icon: yup.string().notOneOf([' ', null], '아이콘타입을 선택해 주세요.'),
    fakeName: yup.string(),
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일은 필수 정보 입니다.'),
    phone: yup.string().matches(/^[0-9]{9,11}$/i, "번호는 '-' 없이 9~11자리 번호로 입력해주세요"),
    title: yup.string(),
    profile: yup.string(), // 파일여부?
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
  const form = watch();

  const handleFileSelect = (arg) => {
    arg.file = new File([arg.file], arg.file.name.replaceAll(' ', ''), { type: arg.file.type });
    if (arg.file.type.startsWith('image/')) {
      switch (arg.name) {
        case 'thumbnail':
          setThumbnailImg(arg.file);
          popolSection.current.style.height = 'auto';
          break;
        case 'profile':
          setProfileImg(arg.file);
          profileSection.current.style.height = 'auto';
          break;
        default:
          console.log('default case');
      }
      setValue(arg.name, arg.file.name);
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  const saveBtnClick = () => {
    const snsKeys = Object.keys(snsList);
    const clone = JSON.parse(JSON.stringify(snsList));
    for (let i = 0; i < snsKeys.length; i += 1) {
      clone[`${snsKeys[i]}`].id = `${getValues()[`${snsKeys[i]}Id`]}`;
      clone[`${snsKeys[i]}`].link = `${getValues()[`${snsKeys[i]}Link`]}`;
    }
    setSnsList(clone);
    const param = {
      fields: {
        ...getValues(),
        ...{ userId: user.userId, ptId: location.state.template.ptId, userKey: user.userKey },
        snsList: Object.keys(snsList).length === 0 ? '' : JSON.stringify(snsList),
      },
      files: {
        profileImg,
        thumbnailImg,
      },
    };
    param.fields.phone = param.fields.phone.replace(/(\d{3})(\d{3,4})(\d{3,4})/, '$1-$2-$3');
    console.log(param);
    setUpdateLoading(true);
    dispatch(updatePageTem(param))
      .then(({ payload }) => {
        if (payload.data.response.code === 200) {
          if (thumbnailImg !== null) {
            setValue('thumbnailOld', thumbnailImg.name, activeOption);
          }
          if (profileImg !== null) {
            setValue('profileOld', profileImg.name, activeOption);
          }
          dispatch(setSearchedFlag(false));
          toast.success('포폴 정보가 업데이트 되었습니다!');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('포폴 업데이트 실패');
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  const sectionTitleClick = (e) => {
    const el = e.currentTarget;
    el.classList.toggle('active');
    if (el.classList.contains('active')) {
      el.childNodes[1].style.transform = 'rotate(0deg)';
      el.nextSibling.style.height = `${el.nextSibling.childNodes[0].offsetHeight}px`;
    } else {
      el.childNodes[1].style.transform = 'rotate(180deg)';
      el.nextSibling.style.height = '0px';
    }
  };

  const setImgFile = (imgFileName, backFileName, setImgFile, ptId) => {
    if (imgFileName !== null && imgFileName !== undefined && imgFileName !== '') {
      setValue(backFileName, imgFileName, activeOption);
      const remoteImageUrl = `https://site.mypopol.com/${ptId}/${user.userId}/img/${imgFileName}`;
      const fileName = imgFileName;
      const imgType =
        `${imgFileName.split('.')[1]}` === 'jpg' ? 'jpeg' : `${imgFileName.split('.')[1]}`;
      convertFile(remoteImageUrl, fileName, `image/${imgType}`, function (error, file) {
        if (error) {
          toast.error(error);
          return;
        }
        setImgFile(file);
      });
    }
  };

  useEffect(() => {
    const {
      popolName,
      thumbnail,
      mainColor,
      fakeName,
      email,
      phone,
      title,
      profileImg: profile,
      ptId,
      icon,
      sns,
    } = location.state.template;
    setValue('popolName', popolName, activeOption);
    setValue('mainColor', mainColor, activeOption);
    setValue('fakeName', fakeName, activeOption);
    setValue('email', email, activeOption);
    setValue('phone', phone.replaceAll('-', ''), activeOption);
    setValue('title', title, activeOption);
    setValue('thumbnail', thumbnail, activeOption);
    setValue('profile', profile, activeOption);
    setValue('icon', icon);
    setImgFile(thumbnail, 'thumbnailOld', setThumbnailImg, ptId);
    setImgFile(profile, 'profileOld', setProfileImg, ptId);
    if (sns !== null && sns !== '' && sns !== undefined) {
      setSnsList(JSON.parse(sns));
      const snsListLocal = JSON.parse(sns);
      const snsKeys = Object.keys(snsListLocal);
      const snsValues = Object.values(snsListLocal);
      for (let i = 0; i < snsKeys.length; i += 1) {
        // 필드 등록
        register(`${snsKeys[i]}Id`, { required: `${snsKeys[i]} 아이디를 입력해주세요` });
        register(`${snsKeys[i]}Link`, { required: `${snsKeys[i]} 링크를 입력해주세요` });
        // 값 세팅
        setValue(`${snsKeys[i]}Id`, snsValues[i].id, activeOption);
        setValue(`${snsKeys[i]}Link`, snsValues[i].link, activeOption);
      }
    }
  }, [setValue, register, setSnsList]);
  return (
    <div className={`section__grid__wrap content common__detail ${css.page__tem__wrap}`}>
      <DetailTitleBar
        saveBtnClick={saveBtnClick}
        isValid={isValid}
        dirtyFields={dirtyFields}
        updateLoading={updateLoading}
      />
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div
            onClick={(e) => {
              sectionTitleClick(e);
            }}
            className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">포폴 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div ref={popolSection} className={`${css.section__content}`}>
            <div className="inner">
              <div className={css.list__item}>
                <p className="f__medium">썸네일 이미지</p>
                {thumbnailImg === null || !thumbnailImg.type.startsWith('image/') ? (
                  <div>
                    <FileUpload
                      name="thumbnail"
                      onFileSelect={handleFileSelect}
                      height="200px"
                      control={control}
                    />
                  </div>
                ) : (
                  <>
                    <div className={css.thumbnail__img__box}>
                      <img src={URL.createObjectURL(thumbnailImg)} alt={thumbnailImg.name} />
                    </div>
                    <Controller
                      name="thumbnail"
                      control={control}
                      render={({ field }) => (
                        <div className={css.file__status}>
                          <p className="f__regular">{field.value}</p>
                          <span
                            onClick={(e) => {
                              setThumbnailImg(null);
                              popolSection.current.style.height = 'auto';
                              setValue('thumbnail', '');
                            }}
                            className={css.remove__btn}
                          />
                        </div>
                      )}
                    />
                  </>
                )}
              </div>
              <div className={css.list__item}>
                <Controller
                  name="popolName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="포폴명"
                      autoFocus
                      type="text"
                      error={!!errors.popolName}
                      helperText={errors?.popolName?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <p className="f__medium">메인 색상</p>
                <ul className={css.color__item__wrap}>
                  {['rgb(255, 182, 59)', 'rgb(75, 135, 224)', 'rgb(75, 224, 149)'].map((color) => (
                    <li
                      onClick={(e) => {
                        setValue('mainColor', color);
                      }}
                      className={getValues().mainColor === color ? css.selected__color : ''}
                      key={color}>
                      <span
                        style={{ backgroundColor: color, boxShadow: `0 10px 14px -5px ${color}` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div
            onClick={(e) => {
              sectionTitleClick(e);
            }}
            className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">프로필 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div ref={profileSection} className={`${css.section__content}`}>
            <div className="inner">
              <div className={css.list__item}>
                <p className="f__medium">프로필 이미지</p>
                {profileImg === null || !profileImg.type.startsWith('image/') ? (
                  <div>
                    <FileUpload
                      name="profile"
                      onFileSelect={handleFileSelect}
                      height="160px"
                      control={control}
                    />
                  </div>
                ) : (
                  <>
                    <div className={css.profile__img__box}>
                      <img src={URL.createObjectURL(profileImg)} alt={profileImg.name} />
                    </div>
                    <Controller
                      name="profile"
                      control={control}
                      render={({ field }) => (
                        <div className={css.file__status}>
                          <p className="f__regular">{field.value}</p>
                          <span
                            onClick={(e) => {
                              setProfileImg(null);
                              profileSection.current.style.height = 'auto';
                              setValue('profile', '');
                            }}
                            className={css.remove__btn}
                          />
                        </div>
                      )}
                    />
                  </>
                )}
              </div>
              <div className={css.list__item}>
                <Controller
                  name="fakeName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="예명"
                      autoFocus
                      type="text"
                      error={!!errors.fakeName}
                      helperText={errors?.fakeName?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      fullWidth
                      label="인사글"
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <TextField
                  select
                  value={getValues().icon}
                  label="아이콘 타입"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setValue('icon', e.target.value);
                  }}>
                  {[
                    { name: '비트맵 아이콘', value: 'bite' },
                    { name: '타입2 아이콘', value: 'ex' },
                  ].map((obj, idx) => (
                    <MenuItem key={obj.value} value={obj.value}>
                      {obj.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={`${css.list__item} ${css.profile__icon__list}`}>
                <div>
                  <span className={css.profile__icon}>
                    <img
                      src={`https://site.mypopol.com/src/img/icon/${getValues().icon}/mail.png`}
                      alt="이메일 아이콘"
                    />
                  </span>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="이메일"
                        autoFocus
                        type="text"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <div>
                  <span className={css.profile__icon}>
                    <img
                      src={`https://site.mypopol.com/src/img/icon/${getValues().icon}/phone.png`}
                      alt="전화 아이콘"
                    />
                  </span>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="전화번호"
                        autoFocus
                        type="text"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
              </div>
              <div className={css.list__item}>
                <p className="f__medium">SNS 정보</p>
                <div className={css.sns__selector}>
                  <TextField
                    select
                    value={snsSelected}
                    label="SNS"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setSnsSelected(e.target.value);
                    }}>
                    {[
                      { name: '트위터', value: 'twitter' },
                      { name: '인스타그램', value: 'instargram' },
                      { name: '유튜브', value: 'youtube' },
                    ].map((obj, idx) => (
                      <MenuItem key={obj.value} value={obj.value}>
                        {obj.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    className="custom__btn"
                    onClick={() => {
                      if (!Object.keys(snsList).includes(snsSelected)) {
                        const clone = JSON.parse(JSON.stringify(snsList));
                        register(`${snsSelected}Id`, {
                          required: `${snsSelected} 아이디를 입력해주세요`,
                        });
                        register(`${snsSelected}Link`, {
                          required: `${snsSelected} 링크를 입력해주세요`,
                        });
                        setValue(`${snsSelected}Id`, '', activeOption);
                        setValue(`${snsSelected}Link`, '', activeOption);
                        clone[`${snsSelected}`] = {
                          name: '',
                          link: '',
                        };
                        setSnsList(clone);
                        profileSection.current.style.height = 'auto';
                      }
                    }}>
                    <span className="f__medium">추가</span>
                    <svg
                      size="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100">
                      <use
                        href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#plus`}
                      />
                    </svg>
                  </Button>
                </div>
                {Object.keys(snsList).map((obj) => (
                  <div className={`${css.sns__item} ${css.profile__icon__list} ${css.flex__row}`}>
                    <span className={css.profile__icon}>
                      <img
                        src={`https://site.mypopol.com/src/img/icon/${getValues().icon}/${obj}.png`}
                        alt={`${obj} icon`}
                      />
                    </span>
                    <Controller
                      name={`${obj}Id`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="아이디"
                          autoFocus
                          type="text"
                          // error={!!errors.fakeName}
                          // helperText={errors?.fakeName?.message}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      )}
                    />
                    <Controller
                      name={`${obj}Link`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="링크"
                          autoFocus
                          type="text"
                          // error={!!errors.fakeName}
                          // helperText={errors?.fakeName?.message}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      )}
                    />
                    <span
                      className={css.remove__btn}
                      onClick={() => {
                        const clone = JSON.parse(JSON.stringify(snsList));
                        delete clone[obj];
                        delete schema.fields[`${obj}Id`];
                        delete schema.fields[`${obj}Link`];
                        profileSection.current.style.height = 'auto';
                        setSnsList(clone);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div
            onClick={(e) => {
              sectionTitleClick(e);
            }}
            className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">웹툰 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div className={`${css.section__content}`}>
            <div className="inner">
              {/* <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageManagement;
