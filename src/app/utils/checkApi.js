const auth = (res) => {
  if (String(res.data).includes('사용자 인증 에러')) {
    return false;
  }
  return true;
};

const code504 = (res) => {
  if (res.status !== 504) {
    return true;
  }
  return false;
};

const fn_resetApp = (msg) => {
  alert(msg);
  localStorage.clear();
  window.location.replace('/');
};

const fn_initCheckObj = (res) => {
  const flag = {};
  flag['유저 인증 세션 만료.'] = auth(res);
  flag['서버 코드 504.'] = code504(res);
  return flag;
};

const fn_checkExcute = (conditions) => {
  const falseKeys = Object.keys(conditions).filter((key) => !conditions[key]);
  if (falseKeys.length === 0) {
    return '실행';
  }
  return falseKeys.join(', ');
};

export { fn_initCheckObj, fn_checkExcute, fn_resetApp };
