/* eslint-disable import/prefer-default-export */
export const getLabel = (ptid, param) => {
  let label;
  switch (ptid) {
    case 'ptid01':
      if (param === 'workTitle') label = '작품';
      if (param === 'fakeName') label = '작가명';
      break;
    case 'ptid02':
      if (param === 'workTitle') label = '프로젝트';
      if (param === 'fakeName') label = '이름';
      break;
    default:
  }
  return label;
};
