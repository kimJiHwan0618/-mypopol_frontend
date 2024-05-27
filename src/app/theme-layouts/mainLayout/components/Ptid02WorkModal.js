import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from 'react-modal';
import css from 'assets/css/workPopup.module.css';
import css2 from 'assets/css/pageManagement.module.css';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';
import { toast } from 'react-toastify';
import convertFile from 'app/utils/convertFile';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import _ from '@lodash';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import ImgPreview from 'app/theme-layouts/mainLayout/components/pageManagement/ImgPreview';
import { setSearchedFlag } from 'app/pages/dashboard/templateDashboard/store/TemplateDashboardSlice';
import { addOrUpdateWork } from 'app/pages/templateManagement/pageManagement/store/PageTemplateSlice';

const Ptid02WorkModal = ({ isOpen, onRequestClose, popInfo, addWorkResult, updateWorkResult }) => {
  // const siteListData = [];
  /** 예외 케이스는 추후 반영 예정 */
  // // { name: '그 외', value: 'etc' },
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [poster02Img, setPoster02Img] = useState(null);
  const activeOption = {
    shouldDirty: true,
    shouldValidate: true,
  };
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required('프로젝트명은 필수 정보 입니다.'),
    subTitle: yup.string().required('부제는 필수 정보 입니다.'),
    summary: yup.string().required('소개는 필수 정보 입니다.'),
    skill: yup.string().required('주요기술은 필수 정보 입니다.'),
    date: yup.string().required('프로젝트 기한은 필수 정보 입니다.'),
    detail: yup.string().required('상세업무는 필수 정보 입니다.'),
    ptId02poster: yup.string(),
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
    // ptId02poster;
    if (arg.file.type.startsWith('image/')) {
      switch (arg.name) {
        case 'ptId02poster':
          setPoster02Img(arg.file);
          setValue('ptId02poster', '', activeOption);
          break;
        default:
          console.log('default case');
      }
      URL.revokeObjectURL(arg.file);
      setValue(arg.name, arg.file.name);
    } else {
      toast.warning('이미지 파일을 선택해주세요!');
    }
  };

  const setImgFile = (imgFileName, backFileName, setImgFile, ptId, src) => {
    if (imgFileName !== null && imgFileName !== undefined && imgFileName !== '') {
      setValue(backFileName, imgFileName, activeOption);
      const remoteImageUrl = `https://site.mypopol.com/${ptId}/${user.userId}/img/${src}/${imgFileName}`;
      const fileName = imgFileName;
      const imgType =
        `${imgFileName.split('.')[1]}` === 'jpg' ? 'jpeg' : `${imgFileName.split('.')[1]}`;
      convertFile(remoteImageUrl, fileName, `image/${imgType}`, async function (error, file) {
        if (error) {
          toast.error(error);
          return;
        }

        const loadComplate = () => {
          setImgFile(file);
        };

        await loadComplate();
      });
    }
  };

  useEffect(() => {
    reset();
    setValue('popolSeq', popInfo.popolSeq, activeOption);
    setValue('workId', 1, activeOption);
    if (popInfo.state === '추가') {
      setValue('title', '', activeOption);
      setValue('subTitle', '', activeOption);
      setValue('summary', '', activeOption);
      setValue('skill', '', activeOption);
      setValue('detail', '', activeOption);
      setPoster02Img(null);
    } else if (popInfo.state === '수정') {
      const etc = JSON.parse(popInfo.workInfo.etc);
      setValue('date', etc.date, activeOption);
      setValue('title', popInfo.workInfo.title, activeOption);
      setValue('subTitle', popInfo.workInfo.subTitle, activeOption);
      setValue('summary', popInfo.workInfo.summary, activeOption);
      setValue('ptId02poster', popInfo.workInfo.poster, activeOption);
      setValue('skill', etc.skill, activeOption);
      setValue('detail', etc.detail, activeOption);
      setValue('src', popInfo.workInfo.src, activeOption);
      setValue('workSeq', popInfo.workInfo.workSeq, activeOption);
      setValue('order', popInfo.workInfo.order, activeOption);
      popInfo.workInfo.poster === 'none'
        ? setValue('posterImgOld', popInfo.workInfo.poster, activeOption)
        : setImgFile(
          popInfo.workInfo.poster,
          'posterImgOld',
          setPoster02Img,
          popInfo.ptId,
          popInfo.workInfo.src
        );
      setValue('titleImgOld', popInfo.workInfo.logo, activeOption)
    }
  }, [isOpen]);

  const workSaveClick = () => {
    const fileObj = {};
    if (popInfo.ptId === 'ptid02') {
      fileObj.posterImg = poster02Img;
      fileObj.titleImg = null;
    };

    const posterImgName = fileObj.posterImg === null ? 'none' : fileObj.posterImg.name;
    const titleImgName = fileObj.titleImg === null ? 'none' : fileObj.titleImg.name;

    const param = {
      fields: {
        ...getValues(),
        ...{
          userId: user.userId,
          ptId: popInfo.ptId,
          userKey: user.userKey,
          poster: posterImgName,
          logo: titleImgName
        },
        state: popInfo.state,
        etc: JSON.stringify({
          date: getValues('date'),
          detail: getValues('detail').replaceAll('\n', '\\n'),
          skill: getValues('skill'),
        }),
      },
      files: fileObj,
    };

    setLoading(true);
    dispatch(addOrUpdateWork(param))
      .then(({ payload }) => {
        if (payload.status === 200) {
          if (popInfo.state === '추가') {
            addWorkResult(payload.data.response);
          }
          if (popInfo.state === '수정') {
            updateWorkResult(payload.data.response);
          }
          dispatch(setSearchedFlag({ works: false }));
          onRequestClose();
          toast.success(`프로젝트가 ${popInfo.state}되었습니다.`);
        } else {
          toast.error(`프로젝트 ${popInfo.state} 에러.`)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`프로젝트 ${popInfo.state} 실패`);
      })
      .finally(() => {
        setLoading(false);
      });
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
      contentLabel={`프로젝트 `}
      style={customStyles}>
      <button
        onClick={() => {
          onRequestClose();
        }}
        className={css.popop__close__button}>
        {/*  */}
      </button>
      <div className={`${css.wrap__inner} vertical__scroll`}>
        <div className={css2.list__item}>
          <p className="f__medium">
            프로젝트 이미지<span>&nbsp;(정사각형 이미지를 권장합니다!)</span>
          </p>
          {poster02Img === null || !poster02Img.type.startsWith('image/') ? (
            <div>
              <FileUpload name="ptId02poster" onFileSelect={handleFileSelect} height="361px" />
            </div>
          ) : (
            <>
              <div className={css.ptid02__banner__box}>
                <ImgPreview imgFile={poster02Img} />
              </div>
              <Controller
                name="ptId02poster"
                control={control}
                render={({ field }) => (
                  <div className={css2.file__status}>
                    <p className="f__regular">{field.value}</p>
                    <span
                      onClick={(e) => {
                        setPoster02Img(null);
                        setValue('ptId02poster', '', activeOption);
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
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{ shrink: true }}
                className="mb-24"
                label="프로젝트 기간"
                autoFocus
                type="text"
                error={!!errors.date}
                helperText={errors?.date?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </div>
        <div className={css2.list__item}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{ shrink: true }}
                className="mb-24"
                label="프로젝트명"
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
                InputLabelProps={{ shrink: true }}
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
            name="skill"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{ shrink: true }}
                className="mb-24"
                fullWidth
                label="주요기술"
                error={!!errors.skill}
                helperText={errors?.skill?.message}
                autoFocus
                required
                variant="outlined"
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
                InputLabelProps={{ shrink: true }}
                className="mb-24"
                fullWidth
                label="소개글"
                rows={2}
                multiline
                error={!!errors.summary}
                helperText={errors?.summary?.message}
                autoFocus
                required
                variant="outlined"
              />
            )}
          />
        </div>
        <div className={css2.list__item}>
          <Controller
            name="detail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{ shrink: true }}
                className="mb-24"
                fullWidth
                label="상세업무"
                rows={3}
                multiline
                error={!!errors.detail}
                helperText={errors?.detail?.message}
                autoFocus
                required
                variant="outlined"
              />
            )}
          />
        </div>
        <div className={`${css.save__btn__wrap}`}>
          <Button
            variant="contained"
            className="custom__btn"
            disabled={_.isEmpty(dirtyFields) || !isValid || loading}
            onClick={() => {
              workSaveClick();
            }}>
            {!loading ? (
              <>
                <span className="f__medium">프로젝트 {popInfo.state}</span>
                <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <use
                    href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#${popInfo.state === '추가' ? 'plus' : 'pencil'
                      }`}
                  />
                </svg>
              </>
            ) : (
              <Lottie options={{ loop: true, autoplay: true, animationData }} />
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Ptid02WorkModal;
