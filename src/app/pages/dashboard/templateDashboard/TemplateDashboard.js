/* eslint-disable array-callback-return */
import css from 'assets/css/templateDashboard.module.css';
import 'gridjs/dist/theme/mermaid.min.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ArrowRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { selectUser } from 'app/store/userSlice';
import initDataRangeList from 'app/utils/initDataRangeList';
import {
  getPopols,
  getWorks,
  getVistors,
  getMails,
  selectSearchedFlag,
  setPopols,
  setWorks,
  setMails,
  setSearchedFlag,
  selectPopols,
  selectWorks,
  selectVistors,
  selectMails,
  setVistors,
} from 'app/pages/dashboard/templateDashboard/store/TemplateDashboardSlice';

function DashBoard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const searchedFlag = useSelector(selectSearchedFlag);
  const popols = useSelector(selectPopols);
  const works = useSelector(selectWorks);
  const vistors = useSelector(selectVistors);
  const mails = useSelector(selectMails);
  const dispatch = useDispatch();
  const [series, setSeries] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [term, setTerm] = useState(0); // 0: 주별 or 1: 월별
  const [countType, setCountType] = useState(0); // 0: 방문자 or 1: 메일

  const handleGetPopols = async () => {
    try {
      const { payload } = await dispatch(getPopols({ userKey: user.userKey }));
      if (payload.status === 200 && payload?.data) {
        dispatch(setPopols(payload.data));
        dispatch(setSearchedFlag({ popols: true }));
      } else {
        toast.error('포폴 데이터 조회 에러');
      }
    } catch (err) {
      toast.error('포폴 데이터 조회 에러');
      console.log(err);
    } finally {
      //
    }
  };

  const handleGetWorks = async () => {
    try {
      const { payload } = await dispatch(getWorks({ userKey: user.userKey }));
      if (payload.status === 200 && payload?.data) {
        dispatch(setWorks(payload.data));
        dispatch(setSearchedFlag({ works: true }));
      } else {
        toast.error('작품 데이터 조회 에러');
      }
    } catch (err) {
      toast.error('작품 데이터 조회 에러');
      console.log(err);
    } finally {
      //
    }
  };

  const handleGetVistors = async () => {
    try {
      const { payload } = await dispatch(getVistors({ userId: user.userId }));
      if (payload.status === 200 && payload?.data) {
        dispatch(setVistors(payload.data));
        dispatch(setSearchedFlag({ vistors: true }));
      } else {
        toast.error('방문자 이력 데이터 조회 에러');
      }
    } catch (err) {
      toast.error('방문자 이력 데이터 조회 에러');
      console.log(err);
    } finally {
      //
    }
  };

  const handleGetMails = async () => {
    try {
      const { payload } = await dispatch(getMails({ userId: user.userId }));
      if (payload.status === 200 && payload?.data) {
        dispatch(setMails(payload.data));
        dispatch(setSearchedFlag({ mails: true }));
      } else {
        toast.error('메일 이력 데이터 조회 에러');
      }
    } catch (err) {
      toast.error('메일 이력 데이터 조회 에러');
      console.log(err);
    } finally {
      //
    }
  };

  useEffect(() => {
    const { popols, works, vistors, mails } = searchedFlag;
    if (!popols) {
      handleGetPopols();
    }
    if (!works) {
      handleGetWorks();
    }
    if (!vistors) {
      handleGetVistors();
    }
    if (!mails) {
      handleGetMails();
    }
  }, []);

  const handleGetTermCount = (text1, text2) => {
    const year = text1.slice(2, 4);
    const month = text1.slice(5, 7);
    const day = text1.slice(8, 10);
    const date1 = new Date(`20${year}-${month}-${day}`).getTime();
    const date2 = new Date(`20${text2.replace('~ ', '')}`).getTime();
    const today = new Date(date2);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const test = sevenDaysAgo.getTime();
    return date1 >= test && date1 <= date2;
  };

  const handleSetTrendData = (xcategories, trendData, name) => {
    const xList = [];
    const seriesData = [
      {
        name,
        data: [],
      },
    ];
    if (!term) {
      xcategories.map((obj, idx) => {
        const cnt = trendData.filter((data) => handleGetTermCount(data.timeStamp, obj)).length;
        xList.push(`~${obj.slice(4)}`);
        seriesData[0].data.push(cnt);
      });
    } else {
      xcategories.map((obj, idx) => {
        const cnt = trendData.filter((data) => data.timeStamp.substring(2, 7) === obj).length;
        xList.push(obj);
        seriesData[0].data.push(cnt);
      });
    }
    setSeries(seriesData);
    setXLabels(xList);
  };

  const handleTrendChart = (xcategories) => {
    !countType
      ? handleSetTrendData(xcategories, vistors, '방문자')
      : handleSetTrendData(xcategories, mails, '메일');
  };

  useEffect(() => {
    const xcategories = initDataRangeList(!term ? '주별' : '월별');
    handleTrendChart(xcategories);
  }, [countType, term, mails, vistors]);

  return (
    <div className="section__grid__wrap content">
      {/* <!-- 총 포폴수 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">포폴</p>
            <button aria-label="button">
              <svg viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <dl>
            <dt className="f__medium">{popols.length}</dt>
            <dd className="f__medium">전체 포폴</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 총 포폴수 --> */}
      {/* <!-- 전체 작품 수 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">작품</p>
            <button aria-label="button">
              <svg viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <dl>
            <dt className="f__medium">{works.length}</dt>
            <dd className="f__medium">전체 작품</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 전체 작품 수 --> */}
      {/* <!-- 전체 방문자 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">방문자</p>
            <button aria-label="button">
              <svg viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <dl>
            <dt className="f__medium">{vistors.length}</dt>
            <dd className="f__medium">전체 방문자</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 전체 방문자 --> */}
      {/* <!-- 전체 메일 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">메일</p>
            <button aria-label="button">
              <svg viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <dl>
            <dt className="f__medium">{mails.length}</dt>
            <dd className="f__medium">전체 메일</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 최근 메일 --> */}
      <section className={css.fw__section}>
        <div className="section__inner">
          <div className="mail__grid">
            <div className={css.status__top2}>
              <p className="normal__title f__medium">최근 메일</p>
              <Button
                onClick={() => {
                  navigate('/history/mail');
                }}
                disabled={mails.length <= 0}
                variant="contained"
                className="custom__btn">
                <span className="f__medium">더 보기</span>
                <ArrowRight />
              </Button>
            </div>
            <div className={css.grid__wrap}>
              <DataGrid
                rows={mails.slice(0, 10)}
                // className='data__grid common__content'
                // loading={gridLoadingFlag}
                columns={[
                  { headerName: '이메일', field: 'email', width: 200 },
                  {
                    headerName: '제목',
                    field: 'title',
                    width: 250,
                  },
                  {
                    headerName: '시간',
                    field: 'timeStamp',
                    width: 200,
                    valueFormatter: ({ value }) =>
                      value ? value.replace('T', ' ').replace('Z', '') : '-',
                  },
                ]}
                getRowId={(data) => data.seq}
                pageSize={10}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- // 최근 메일 --> */}
      {/* 차트 웹 */}
      <section className={css.fw__section}>
        <div className="section__inner">
          <div className={css.chart__top}>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">트렌드 차트</p>
            </div>
            <div className={css.select__list__wrap}>
              <div className={css.select__list}>
                {['주별', '월별'].map((obj, idx) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setTerm(idx);
                    }}
                    key={idx}
                    className={`${css.item} f__medium`}>
                    <p>{obj}</p>
                  </div>
                ))}
                <div style={{ left: 8 + 82 * term }} className={css.selected__tab} />
              </div>
              <div className={css.select__list}>
                {['방문자', '메일'].map((obj, idx) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountType(idx);
                    }}
                    key={idx}
                    className={`${css.item} f__medium`}>
                    <p>{obj}</p>
                  </div>
                ))}
                <div style={{ left: 8 + 82 * countType }} className={css.selected__tab} />
              </div>
            </div>
          </div>
          <div className={css.chart__wrap}>
            <ReactApexChart
              options={{
                chart: {
                  id: 'column-chart',
                },
                xaxis: {
                  categories: xLabels,
                },
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  // formatter(val) {
                  //   return `${val}%`;
                  // },
                  offsetY: -20,
                  style: {
                    fontSize: '12px',
                    colors: ['#304758'],
                  },
                },
              }}
              series={series}
              type="bar"
              height={407}
            />
          </div>
        </div>
      </section>
      {/* // 차트 웹 */}
    </div>
  );
}

export default DashBoard;
