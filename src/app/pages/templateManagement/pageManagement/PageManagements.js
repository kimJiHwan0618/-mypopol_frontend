import css from 'assets/css/pageManagements.module.css';
import { selectUser } from 'app/store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { OpenInNew as LinkIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from 'app/data/loading.json';
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
import { postPopolInfo } from './store/PageTemplateSlice';

function PageManagements() {
  const searchedFlag = useSelector(selectSearchedFlag);
  const popols = useSelector(selectPopols);
  const works = useSelector(selectWorks);
  const vistors = useSelector(selectVistors);
  const mails = useSelector(selectMails);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [popolLoading, setPopolLoading] = useState(false);
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);

  const handleGetPopols = async () => {
    try {
      setPopolLoading(true);
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
      setPopolLoading(false);
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
      setVisitorLoading(true);
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
      setVisitorLoading(false);
    }
  };

  const handleGetMails = async () => {
    try {
      setMailLoading(true);
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
      setMailLoading(false);
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

  return (
    <div className="section__grid__wrap content">
      {!popolLoading ? (
        popols.map((obj, idx) => (
          <section key={obj.ptId} className={css.template__section}>
            <div className={`${css.section__inner} section__inner`}>
              <div className={css.template__top}>
                <div className={css.top__title__wrap}>
                  <p className="f__medium">{obj.popolName}</p>
                </div>
                <Button
                  variant="contained"
                  className="custom__btn"
                  onClick={() => {
                    setPopolLoading(true);
                    const params = { ...user, ptId: obj.ptId };
                    dispatch(postPopolInfo(params))
                      .then(({ payload }) => {
                        if (payload.status === 200) {
                          navigate(`/template/page/${user.userId}?ptId=${obj.ptId}`, {
                            state: {
                              detailLink: {
                                title: '수정',
                                goBackUrl: '/template/page',
                              },
                              template: payload.data.response,
                            },
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        toast.error('포폴 데이터 조회에 실패하였습니다.');
                      })
                      .finally(() => {
                        setPopolLoading(false);
                      });
                  }}>
                  <svg
                    size="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100">
                    <use
                      href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#settings`}
                    />
                  </svg>
                </Button>
              </div>
              <div className={css.content}>
                <div className={css.img__box}>
                  {obj.thumbnail !== '' && obj.thumbnail !== null ? (
                    <img
                      src={`https://site.mypopol.com/${obj.ptId}/${user.userId}/img/${obj.thumbnail}`}
                      alt="썸네일 이미지"
                    />
                  ) : (
                    <img src="https://site.mypopol.com/src/img/no_img.jpg" alt="썸네일 이미지" />
                  )}
                </div>
                <div className={css.right__content}>
                  <ul className={css.list__wrap}>
                    <li>
                      <dl>
                        <dt className="f__medium">링크</dt>
                        <dd>
                          <p>
                            {obj.domain
                              ? `https://${obj.domain}`
                              : `site.mypopol.com/${obj.ptId}/${user.userId}`}</p>
                          <Button
                            style={{
                              marginLeft: "12px",
                              width: "46.45px",
                              minWidth: "auto"
                            }}
                            variant="contained"
                            color="secondary"
                            className="custom__btn f__medium"
                            fullWidth
                            onClick={() => {
                              window.open(
                                obj.domain
                                  ? `https://${obj.domain}`
                                  : `https://site.mypopol.com/${obj.ptId}/${user.userId}`,
                                '_blank',
                                'noopener,noreferrer'
                              );
                            }}>
                            <LinkIcon />
                          </Button>
                        </dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">설명</dt>
                        <dd>{obj.description}</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">남은기한</dt>
                        <dd>
                          {365 - obj.usedDay} 일
                        </dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">사용기한 갱신일</dt>
                        <dd>{obj.renewalDate}</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt className="f__medium">마지막 수정일시</dt>
                        <dd>{obj.lastUpdated}</dd>
                      </dl>
                    </li>
                  </ul>
                  <ul className={css.icon__wrap__mobile}>
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
                        <dd className="f__medium">
                          {vistors.filter((item) => item.popolSeq === obj.popolSeq).length}
                        </dd>
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
                        <dd className="f__medium">
                          {mails.filter((item) => item.popolSeq === obj.popolSeq).length}
                        </dd>
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
                      <dd className="f__medium">
                        {vistors.filter((item) => item.popolSeq === obj.popolSeq).length}
                      </dd>
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
                      <dd className="f__medium">
                        {mails.filter((item) => item.popolSeq === obj.popolSeq).length}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gridColumn: 'span 4 / span 4',
            width: '100%',
            maxWidth: "350px"
          }}>
          <Lottie
            options={{ loop: true, autoplay: true, animationData }}
          />
        </div>
      )}
    </div>
  );
}

export default PageManagements;
