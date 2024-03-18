import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import _ from '@lodash';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome';
import animationData from 'app/data/loading.json';
import NaverLoginBtn from 'app/pages/sign-in/snsLogin/Naver';
import GoogleLoginBtn from 'app/pages/sign-in/snsLogin/Google';
import css from 'assets/css/signin.module.css';
import jwtService from 'app/auth/services/jwtService';
import { confirmAlert } from 'react-confirm-alert';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
  userId: yup.string().required('유저ID를 입력해 주세요.'),
  password: yup.string().required('비밀번호를 입력해 주세요.'),
});

const defaultValues = {
  userId: '',
  password: '',
};

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const routeParams = useParams();

  const getSnsUserInfo = ({ name, res }) => {
    switch (name) {
      case 'naver':
        handleGetSnsUser(res.user.email, res?.accessToken, name);
        break;
      case 'google':
        handleGetSnsUser(res.wt.cu, res?.accessToken, name);
        break;
      default:
        break;
    }
  };

  const handleGetSnsUser = async (userEmail, snsAuthToken, name) => {
    try {
      jwtService
        .signInWithEmailAndPassword({ userEmail, snsAuthToken }, setLoginLoading)
        .then((res) => {
          !res &&
            confirmAlert({
              title: `가입된 유저가 없습니다. 유저 생성으로 이동하시겠습니까 ?`,
              // message: '메세지 공간입니다.',
              buttons: [
                {
                  label: '예',
                  onClick: () => {
                    navigate('/sign-up/3', { state: { sns: name, userEmail } });
                  },
                },
                {
                  label: '취소',
                },
              ],
            });
        })
        .catch((_error) => {
          toast.error(_error.message);
        })
        .finally(() => {
          //
        });
    } catch (err) {
      toast.error('SNS 유저 조회중 에러가 발생하였습니다.');
      console.log(err);
    } finally {
      //
    }
  };

  function onSubmit({ userId, password }) {
    setLoginLoading(true);
    jwtService
      .signInWithEmailAndPassword({ userId, password }, setLoginLoading)
      .then((res) => {
        !res && toast.warning('아이디와 비밀번호를 확인해주세요.');
      })
      .catch((_error) => {
        toast.error(_error.message);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }

  return (
    <>
      <div className={css.signin__wrap}>
        <Paper className={css.paper}>
          <div className={css.signin__wrap__inner}>
            <div className={css.left__section}>
              <div className={css.left__inner}>
                <h1 className={`f__bold ${css.main__title}`}>로그인</h1>
                <form name="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="userId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="아이디"
                        autoFocus
                        type="text"
                        error={!!errors.userId}
                        helperText={errors?.userId?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="비밀번호"
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={`custom__btn f__medium ${css.login__btn}`}
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid || loginLoading}
                    type="submit"
                    size="large">
                    {!loginLoading ? (
                      <span className="mx-8 text-white font-bold">로그인</span>
                    ) : (
                      <Lottie options={{ loop: true, autoplay: true, animationData }} />
                    )}
                  </Button>
                </form>
                <div className={css.signup__notice}>
                  <Typography className="f__regular">계정이 없으신가요?&nbsp;</Typography>
                  <Link
                    className="f__medium"
                    onClick={() => {
                      navigate('/sign-up/1');
                    }}>
                    계정 생성
                  </Link>
                </div>
                <div className={css.signup__notice}>
                  <Typography className="f__regular">비밀번호를 잊어버리셨나요?&nbsp;</Typography>
                  <Link
                    className="f__medium"
                    onClick={() => {
                      navigate('/forgot-password/1');
                    }}>
                    비밀번호 찾기
                  </Link>
                </div>
                {/* 개발중 sns 로그인 버튼 주석 */}
                {/* <div className={css.sns__login__wrap}>
                  <div className={css.sns__btn}>
                    <Button className=" w-full mt-16 f__bold">
                      <span className={css.logo__img}>
                        <img
                          src={require('assets/img/sign-in/logo__naver.png')}
                          alt="네이버 로고"
                        />
                      </span>
                    </Button>
                    <NaverLoginBtn getSnsUserInfo={getSnsUserInfo} />
                  </div>
                  <div className={`${css.sns__btn} ${css.google__btn}`}>
                    <GoogleLoginBtn getSnsUserInfo={getSnsUserInfo} />
                  </div>
                </div> */}
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
