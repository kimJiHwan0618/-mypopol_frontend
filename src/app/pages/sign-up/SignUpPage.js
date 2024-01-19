import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Paper, Typography, Link, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Email, Smartphone } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import css from 'assets/css/signup.module.css';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome'
import { postAuthCode, getUser } from './store/SingUpSlice';

function SignUpPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // 유저 인증코드 api
  const [loading2, setLoading2] = useState(false); // id 중복체크 api
  const [authStep, setAuthStep] = useState(1); // 1 : 인증타입 선택, 2 : 인증번호 입력, 3 : 아이디 비밀번호 입력
  const [authType, setAuthType] = useState(null); // 휴대폰, 이메일
  const [authKey, setAuthKey] = useState(null);
  const [userIdCheck, setUserIdCheck] = useState(false);
  const schema = yup.object().shape({
    userId: yup.string().required('유저ID를 입력해 주세요.').max(12, '아이디는 12자 이하로 입력해주세요.'),
    userEmail: yup.string().required('이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
    authKey: yup.string().required('인증번호를 입력해주세요.').min(8, '인증번호는 8자 입니다.').max(8, '인증번호는 8자 입니다.'),
    password: yup
      .string()
      .required('비밀번호를 입력해 주세요.')
      .min(8, '비밀번호는 최소 8자 이상 입력해 주세요.'),
  });

  const activeOption = {
    shouldDirty: true,
    shouldValidate: true,
  };
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

  const { isValid, dirtyFields, errors } = formState;

  const authTypeClick = (type) => {
    setAuthType(type);
    navigate('/sign-up/2');
  };

  const resetPage = () => {
    navigate('/sign-up/1');
    setAuthStep(1);
  };

  const authCheck = (param) => {
    if (param === 2) {
      if (!authType) {
        toast.warning('인증방법을 선택해주세요.');
        resetPage();
      }
    } else if (param === 3) {
      if (!authKey) {
        toast.warning('본인인증을 진행해주세요.');
        resetPage();
      }
    }
  };

  const authKeyCheckBtnClick = () => {
    if (getValues().authKey === authKey) {
      navigate('/sign-up/3');
    } else {
      toast.warning('8자리 인증코드를 한번 더 확인해주세요.');
    }
  };

  const userIdReset = () => {
    setUserIdCheck(false)
  }

  const handleGetUser = () => {
    setLoading2(true);
    dispatch(getUser({ userId: getValues().userId }))
      .then(({ payload }) => {
        if (payload.status === 200) {
          if (payload.data.users.length === 0) {
            toast.info("사용가능한 ID입니다.")
            setUserIdCheck(true);
          } else {
            toast.warning("사용중인 ID입니다.")
          }
        }
      })
      .catch((error) => {
        toast.error('유저ID 조회중 에러가 발생하였습니다.');
        console.log(error);
      })
      .finally(() => {
        setLoading2(false);
      });
  }

  const handlePostAuthCode = () => {
    setLoading(true);
    dispatch(postAuthCode({ email: getValues().userEmail }))
      .then(({ payload }) => {
        if (payload.status === 200) {
          setAuthKey(payload.data.authKey)
          toast.info('인증코드를 전송했습니다. 메일을 확인해주세요');
        } else {
          toast.error('인증코드 발급중 에러가 발생하였습니다.');
        }
      })
      .catch((error) => {
        toast.error('인증코드 발급중 에러가 발생하였습니다.');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setAuthStep(Number(step));
    if (step && step >= 1 && step <= 3) {
      switch (Number(step)) {
        case 1:
          break;
        case 2:
          setAuthKey(null)
          setValue("userEmail", "", activeOption)
          setValue("authKey", "", activeOption)
          authCheck(2);
          break;
        case 3:
          setUserIdCheck(false);
          setValue("userId", "", activeOption)
          setValue("password", "", activeOption)
          authCheck(3);
          break;
        default:
      }
    } else {
      resetPage();
    }
  }, [step]);

  return (
    <>
      <div className={`${css.signin__wrap} vertical__scroll`}>
        <Paper className={css.paper}>
          <div className={css.signin__wrap__inner}>
            <div className={css.left__section}>
              <div className={css.left__inner}>
                <h1 className={`f__bold ${css.main__title}`}>
                  {authStep === 1 && '본인 인증'}
                  {authStep === 2 && `${authType} 인증`}
                  {authStep === 3 && `계정 정보 입력`}
                </h1>
                <div className={css.content}>
                  {authStep === 1 && (
                    <div className={css.auth__type__btn}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        onClick={() => {
                          authTypeClick('휴대폰');
                        }}>
                        <span className="mx-8 text-white font-bold">휴대폰 인증</span>
                        <Smartphone />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        onClick={() => {
                          authTypeClick('이메일');
                        }}>
                        <span className="mx-8 text-white font-bold">이메일 인증</span>
                        <Email />
                      </Button>
                    </div>
                  )}
                  {authStep === 2 && authType === '이메일' && (
                    <div className={css.sign__up__item}>
                      <Controller
                        name="userEmail"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            placeholder="ex) mypopol@naver.com"
                            label="이메일"
                            autoFocus
                            type="email"
                            error={!!errors.userEmail}
                            helperText={errors?.userEmail?.message}
                            variant="outlined"
                            required
                            fullWidth
                          />
                        )} />
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        disabled={!!errors.userEmail || loading}
                        onClick={() => {
                          handlePostAuthCode();
                        }}>
                        {
                          loading ? (
                            <Lottie options={{ loop: true, autoplay: true, animationData }} />
                          ) : (
                            <span className="mx-8 text-white font-bold">인증번호 받기</span>
                          )
                        }
                      </Button>
                    </div>
                  )}
                  {authStep === 2 && authKey && (
                    <>
                      <Controller
                        name="authKey"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            placeholder="8자리 인증코드 ex)16258725"
                            label="인증코드"
                            type="text"
                            autoFocus
                            error={!!errors.authKey}
                            helperText={errors?.authKey?.message}
                            variant="outlined"
                            required
                            fullWidth
                          />
                        )} />
                      <Button
                        variant="contained"
                        color="secondary"
                        className={`custom__btn f__medium ${css.signup__item__btn}`}
                        size="large"
                        disabled={!!errors.authKey}
                        onClick={() => {
                          authKeyCheckBtnClick();
                        }}>
                        <span className="mx-8 text-white font-bold">인증 확인</span>
                      </Button>
                    </>
                  )}
                  {
                    authStep === 3 && authKey && (
                      <>
                        <div className={css.sign__up__item}>
                          <Controller
                            name="userId"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                className="mb-24"
                                label="유저ID"
                                type="text"
                                InputProps={{
                                  readOnly: userIdCheck,
                                  className: userIdCheck ? "custom__input__readonly" : ""
                                }}
                                error={!!errors.userId}
                                helperText={errors?.userId?.message}
                                variant="outlined"
                                required
                                fullWidth
                              />
                            )} />
                          <Button
                            variant="contained"
                            color="secondary"
                            className="custom__btn f__medium"
                            size="large"
                            disabled={!!errors.userId || loading2 || userIdCheck}
                            onClick={() => {
                              handleGetUser();
                            }}>
                            {
                              loading2 ? (
                                <Lottie options={{ loop: true, autoplay: true, animationData }} />
                              ) : (
                                <span className="mx-8 text-white font-bold">중복 확인</span>
                              )
                            }
                          </Button>
                        </div>
                        {
                          userIdCheck && (
                            <Button
                              variant="contained"
                              color="secondary"
                              className={`custom__btn f__medium ${css.signup__item__btn}`}
                              size="large"
                              onClick={() => {
                                userIdReset();
                              }}>
                              <span className="mx-8 text-white font-bold">유저ID 재입력</span>
                            </Button>
                          )
                        }
                      </>
                    )
                  }
                </div>
                <div className={css.signin__notice}>
                  <Typography className="f__regular">
                    이전 페이지로 돌아가시겠어요?&nbsp;
                  </Typography>
                  <Link
                    className="f__medium"
                    onClick={() => {
                      navigate(-1);
                    }}>
                    뒤로가기
                  </Link>
                </div>
                <div className={css.signin__notice}>
                  <Typography className="f__regular">계정이 있으신가요?&nbsp;</Typography>
                  <Link
                    className="f__medium"
                    onClick={() => {
                      navigate('/sign-in');
                    }}>
                    로그인
                  </Link>
                </div>
              </div>
            </div>
            <div className={css.right__section}>
              <Welcome />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default SignUpPage;
