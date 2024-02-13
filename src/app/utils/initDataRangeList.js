const initDataRangeList = (type) => {
  const today = new Date();
  const dateArray = [];

  switch (type) {
    case '주별':
      for (let i = 0; i < 7; i += 1) {
        const endDate = new Date(today);
        endDate.setDate(today.getDate() - i * 7);
        const formattedEndDate = `${endDate.getFullYear().toString().slice(-2)}-${(
          endDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
        dateArray.unshift(`~ ${formattedEndDate}`);
      }
      break;
    case '월별':
      for (let i = 0; i < 7; i += 1) {
        const currentDate = new Date(today);
        currentDate.setMonth(today.getMonth() - i, 1); // 각 달의 1일로 설정
        const formattedDate = `${currentDate.getFullYear().toString().slice(-2)}-${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`;
        dateArray.unshift(formattedDate);
      }
      break;
    default:
    //
  }
  return dateArray;
};

export default initDataRangeList;
