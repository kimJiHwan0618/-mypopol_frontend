const convertRemoteImageToFile = (remoteImageUrl, fileName, fileType, callback) => {
  fetch(remoteImageUrl, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load remote image');
      }
      return response.blob();
    })
    .then((blob) => {
      const file = new File([blob], fileName, { type: fileType });
      callback(null, file);
    })
    .catch((error) => {
      callback(error);
    });
};

export default convertRemoteImageToFile;

// const convertRemoteImageToFile = (remoteImageUrl, fileName, fileType, callback) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', remoteImageUrl, true);
//   xhr.responseType = 'blob';

//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       const blob = xhr.response;
//       blob.lastModifiedDate = new Date();
//       blob.name = fileName;

//       return callback(null, new File([blob], fileName, { type: fileType }));
//     }

//     return callback(new Error('Failed to load remote image'));
//   };

//   xhr.send();
// }

// export default convertRemoteImageToFile;
