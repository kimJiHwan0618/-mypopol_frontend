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
      <div className={css.selector__wrap}>
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
      <section className={css.status__template}>
        <div className={`${css.template__info__wrap} section__inner`}>
          <div className='template__info'>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">포폴 현황</p>
            </div>
            <div className={css.img__box}>
              <img src={require('assets/img/thumbnail.jpg')} alt='썸네일 이미지 테스트' />
            </div>
            <ul>
              <li>
                <a href='#'>
                  <dl>
                    <dt className='f__medium'>링크</dt>
                    <dd>site.mypopol.com/tem1/caribo</dd>
                  </dl>
                  <svg
                    size="24"
                    viewBox="0 0 100 100"
                  >
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#arrow-right`}
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href='#'>
                  <dl>
                    <dt className='f__medium'>페이지 템플릿</dt>
                    <dd>PTID01</dd>
                  </dl>
                  <svg
                    size="24"
                    viewBox="0 0 100 100"
                  >
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#arrow-right`}
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <dl>
                    <dt className='f__medium'>메일 템플릿</dt>
                    <dd>MTID01</dd>
                  </dl>
                  <svg

                    size="24"
                    viewBox="0 0 100 100"
                  >
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#arrow-right`}
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <dl>
                    <dt className='f__medium'>남은기한</dt>
                    <dd>340일</dd>
                  </dl>
                  <svg
                    className="shrink-0 fill-current  fuse-list-item-icon shrink-0 MuiBox-root muiltr-syvc0x"
                    size="24"
                    fill='none'
                    viewBox="0 0 100 100"
                  >
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#arrow-sm-right`}
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className='cheering__grid'>
            <div className={css.status__top2}>
              <p className="normal__title f__medium">한줄 댓글</p>
            </div>
            <div className='grid__wrap'>
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
        </div>
      </section>
    </div>
  );
}

export default DashBoard;
