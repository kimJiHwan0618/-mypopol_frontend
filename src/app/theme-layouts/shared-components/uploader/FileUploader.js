import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const FileUpload = (props) => {
  // const onDrop = (acceptedFiles) => {
  //   onFileSelect(acceptedFiles[0]);
  // };

  const fileUploadStyle = {
    alignItems: "center",
    backgroundColor: "#fafafa",
    border: "2px dashed #aaa",
    borderRadius: "2px",
    color: "#bdbdbd",
    display: "flex",
    flexDirection: "column",
    height: props.height,
    justifyContent: "center",
    outline: "none",
    transition: "border .24s ease-in-out"
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // <div {...getRootProps()} className="dropzone" style={fileUploadStyle}>
    <div style={fileUploadStyle}>
      {/* <input {...getInputProps()} /> */}
      {/* < input /> */}
      {/* {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>
          <FontAwesomeIcon icon={faFileUpload} /> 이미지 파일을 선택하거나 드래그로 추가하세요.
        </p>
      )} */}
      < p >
        <FontAwesomeIcon icon={faFileUpload} /> 이미지 파일을 선택하거나 드래그로 추가하세요.
      </p >
    </div >
  );
};

export default FileUpload;