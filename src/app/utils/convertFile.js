const convertRemoteImageToFile = (remoteImageUrl, fileName, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', remoteImageUrl, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = xhr.response;
      blob.lastModifiedDate = new Date();
      blob.name = fileName;

      return callback(null, blob);
    }

    return callback(new Error('Failed to load remote image'));
  };

  xhr.send();
}

export default convertRemoteImageToFile;