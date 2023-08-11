import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from 'react-modal';
import css from 'assets/css/workPopup.module.css';
import css2 from 'assets/css/pageManagement.module.css';
import { useEffect, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { toast } from 'react-toastify';
import convertFile from 'app/utils/convertFile';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

const Ptid01WorkModal = ({ isOpen, onRequestClose, popInfo }) => {
  const siteListData = [
    { name: '레진코믹스', value: 'lezhin' },
    { name: '카카오페이지', value: 'kakao' },
    { name: '네이버웹툰', value: 'naver' },
    { name: '리디', value: 'ridi' },
    { name: '네이버 시리즈', value: 'series' },
    { name: '봄툰', value: 'bomtoon' },
    { name: '케이툰', value: 'ktoon' },
    /** 예외 케이스는 추후 반영 예정 */
    // // { name: '그 외', value: 'etc' },
  ];
  const user = useSelector(selectUser);
  const [banner01Img, setBanner01Img] = useState(null);
  const [title01Img, setTitle01Img] = useState(null);
  const [siteSelected, setSiteSelected] = useState({ value: 'lezhin', name: '레진코믹스' });
  const [siteList, setSiteList] = useState({});
  const activeOption = {
    shouldDirty: true,
    shouldValidate: true,
  };

  const schema = yup.object().shape({
    title: yup.string().required('작품명은 필수 정보 입니다.'),
    subTitle: yup.string().required('부제는 필수 정보 입니다.'),
    summary: yup.string().required('소개는 필수 정보 입니다.'),
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
    // ptId01Banner;
    if (arg.file.type.startsWith('image/')) {
      switch (arg.name) {
        case 'ptId01Banner':
          setBanner01Img(arg.file);
          console.log(banner01Img);
          break;
        case 'ptId01Logo':
          setTitle01Img(arg.file);
          break;
        default:
          console.log('default case');
      }
      setValue(arg.name, arg.file.name);
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  const setImgFile = (imgFileName, backFileName, setImgFile, ptId, workSeq) => {
    if (imgFileName !== null && imgFileName !== undefined && imgFileName !== '') {
      setValue(backFileName, imgFileName, activeOption);
      const remoteImageUrl = `https://site.mypopol.com/${ptId}/${user.userId}/img/poster${workSeq}/${imgFileName}`;
      const fileName = imgFileName;
      const imgType =
        `${imgFileName.split('.')[1]}` === 'jpg' ? 'jpeg' : `${imgFileName.split('.')[1]}`;
      convertFile(remoteImageUrl, fileName, `image/${imgType}`, async function (error, file) {
        if (error) {
          toast.error(error);
          return;
        }

        const loadComplate = () => {
          console.log(file);
          setImgFile(file);
          // profileSection.current.style.height = 'auto';
          // popolSection.current.style.height = 'auto';
        };

        await loadComplate();
      });
    }
  };

  useEffect(() => {
    if (popInfo.state === '추가') {
      setValue('title', '', activeOption);
      setValue('subTitle', '', activeOption);
      setValue('summary', '', activeOption);
      setSiteList({});
      setBanner01Img(null);
      setTitle01Img(null);
      for (let i = 0; i < siteListData.length; i += 1) {
        delete schema.fields[`${siteListData[i]}Name`];
        delete schema.fields[`${siteListData[i]}Link`];
      }
    } else if (popInfo.state === '수정') {
      setValue('title', popInfo.workInfo.title, activeOption);
      setValue('subTitle', popInfo.workInfo.subTitle, activeOption);
      setValue('summary', popInfo.workInfo.summary, activeOption);
      setValue('ptId01Banner', popInfo.workInfo.poster, activeOption);
      setValue('ptId01Logo', popInfo.workInfo.logo, activeOption);
      setImgFile(
        popInfo.workInfo.poster,
        'banner01ImgOld',
        setBanner01Img,
        popInfo.ptId,
        popInfo.workInfo.workSeq
      );
      setImgFile(
        popInfo.workInfo.logo,
        'title01Old',
        setTitle01Img,
        popInfo.ptId,
        popInfo.workInfo.workSeq
      );
      const siteArr = JSON.parse(popInfo.workInfo.etc).website;
      const siteObj = {};
      for (let i = 0; i < siteArr.length; i += 1) {
        siteObj[siteArr[i].name] = {};
        siteObj[siteArr[i].name].name = siteArr[i].name;
        siteObj[siteArr[i].name].link = siteArr[i].link;
      }
      setSiteList(siteObj);
      const siteKeys = Object.keys(siteObj);
      const siteValues = Object.values(siteObj);
      for (let i = 0; i < siteKeys.length; i += 1) {
        // 필드 등록
        register(`${siteKeys[i]}Name`, { required: `${siteKeys[i]} 아이디를 입력해주세요` });
        register(`${siteKeys[i]}Link`, { required: `${siteKeys[i]} 링크를 입력해주세요` });
        // 값 세팅
        setValue(`${siteKeys[i]}Name`, siteValues[i].name, activeOption);
        setValue(`${siteKeys[i]}Link`, siteValues[i].link, activeOption);
      }
    }
  }, [isOpen]);

  const workSaveClick = () => {
    onRequestClose();
  };

  const customStyles = {
    overlay: {
      zIndex: 9999,
    },
    content: {
      overflow: 'none',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgb(241, 245, 249)',
      padding: '0px',
      inset: 'unset',
      boxShadow: '0 6px 26px 1px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`작품 `}
      style={customStyles}>
      <button
        onClick={() => {
          workSaveClick();
        }}
        className={css.popop__close__button}>
        {/*  */}
      </button>
      <div className={`${css.wrap__inner} vertical__scroll`}>
        <div className={css2.list__item}>
          <p className="f__medium">메인 배너</p>
          {banner01Img === null || !banner01Img.type.startsWith('image/') ? (
            <div>
              <FileUpload
                name="ptId01Banner"
                onFileSelect={handleFileSelect}
                height="361px"
                control={control}
              />
            </div>
          ) : (
            <>
              <div className={css.ptid01__banner__box}>
                <img src={URL.createObjectURL(banner01Img)} alt={banner01Img.name} />
              </div>
              <Controller
                name="ptId01Banner"
                control={control}
                render={({ field }) => (
                  <div className={css2.file__status}>
                    <p className="f__regular">{field.value}</p>
                    <span
                      onClick={(e) => {
                        setBanner01Img(null);
                        setValue('ptId01Banner', '');
                      }}
                      className={css.remove__btn}
                    />
                  </div>
                )}
              />
            </>
          )}
        </div>
        <div className={css2.list__item}>
          <p className="f__medium">타이틀 이미지</p>
          {title01Img === null || !title01Img.type.startsWith('image/') ? (
            <div>
              <FileUpload
                name="ptId01Logo"
                onFileSelect={handleFileSelect}
                height="80px"
                control={control}
              />
            </div>
          ) : (
            <>
              <div className={css.ptid01__title__box}>
                <img src={URL.createObjectURL(title01Img)} alt={title01Img.name} />
              </div>
              <Controller
                name="ptId01Logo"
                control={control}
                render={({ field }) => (
                  <div className={css2.file__status}>
                    <p className="f__regular">{field.value}</p>
                    <span
                      onClick={(e) => {
                        setTitle01Img(null);
                        setValue('ptId01Logo', '');
                      }}
                      className={css.remove__btn}
                    />
                  </div>
                )}
              />
            </>
          )}
        </div>
        <div className={css2.list__item}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="작품명"
                autoFocus
                type="text"
                error={!!errors.title}
                helperText={errors?.title?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </div>
        <div className={css2.list__item}>
          <Controller
            name="subTitle"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="부제"
                autoFocus
                type="text"
                error={!!errors.subTitle}
                helperText={errors?.subTitle?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </div>
        <div className={css2.list__item}>
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                fullWidth
                label="소개글"
                error={!!errors.summary}
                helperText={errors?.summary?.message}
                autoFocus
                multiline
                required
                variant="outlined"
              />
            )}
          />
        </div>
        <div className={css2.list__item}>
          <p className="f__medium">바로가기 링크</p>
          <div className={css.site_selector}>
            <TextField
              select
              value={siteSelected.value}
              label="사이트"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                console.log(e);
                const selectedItem = siteListData.find((obj) => obj.value === e.target.value);
                setSiteSelected({
                  value: e.target.value,
                  name: selectedItem.name,
                });
              }}>
              {siteListData.map((obj, idx) => (
                <MenuItem key={obj.value} value={obj.value} name={obj.name}>
                  {obj.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              className="custom__btn"
              onClick={() => {
                if (
                  !Object.keys(siteList).includes(siteSelected.value)
                  /** 예외 케이스는 추후 반영 예정 */
                  // siteSelected.value === 'etc'
                ) {
                  const clone = JSON.parse(JSON.stringify(siteList));
                  register(`${siteSelected.value}Name`, {
                    required: `${siteSelected.value} 아이디를 입력해주세요`,
                  });
                  register(`${siteSelected.value}Link`, {
                    required: `${siteSelected.value} 링크를 입력해주세요`,
                  });
                  setValue(`${siteSelected.value}Name`, siteSelected.name, activeOption);
                  setValue(`${siteSelected.value}Link`, '', activeOption);
                  clone[`${siteSelected.value}`] = {
                    name: siteSelected.name,
                    link: '',
                  };
                  setSiteList(clone);
                } else {
                  toast.warning(`${siteSelected.name} 사이트 바로가기는 이미 등록되있습니다.`);
                }
              }}>
              <span className="f__medium">추가</span>
              <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <use href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#plus`} />
              </svg>
            </Button>
          </div>
          {Object.keys(siteList).map((obj) => (
            <div key={obj} className={`${css.site__item} ${css.site__icon__list} ${css.flex__row}`}>
              <span className={css.site__icon}>
                <img src={`https://site.mypopol.com/src/img/icon/${obj}.png`} alt={`${obj} icon`} />
              </span>
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
                  const clone = JSON.parse(JSON.stringify(siteList));
                  delete clone[obj];
                  delete schema.fields[`${obj}Name`];
                  delete schema.fields[`${obj}Link`];
                  setSiteList(clone);
                }}
              />
            </div>
          ))}
        </div>
        <div className={`${css.save__btn__wrap}`}>
          <Button
            variant="contained"
            className="custom__btn"
            onClick={() => {
              workSaveClick();
            }}>
            <span className="f__medium">작품 {popInfo.state}</span>
            <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <use
                href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#${popInfo.state === '추가' ? 'plus' : 'pencil'
                  }`}
              />
            </svg>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Ptid01WorkModal;
