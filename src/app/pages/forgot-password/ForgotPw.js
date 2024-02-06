import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Paper, TextField, Typography, Link } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome';
import css from 'assets/css/signup.module.css';

function SignInPage() {
  const { step } = useParams();
  const [loading, setLoading] = useState(false); // 유저 인증코드 api
  const [userIdCheck, setUserIdCheck] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [authStep, setAuthStep] = useState(1);
  const [authValue, setAuthValue] = useState(null);
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
      .max(6, '유저명은 6자 이하로 입력해주세요'),
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

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    console.log(step);
  }, [step]);

  return (
    <>
      <div className={css.signin__wrap}>
        <Paper className={css.paper}>
          <div className={css.signin__wrap__inner}>
            <div className={css.left__section}>
              <div className={css.left__inner}>
                <h1 className={`f__bold ${css.main__title}`}>비밀번호 찾기</h1>
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
                            // handlePostAuthCode();
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

export default SignInPage;
