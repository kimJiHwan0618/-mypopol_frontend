import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
// import ReactApexChart from 'react-apexcharts';
// import chartData from 'app/data/dashboard/barChart';
// import { top10User, top10Station, history } from 'app/data/dashboard/gridData';

function DashBoard() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div className="section__grid__wrap content">
      <h1>환영합니다 {user.userId}님!</h1>
    </div>
  );
}

export default DashBoard;
