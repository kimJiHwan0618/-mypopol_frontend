import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie';
import Welcome from 'app/theme-layouts/mainLayout/components/signUp/Welcome'
import animationData from 'app/data/loading.json';
import NaverLoginBtn from 'app/pages/sign-in/snsLogin/Naver';
import GoogleLoginBtn from 'app/pages/sign-in/snsLogin/Google';
import css from 'assets/css/signin.module.css';
import jwtService from 'app/auth/services/jwtService';

/**
 * Form Validation Schema
 */
const activeOption = {
  shouldDirty: true,
  shouldValidate: true,
};

const schema = yup.object().shape({
  userId: yup.string().required('유저ID를 입력해 주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해 주세요.')
    .min(8, '비밀번호는 최소 8자 이상 입력해 주세요.'),
});

const defaultValues = {
  userId: '',
  password: '',
};

function SignInPage() {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const routeParams = useParams();
  const { paramUserKey } = routeParams;

  useEffect(
    (paramUserKey) => {
      // setValue('userId', paramUserKey == null ? '' : paramUserKey, activeOption);
      // setValue('password', paramUserKey == null ? '' : '', activeOption);
    },
    [setValue]
  );

  function onSubmit({ userId, password }) {
    setLoginLoading(true);
    jwtService
      .signInWithEmailAndPassword(userId, password, setLoginLoading)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_error) => {
        // setError('userKey', {
        //   type: 'manual',
        //   message: _error.message,
        // });
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
                  <Link className="f__medium" onClick={() => { navigate("/sign-up/1") }}>
                    계정 생성
                  </Link>
                </div>
                <div className={css.signup__notice}>
                  <Typography className="f__regular">비밀번호를 잊어버리셨나요?&nbsp;</Typography>
                  <Link className="f__medium" onClick={() => { navigate("/sign-up") }}>
                    비밀번호 찾기
                  </Link>
                </div>
                <div className={css.sns__login__wrap}>
                  <div className={css.sns__btn}>
                    <Button className=" w-full mt-16 f__bold">
                      <span className={css.logo__img}>
                        <img src={require('assets/img/sign-in/logo__naver.png')} alt="네이버 로고" />
                      </span>
                    </Button>
                    <NaverLoginBtn />
                  </div>
                  <div className={`${css.sns__btn} ${css.google__btn}`}>
                    <GoogleLoginBtn />
                  </div>
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
