import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import { Grid } from 'gridjs-react';
import css from "assets/css/templateDashboard.module.css"
import 'gridjs/dist/theme/mermaid.min.css';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

function DashBoard() {
  const user = useSelector(selectUser);

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
            <p className="f__medium">응원</p>
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
            <dd className="f__medium">전체 응원</dd>
          </dl>
        </div>
      </section>
      {/* <!-- // 응원 --> */}
      <section className={css.status__template}>
        <div className={`${css.template__info__wrap1} section__inner`}>
          <div className='template__info'>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">포폴 현황</p>
              <div className='right'>
                <div className='selector__wrap'>
                  <TextField
                    select
                    value='카리보페이지'
                    label="포폴명"
                    id="searchGroupId"
                    variant="outlined"
                    fullWidth
                  // onChange={(e) => {
                  //   handleGroupComboChange(e.target.value);
                  // }}
                  >
                    {[{ name: "카리보페이지" }].map((obj, idx) => (
                      <MenuItem key={obj.code} value={obj.name}>
                        {obj.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            <div className={css.img__box}>
              <img src={require('assets/img/thumbnail.jpg')} alt='썸네일 이미지 테스트' />
            </div>
          </div>
          <div className='cheering__grid'>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">한마디 응원</p>
              <div className='right'>
                <button className="custom__btn">
                  <span className="f__medium">더보기</span>
                </button>
              </div>
            </div>
            <Grid
              sort="true"
              className="grid"
              data={[
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
                { evttime: "05/16 17:00:53", comment: "웹툰이 너무 재밌어요!!" },
              ]}
              columns={[
                { name: "시간", id: "evttime", width: 150 },
                { name: "한줄응원", id: "comment" },
              ]}
              pagination={{
                enabled: true,
                limit: 10,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashBoard;
