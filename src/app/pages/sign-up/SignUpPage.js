import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Paper, Typography, Link, TextField, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Email, Smartphone, OpenInNew as LinkIcon } from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import * as yup from 'yup';
import _ from '@lodash';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import css from 'assets/css/signup.module.css';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome';
import templatesJson from 'app/data/signUp/templates.json';
import dateParser from 'app/utils/dateParser';
import classnames from 'classnames';
import jwtService from 'app/auth/services/jwtService';
import { postAuthCode, getUser, postUser } from './store/SingUpSlice';

function SignUpPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // 유저 인증코드 api
  const [loading2, setLoading2] = useState(false); // id 중복체크 api
  const [loading3, setLoading3] = useState(false); // 유저생성 api
  const [authStep, setAuthStep] = useState(1); // 1 : 인증타입 선택, 2 : 인증번호 입력, 3 : 아이디 비밀번호 입력
  const [authType, setAuthType] = useState(null); // 휴대폰, 이메일
  const [authKey, setAuthKey] = useState(null);
  const [userIdCheck, setUserIdCheck] = useState(false);
  const [templateId, setTemplateId] = useState('none');
  const schema = yup.object().shape({
    userName: yup
      .string()
      .required('유저명은 필수정보입니다.')
      .min(2, '유저명은 2자 이상으로 입력해주세요.')
      .max(6, '유저명은 6자 이하로 입력해주세요'),
    userId: yup
      .string()
      .required('유저ID를 입력해 주세요.')
      .min(6, '아이디는 6자 이상으로 입력해주세요.')
      .max(12, '아이디는 12자 이하로 입력해주세요.')
      .matches(/^[A-Za-z0-9]+$/, '유저ID는 영문 + 숫자 조합으로 입력해주세요.'),
    userEmail: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    authKey: yup
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

  const authTypeClick = (type) => {
    setAuthType(type);
    navigate('/sign-up/2');
  };

  const resetPage = () => {
    navigate('/sign-up/1');
    setAuthStep(1);
  };

  const authCheck = (param, snsAuthKey) => {
    if (param === 2 && !authType) {
      toast.warning('인증방법을 선택해주세요.');
      resetPage();
    } else if (param === 3 && !authKey && !snsAuthKey) {
      toast.warning('본인인증을 진행해주세요.');
      resetPage();
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
    setUserIdCheck(false);
  };

  const handleGetUser = async () => {
    setLoading2(true);
    try {
      const { payload } = await dispatch(getUser({ userId: getValues().userId }));
      if (payload.status === 200) {
        if (payload.data) {
          toast.info('사용가능한 ID입니다.');
          setValue('password', '', activeOption);
          setValue('passwordCheck', '', activeOption);
          setUserIdCheck(true);
        } else {
          toast.warning('사용중인 ID입니다.');
        }
      } else {
        toast.error(payload);
      }
    } catch (error) {
      toast.error('유저ID 조회중 에러가 발생하였습니다.');
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const handleSignUpUser = async () => {
    setLoading3(true);
    let authVal1;
    let authVal2;
    switch (authType) {
      case '휴대폰':
        authVal1 = 'phone';
        authVal2 = ''; // 휴대폰 번호 인증시 휴대전화 번호
        break;
      case '이메일':
        authVal1 = 'email';
        authVal2 = getValues().userEmail;
        break;
      default:
        break;
    }
    try {
      const params = {
        ...getValues(),
        templateId,
        popolName: templatesJson.filter((obj) => obj.id === templateId)[0]?.popolName,
        title: templatesJson.filter((obj) => obj.id === templateId)[0]?.title,
        userKey: dateParser(new Date())
          .replaceAll(':', '')
          .replaceAll('-', ' ')
          .replaceAll(' ', '')
          .trim(),
        authType: authVal1,
        authValue: authVal2,
        phone: authType === '휴대폰' ? '' : '010-0000-0000', // 휴대폰 번호 인증시 휴대전화 번호
        email: authType === '이메일' ? getValues().userEmail : '',
      };
      const { payload } = await dispatch(postUser(params));
      if (payload.status === 200) {
        jwtService.setSession(payload.data.accessToken);
        jwtService.emit('onLogin', payload.data);
        toast.success('유저 생성이 완료되었습니다!');
      }
    } catch (error) {
      toast.error('유저 생성중에 에러가 발생하였습니다.');
      console.log(error);
    } finally {
      setLoading3(false);
    }
  };

  const handlePostAuthCode = async () => {
    setLoading(true);
    try {
      const { payload } = await dispatch(postAuthCode({ userEmail: getValues().userEmail }));
      if (payload.status === 200) {
        if (payload.data) {
          setAuthKey(payload.data.authKey);
          toast.info('인증코드를 전송했습니다. 메일을 확인해주세요');
        } else {
          toast.warning('유저 계정에서 사용중인 이메일입니다. 다른메일을 입력해주세요.');
        }
      } else {
        toast.error(payload);
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
    const userEmail = location.state?.userEmail;
    if (step && step >= 1 && step <= 3) {
      switch (Number(step)) {
        case 1:
          break;
        case 2:
          setAuthKey(null);
          setValue('userEmail', '', activeOption);
          setValue('authKey', '', activeOption);
          authCheck(2);
          break;
        case 3:
          setValue('userName', '', activeOption);
          setValue('userId', '', activeOption);
          setValue('password', '', activeOption);
          setValue('passwordCheck', '', activeOption);
          setUserIdCheck(false);
          if (userEmail) {
            const snsAuthKey = String(new Date().getTime()).slice(-8);
            setValue('userEmail', userEmail, activeOption);
            setValue('authKey', snsAuthKey, activeOption);
            setAuthKey(snsAuthKey);
            setAuthType('이메일');
            authCheck(3, snsAuthKey);
          } else {
            authCheck(3);
          }
          break;
        case 4:
          setTemplateId('none');
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
          <div className={`${css.signin__wrap__inner} vertical__scroll`}>
            <div className={`${css.left__section} vertical__scroll`}>
              <div
                className={classnames([
                  `${css.left__inner}`,
                  { [css.step3__content__wrap]: authStep === 3 },
                ])}>
                <h1 className={`f__bold ${css.main__title}`}>
                  {authStep === 1 && '본인 인증'}
                  {authStep === 2 && `${authType} 인증`}
                  {authStep === 3 && `계정 정보 입력`}
                  {authStep === 4 && `템플릿 선택하기`}
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
                        )}
                      />
                      <div className={css.signup__btn__wrap}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="custom__btn f__medium"
                          size="large"
                          fullWidth
                          disabled={!!errors.userEmail || loading}
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
                        )}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        style={{ marginBottom: 12 }}
                        disabled={!!errors.authKey}
                        onClick={() => {
                          authKeyCheckBtnClick();
                        }}>
                        <span className="mx-8 text-white font-bold">인증 확인</span>
                      </Button>
                    </>
                  )}
                  {authStep === 3 && authKey && (
                    <>
                      <div className={css.sign__up__item}>
                        {userIdCheck && (
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
                        )}
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
                                className: userIdCheck ? 'custom__input__readonly' : '',
                              }}
                              error={!!errors.userId}
                              helperText={errors?.userId?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                        <div className={css.signup__btn__wrap}>
                          {!userIdCheck && (
                            <Button
                              variant="contained"
                              color="secondary"
                              className="custom__btn f__medium"
                              size="large"
                              fullWidth
                              disabled={!!errors.userId || loading2 || userIdCheck}
                              onClick={() => {
                                handleGetUser();
                              }}>
                              {loading2 ? (
                                <Lottie options={{ loop: true, autoplay: true, animationData }} />
                              ) : (
                                <span className="mx-8 text-white font-bold">중복 확인</span>
                              )}
                            </Button>
                          )}
                          {userIdCheck && (
                            <Button
                              variant="contained"
                              color="secondary"
                              className="custom__btn f__medium"
                              size="large"
                              fullWidth
                              onClick={() => {
                                userIdReset();
                              }}>
                              <span className="mx-8 text-white font-bold">유저ID 재입력</span>
                            </Button>
                          )}
                        </div>
                        {userIdCheck && (
                          <>
                            <Controller
                              name="password"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  className="mb-24"
                                  label="비밀번호"
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
                                  label="비밀번호 확인"
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
                              disabled={_.isEmpty(dirtyFields) || !isValid}
                              fullWidth
                              onClick={() => {
                                setAuthStep(4);
                              }}>
                              <span className="mx-8 text-white font-bold">템플릿 선택하기</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  {authStep === 4 && authKey && (
                    <>
                      <div className={css.template__selector__wrap}>
                        <TextField
                          select
                          value={templateId}
                          label="타입"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setTemplateId(e.target.value);
                          }}>
                          <MenuItem key="none" value="none">
                            템플릿 타입을 선택해주세요.
                          </MenuItem>
                          {templatesJson.map((obj, idx) => (
                            <MenuItem key={obj.id} value={obj.id}>
                              {obj.popolName}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="custom__btn f__medium"
                          disabled={templateId === 'none'}
                          fullWidth
                          onClick={() => {
                            window.open(
                              `${templatesJson.filter((obj) => obj.id === templateId)[0]?.link}`,
                              '_blank',
                              'noopener,noreferrer'
                            );
                          }}>
                          <LinkIcon />
                        </Button>
                      </div>
                      <p className={css.template__licenses__txt}>
                        템플릿은 계정생성시 1개 생성 가능합니다.
                      </p>
                      {templateId !== 'none' && (
                        <dl className={`f__regular ${css.template__notice}`}>
                          <dt>설명</dt>
                          <dd>
                            {templatesJson.filter((obj) => obj.id === templateId)[0]?.summary}
                          </dd>
                        </dl>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        className="custom__btn f__medium"
                        size="large"
                        fullWidth
                        style={{ marginBottom: 12 }}
                        disabled={templateId === 'none' || loading3}
                        onClick={() => {
                          handleSignUpUser();
                        }}>
                        {loading3 ? (
                          <Lottie options={{ loop: true, autoplay: true, animationData }} />
                        ) : (
                          <span className="mx-8 text-white font-bold">유저 생성</span>
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
                      } else {
                        navigate(`/sign-up/${Number(step) - 1}`);
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

export default SignUpPage;
