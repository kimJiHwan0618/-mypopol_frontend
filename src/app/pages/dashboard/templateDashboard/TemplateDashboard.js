import css from 'assets/css/templateDashboard.module.css';
import 'gridjs/dist/theme/mermaid.min.css';
import { MenuItem, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ArrowRight } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

function DashBoard() {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [term, setTerm] = useState(0);
  const [countType, setCountType] = useState(0);
  const [mailHistory, setMailHistory] = useState([]);

  // const handleGetDataCount = () => {

  // }

  useEffect(() => {
    // dispatch(sftpTest({ gd: "test" })).then(({ payload }) => {
    //   console.log(payload)
    // })
    //   .catch((error) => {
    //     toast.error("sftp api 에러입니다.");
    //     console.log(error)
    //   })
  }, []);

  return (
    <div className="section__grid__wrap content">
      {/* <!-- 총 포폴수 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">포폴</p>
            <button>
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
            <dt className="f__medium">1</dt>
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
            <button>
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
            <dt className="f__medium">105</dt>
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
            <button>
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
            <dt className="f__medium">35</dt>
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
            <button>
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
            <dt className="f__medium">105</dt>
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
                disabled={mailHistory.length <= 0}
                variant="contained"
                className="custom__btn">
                <span className="f__medium">더 보기</span>
                <ArrowRight />
              </Button>
            </div>
            <div className={css.grid__wrap}>
              <DataGrid
                rows={mailHistory}
                // className='data__grid common__content'
                // loading={gridLoadingFlag}
                columns={[
                  { headerName: '이메일', field: 'email', width: 200, },
                  {
                    headerName: '제목', field: 'title', width: 250,
                  },
                  {
                    headerName: '시간', field: 'tmstamp', width: 200,
                    valueFormatter: ({ value }) => value !== null ? value.replace("T", " ") : "-"
                  },
                ]}
                getRowId={(data) => data.idx}
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
                {['일별', '주별'].map((obj, idx) => (
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
                  categories: ['05/07', '05/08', '05/09', '05/10', '05/11', '05/12', '05/13'],
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
              series={[
                {
                  name: '메일',
                  data: [30, 40, 45, 50, 49, 80, 20],
                },
              ]}
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
// export default React.memo(DashBoard);
