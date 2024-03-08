import { memo } from 'react';

const ImgPreview = ({ imgFile }) => {
  return <img src={URL.createObjectURL(imgFile)} alt={imgFile.name} />;
};

export default memo(ImgPreview);
