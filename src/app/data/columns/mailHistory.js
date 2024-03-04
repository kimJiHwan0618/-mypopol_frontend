const columns = [
  { field: 'filterRowNumber', headerName: '번호', minWidth: 150 },
  { field: 'popolName', headerName: '포폴명', minWidth: 350 },
  { field: 'email', headerName: '이메일', minWidth: 250 },
  { field: 'subject', headerName: '카테고리', minWidth: 250 },
  { field: 'title', headerName: '제목', minWidth: 250 },
  { field: 'content', headerName: '내용', minWidth: 350 },
  { field: 'phone', headerName: '휴대전화', minWidth: 250 },
  {
    field: 'timeStamp',
    headerName: '방문시간',
    minWidth: 250,
    valueFormatter: ({ value }) => {
      // '2024-03-01T12:34:56' 형식의 문자열을 Date 객체로 변환
      const originalDate = new Date(value);

      // 서버에서 전송된 날짜가 UTC 기준이라면, 로컬 시간대로 변환
      const localDate = new Date(originalDate.toLocaleString('en-US', { timeZone: 'UTC' }));

      // 7시간 추가 (Seoul의 경우 UTC+9)
      localDate.setHours(localDate.getHours() + 6);

      // 'YYYY-MM-DDTHH:mm:ss' 형식의 문자열로 변환
      const formattedDate = localDate.toISOString().slice(0, 19).replace('T', ' ');

      return formattedDate;
    },
  },
];

export default columns;
