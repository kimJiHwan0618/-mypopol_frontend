import css from 'assets/css/pageManagement.module.css';
import { selectUser } from 'app/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { getPageTemList } from 'app/store/pageTemplatesSlice';
import dateParser from 'app/utils/dateParser';

function PageManagement() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [popols, setPopols] = useState([]);

  useEffect(() => {
    dispatch(getPageTemList(user)).then(({ payload }) => {
      if (payload.data.response.code === 200) {
        setPopols(payload.data.response.response)
      }
    })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <div className="section__grid__wrap content">
      {
        popols.map((obj, idx) => (
          <section className={css.template__section}>
            <div className={`${css.section__inner} section__inner`}>
              <div className={css.template__top}>
                <p>
                  템플릿 ID :<span className="f__bold">&nbsp;{obj.ptId}</span>
                </p>
                <Button variant="contained" className="custom__btn">
                  <svg size="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#settings`}
                    />
                  </svg>
                </Button>
              </div>
              <div className={css.content}>
                <div className={css.img__box}>
                  {
                    obj.thumbnail !== "" && obj.thumbnail !== null
                      ? <img src={`https://site.mypopol.com/${obj.ptId}/${user.userId}/img/${obj.thumbnail}`} alt="썸네일 이미지" />
                      : <img src='https://site.mypopol.com/src/img/no_img.jpg' alt="썸네일 이미지" />
                  }
                </div>
                <div className={css.right__content}>
                  <ul className={css.list__wrap}>
                    <li>
                      <dl>
                        <dt className="f__medium">링크</dt>
                        <dd>:&nbsp;&nbsp;&nbsp;site.mypopol.com/{obj.ptid}/{user.userId}</dd>
                      </dl>
                      <a
                        href={`https://site.mypopol.com/${obj.ptId}/${user.userId}`}
                        target="_blank"
                        className={css.link__icon}
                        rel="noreferrer">
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
                        <dt className="f__medium">포폴명</dt>
                        <dd>:&nbsp;&nbsp;&nbsp;{obj.popolName}</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">남은기한</dt>
                        <dd>:&nbsp;&nbsp;&nbsp;{365 - Math.floor(Math.abs(new Date() - new Date(dateParser(obj.renewalDate))) / (1000 * 60 * 60 * 24))} 일</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">마지막 수정일시</dt>
                        <dd>:&nbsp;&nbsp;&nbsp;{dateParser(obj.lastUpdated)}</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">마지막 수정일시</dt>
                        <dd>:&nbsp;&nbsp;&nbsp;{dateParser(obj.lastUpdated)}</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <ul className={css.icon__wrap}>
                  <li>
                    <dl>
                      <dt>
                        <svg
                          size="24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100">
                          <use
                            href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#users`}
                          />
                        </svg>
                      </dt>
                      <dd className="f__medium">25</dd>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>
                        <svg
                          size="24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100">
                          <use
                            href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#mail`}
                          />
                        </svg>
                      </dt>
                      <dd className="f__medium">25</dd>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>
                        <svg
                          size="24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100">
                          <use
                            href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#chat`}
                          />
                        </svg>
                      </dt>
                      <dd className="f__medium">125</dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        ))
      }
    </div>
  );
}

export default PageManagement;
