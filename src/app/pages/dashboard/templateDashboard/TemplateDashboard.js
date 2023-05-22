import css from 'assets/css/templateDashboard.module.css';
import 'gridjs/dist/theme/mermaid.min.css';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ReactApexChart from 'react-apexcharts';
import { sftpTest } from 'app/store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function DashBoard() {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [term, setTerm] = useState(0);
  const [countType, setCountType] = useState(0);

  useEffect(() => {
    dispatch(sftpTest({ gd: "test" })).then(({ payload }) => {
      console.log(payload)
    })
      .catch((error) => {
        toast.error("sftp api 에러입니다.");
        console.log(error)
      })
  }, [])

  return (
    <div className="section__grid__wrap content">
      {/* <!-- 총 포폴수 --> */}
      <div className={css.selector__wrap}>
        <TextField
          select
          value="카리보페이지"
          label="포폴명"
          id="searchGroupId"
          variant="outlined"
          fullWidth
        // onChange={(e) => {
        //   handleGroupComboChange(e.target.value);
        // }}
        >
          {[{ name: '카리보페이지' }].map((obj, idx) => (
            <MenuItem key={obj.code} value={obj.name}>
              {obj.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
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
            <dd className="f__medium">전체 포트폴리오</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 총 포폴수 --> */}
      {/* <!-- 방문자 --> */}
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
            <dt className="f__medium">105</dt>
            <dd className="f__medium">전체 방문자</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 방문자 --> */}
      {/* <!-- 메일 --> */}
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
            <dt className="f__medium">35</dt>
            <dd className="f__medium">전체 메일</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 메일 --> */}
      {/* <!-- 응원 --> */}
      <section className={css.status__box}>
        <div className={`${css.status__box__inner} section__inner`}>
          <div className={`${css.status__top}`}>
            <p className="f__medium">댓글</p>
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
            <dd className="f__medium">전체 댓글</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 응원 --> */}
      {/* 포폴 정보 & 한줄 댓글 */}
      <section className={css.fw__section}>
        <div className={`${css.template__info__wrap} section__inner`}>
          <div className="template__info">
            <div className={css.status__top2}>
              <p className="normal__title f__medium">포폴 정보</p>
            </div>
            <div className={css.img__box}>
              <img src={require('assets/img/thumbnail.jpg')} alt="썸네일 이미지 테스트" />
            </div>
            <ul>
              <li>
                <dl>
                  <dt>링크</dt>
                  <dd>site.mypopol.com/ptid01/caribo</dd>
                </dl>
                <a href="http://caribo.me" target="_blank" className={css.icon} rel="noreferrer">
                  <svg
                    id="external-link"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <dl>
                  <dt>페이지 템플릿</dt>
                  <dd>PTID01</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>메일 템플릿</dt>
                  <dd>MTID01</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>남은기한</dt>
                  <dd>340일</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>마지막 수정일시</dt>
                  <dd>05-17 17:48</dd>
                </dl>
              </li>
            </ul>
          </div>
          <div className="cheering__grid">
            <div className={css.status__top2}>
              <p className="normal__title f__medium">한줄 댓글</p>
              <Button variant="contained" className="custom__btn">
                <span className="f__medium">더보기</span>
              </Button>
            </div>
            <div className={`${css.gird__wrap} vertical__scroll common__grid`}>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>
                      <p className="f__medium">발생일시</p>
                    </th>
                    <th>
                      <p className="f__medium">내용</p>
                    </th>
                  </tr>
                </thead>
                <tbody className={css.tbody}>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="f__medium">05-16 14:00</p>
                    </th>
                    <th>
                      <p className="f__medium">다음 작품이 기대되요!</p>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* // 포폴 정보 & 한줄 댓글 */}
      {/* 차트 웹 */}
      <section className={css.fw__section}>
        <div className="section__inner">
          <div className={css.chart__top}>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">트렌드 차트</p>
            </div>
            <div>
              <div className={css.select__list}>
                {['일별', '주별'].map((obj, idx) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setTerm(idx);
                    }}
                    className={`${css.item} f__medium`}>
                    <p>{obj}</p>
                  </div>
                ))}
                <div style={{ left: 8 + 82 * term }} className={css.selected__tab} />
              </div>
              <div className={css.select__list}>
                {['방문자', '메일', '한줄 댓글'].map((obj, idx) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountType(idx);
                    }}
                    className={`${css.item} f__medium`}>
                    <p>{obj}</p>
                  </div>
                ))}
                <div style={{ left: 8 + 82 * countType }} className={css.selected__tab} />
              </div>
            </div>
          </div>
          <div className="chart__wrap" style={{ marginTop: 24 }}>
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
              height={350}
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
