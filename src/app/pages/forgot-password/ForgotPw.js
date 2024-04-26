import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Paper, TextField, Typography, Link } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome';
import css from 'assets/css/signup.module.css';
import { postAuthCode, checkAuthCode } from 'app/pages/sign-up/store/SingUpSlice';
import { putUserPassword } from './store/ForgotPwSlice';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeCount = useRef(120);
  const intervalIdRef = useRef(null);
  const timeoutText = useRef(null);
  const { step } = useParams();
  const [loading, setLoading] = useState(false); // 인증번호 발급 api, 인증번호 체크, 새 비밀번호 적용
  const [authStep, setAuthStep] = useState(1);
  const [timeout, setTimeout] = useState(false);
  const [authValue, setAuthValue] = useState(null); // 이메일 or 휴대폰번호
  const [authCode, setAuthCode] = useState(null); // 인증번호 발급후 set
  const schema = yup.object().shape({
    userId: yup
      .string()
      .required('유저ID를 입력해주세요.')
      .min(6, '아이디는 6자 이상으로 입력해주세요.')
      .max(12, '아이디는 12자 이하로 입력해주세요.')
      .matches(/^[A-Za-z0-9]+$/, '유저ID는 영문 + 숫자 조합으로 입력해주세요.'),
    userName: yup
      .string()
      .required('유저명을 입력해주세요.')
      .min(2, '유저명은 2자 이상으로 입력해주세요.')
      .max(8, '유저명은 8자 이하로 입력해주세요'),
    authCode: yup
      .string()
      .required('인증번호를 입력해주세요.')
      .min(8, '인증번호는 8자 입니다.')
      .max(8, '인증번호는 8자 입니다.'),
    password: yup
      .string()
      .required('비밀번호를 입력해 주세요.')
      .min(8, '비밀번호는 최소 6자 이상으로 입력해 주세요.')
      .max(12, '비밀번호는 최소 12자 이하로 입력해 주세요.'),
    passwordCheck: yup
      .string()
      .required('비밀번호를 확인해주세요.')
      .oneOf([yup.ref('password')], '비밀번호를 확인해주세요'),
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

  const updateUserPassword = async () => {
    setLoading(true);
    try {
      const { userId, password } = getValues();
      const { payload } = await dispatch(
        putUserPassword({ userId, password, authValue, authCode })
      );
      switch (payload.status) {
        case 200:
          toast.success('비밀번호가 변경되었습니다. 새로운 비밀번호로 로그인하세요.');
          navigate('/sign-in');
          break;
        case 401:
          toast.warning('인증정보가 유효하지 않습니다. 다시 시도해주세요.');
          handleResetPage();
          break;
        default:
      }
    } catch (err) {
      toast.error('비밀번호 변경중 에러가 발생하였습니다.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthCodeCheck = async () => {
    setLoading(true);
    try {
      const { payload } = await dispatch(
        checkAuthCode({
          authValue,
          authCode: getValues().authCode,
        })
      );
      switch (payload.status) {
        case 200:
          timeCount.current = 120;
          await setAuthCode(payload.data);
          clearInterval(intervalIdRef.current);
          navigate('/forgot-password/3');
          break;
        case 400:
          toast.warning('8자리 인증코드를 한번 더 확인해주세요.');
          break;
        default:
      }
    } catch (err) {
      console.log(err);
      toast.error('인증코드 확인중 에러가 발생하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPage = () => {
    navigate('/forgot-password/1');
    setAuthStep(1);
  };

  const handleAuthCheck = (param) => {
    if (param === 2 && !authValue) {
      toast.warning('유저정보를 입력해주세요.');
      handleResetPage();
    } else if (param === 3 && !authCode) {
      toast.warning('인증번호 발급을 통한 인증을 진행해주세요.');
      handleResetPage();
    }
  };

  const handlePostAuthCode = async () => {
    setLoading(true);
    try {
      const { userId, userName } = getValues();
      const { payload } = await dispatch(postAuthCode({ userId, userName, forgotPw: true }));
      switch (payload.status) {
        case 200:
          setAuthValue(payload.data.authValue);
          navigate('/forgot-password/2');
          intervalIdRef.current = setInterval(() => {
            if (timeCount.current <= 0) {
              setTimeout(true);
              timeCount.current = 120;
              clearInterval(intervalIdRef.current);
            }
            if (timeoutText.current) {
              timeoutText.current.textContent = `${String(
                Math.floor(timeCount.current / 60)
              ).padStart(2, '0')} : ${String(timeCount.current % 60).padStart(2, '0')}`;
              timeCount.current -= 1;
            } else {
              timeCount.current = 120;
              clearInterval(intervalIdRef.current);
            }
          }, 1000);
          toast.info(
            `인증코드를 전송했습니다. ${payload.data.authType === 'email' ? '이메일' : '휴대폰'
            }을 확인해주세요`
          );
          break;
        case 404:
          toast.warning('입력하신 유저정보와 일치하는 계정이 없습니다.');
          break;
        default:
      }
    } catch (error) {
      toast.error('인증코드 발급중 에러가 발생하였습니다.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAuthStep(Number(step));
    if (step && step >= 1 && step <= 3) {
      switch (Number(step)) {
        case 1:
          setTimeout(false);
          setValue('userId', '', activeOption);
          setValue('userName', '', activeOption);
          break;
        case 2:
          setValue('authCode', '', activeOption);
          handleAuthCheck(2);
          break;
        case 3:
          setValue('password', '', activeOption);
          setValue('passwordCheck', '', activeOption);
          handleAuthCheck(3);
          break;
        default:
        //
      }
    } else {
      handleResetPage();
    }
  }, [step]);

  return (
    <>
      <div className={css.signin__wrap}>
        <Paper className={css.paper}>
          <div className={css.signin__wrap__inner}>
            <div className={css.left__section}>
              <div className={css.left__inner}>
                <h1 className={`f__bold ${css.main__title}`}>
                  {authStep === 1 && '유저 정보 입력'}
                  {authStep === 2 && '본인 인증 번호 입력'}
                  {authStep === 3 && '비밀번호 재설정'}
                </h1>
                <div className={css.content}>
                  {authStep === 1 && (
                    <>
                      <div className={css.sign__up__item}>
                        <Controller
                          name="userName"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              style={{ marginBottom: 12 }}
                              label="유저명"
                              type="text"
                              error={!!errors.userName}
                              helperText={errors?.userName?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                        <Controller
                          name="userId"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="유저ID"
                              type="text"
                              autoFocus
                              error={!!errors.userId}
                              helperText={errors?.userId?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                      <div className={css.signup__btn__wrap}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="custom__btn f__medium"
                          size="large"
                          fullWidth
                          disabled={!!errors.userName || !!errors.userId || loading}
                          onClick={() => {
                            handlePostAuthCode();
                          }}>
                          {loading ? (
                            <Lottie options={{ loop: true, autoplay: true, animationData }} />
                          ) : (
                            <span className="mx-8 text-white font-bold">인증번호 받기</span>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                  {authStep === 2 && (
                    <>
                      <div className={css.timeout__input}>
                        {!timeout && (
                          <p
                            className="f__medium"
                            style={{ marginBottom: '12px', textAlign: 'right' }}
                            ref={timeoutText}
                          />
                        )}
                        <Controller
                          name="authCode"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              placeholder="8자리 인증코드"
                              label="인증코드"
                              type="text"
                              autoFocus
                              error={!!errors.authCode}
                              helperText={errors?.authCode?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        style={{ marginBottom: 12 }}
                        disabled={!!errors.authCode || timeout || loading}
                        onClick={() => {
                          handleAuthCodeCheck();
                        }}>
                        {loading ? (
                          <Lottie options={{ loop: true, autoplay: true, animationData }} />
                        ) : (
                          <span className="mx-8 text-white font-bold">인증 확인</span>
                        )}
                      </Button>
                      {timeout && (
                        <p
                          className="f__medium"
                          style={{ margin: '12px 0', textAlign: 'center', color: '#d32f2f' }}>
                          인증번호가 만료되었습니다.
                        </p>
                      )}
                    </>
                  )}
                  {authStep === 3 && (
                    <>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="새 비밀번호"
                            autoFocus
                            style={{ marginBottom: 12 }}
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            required
                            fullWidth
                          />
                        )}
                      />
                      <Controller
                        name="passwordCheck"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-24"
                            label="새 비밀번호 확인"
                            autoFocus
                            style={{ marginBottom: 12 }}
                            type="password"
                            error={!!errors.passwordCheck}
                            helperText={errors?.passwordCheck?.message}
                            variant="outlined"
                            required
                            fullWidth
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        style={{ marginBottom: 12 }}
                        disabled={_.isEmpty(dirtyFields) || !isValid || loading}
                        fullWidth
                        onClick={() => {
                          updateUserPassword();
                        }}>
                        {loading ? (
                          <Lottie options={{ loop: true, autoplay: true, animationData }} />
                        ) : (
                          <span className="mx-8 text-white font-bold">확인</span>
                        )}
                      </Button>
                    </>
                  )}
                </div>
                <div className={css.signin__notice}>
                  <Typography className="f__regular">
                    이전 페이지로 돌아가시겠어요?&nbsp;
                  </Typography>
                  <Link
                    className="f__medium"
                    onClick={() => {
                      if (Number(step) === 1) {
                        navigate(`/sign-in`);
                      } else if (Number(step) === 3) {
                        setAuthValue(null);
                        navigate(`/forgot-password/${Number(step) - 1}`);
                      } else {
                        navigate(`/forgot-password/${Number(step) - 1}`);
                      }
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

export default SignInPage;
