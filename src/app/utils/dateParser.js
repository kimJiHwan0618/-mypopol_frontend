const dataParser = (isoDate) => {
  const date = new Date(isoDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours() + 9).padStart(2, '0'); // UTC 시간을 현지 시간으로 변환 (예: 한국은 UTC+9)
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default dataParser;