import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import jwtService from '../../auth/services/jwtService';
import 'assets/css/signin.css';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  userKey: yup.string().required('발급키를 입력해 주세요.'),
  userId: yup.string().required('유저ID를 입력해 주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해 주세요.')
    .min(8, '비밀번호는 최소 8자 이상 입력해 주세요.'),
});

const defaultValues = {
  userKey: '',
  userId: '',
  password: '',
};

function SignInPage() {
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
      setValue('userKey', paramUserKey == null ? 'S35KIN28K19MJZ' : paramUserKey, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('userId', paramUserKey == null ? 'hodoadmin0618' : paramUserKey, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('password', paramUserKey == null ? 'zkflgheh0121' : '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  function onSubmit({ userKey, userId, password }) {
    jwtService
      .signInWithEmailAndPassword(userKey, userId, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_error) => {
        // setError('userKey', {
        //   type: 'manual',
        //   message: _error.message,
        // });
        toast.error(_error.message);
      });
  }

  return (
    <div className="signin__wrap">
      <Paper>
        <div className="inner">
          <div className="left">
            <div className="inner__left">
              <h1 className="f__bold">로그인</h1>
              <div>
                {/* <Typography>계정이 없으신가요? </Typography> */}
                {/* <Link className="" to="/sign-up">
                  회원가입
                </Link> */}
              </div>
              <form name="loginForm" noValidate className="" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="userKey"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="발급키"
                      autoFocus
                      type="text"
                      error={!!errors.userKey}
                      helperText={errors?.userKey?.message}
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

                {/* <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                  <Link className="text-md font-medium" to="/forgot-password">
                    비밀번호 초기화
                  </Link>
                </div> */}
                <Button
                  variant="contained"
                  color="secondary"
                  className=" w-full mt-16 custom__btn f__bold"
                  aria-label="Sign in"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  size="large">
                  <span className="mx-8 text-white font-bold">로그인</span>
                </Button>
              </form>
            </div>
          </div>
          <div className="right">
            <svg viewBox="0 0 220 192" fill="none">
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
            </svg>
            <svg
              viewBox="0 0 960 540"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMax slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" stroke="currentColor" strokeWidth="100">
                <circle r="234" cx="196" cy="23" />
                <circle r="234" cx="790" cy="491" />
              </g>
            </svg>
            <h2>Mypopol Admin System</h2>
            <p>
              안녕하세요 Mypopol 관리자 시스템입니다.
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;
