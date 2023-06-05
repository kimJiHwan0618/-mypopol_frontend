import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import { DetailTitleBar } from 'app/theme-layouts/mainLayout/components';
import { useParams, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import css from 'assets/css/pageManagement.module.css';
import FileUpload from 'app/theme-layouts/shared-components/uploader/FileUploader';

function PageManagement() {
  // const routeParams = useParams();
  const user = useSelector(selectUser);
  const location = useLocation();

  const schema = yup.object().shape({});

  const defaultValues = {};

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const sectionTitleClick = (e) => {
    const el = e.currentTarget;
    el.classList.toggle("active")
    if (el.classList.contains("active")) {
      el.childNodes[1].style.transform = "rotate(0deg)"
      el.nextSibling.style.height = `${el.nextSibling.childNodes[0].offsetHeight}px`;
    } else {
      el.childNodes[1].style.transform = "rotate(180deg)"
      el.nextSibling.style.height = "0px";
    }
  }

  return (
    <div className={`section__grid__wrap content common__detail ${css.page__tem__wrap}`}>
      <DetailTitleBar
      // flag={locationState.detailLink.title}
      // saveBtnClick={saveBtnClick}
      // trigger={trigger}
      />
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div onClick={(e) => {
            sectionTitleClick(e);
          }} className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">포폴 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div className={`${css.section__content}`}>
            <div className='inner'>
              <div className={css.list__item}>
                <Controller
                  name="popolName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="포폴명"
                      autoFocus
                      type="text"
                      // error={!!errors.userId}
                      // helperText={errors?.userId?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <p className='f__medium'>썸네일 이미지</p>
                <FileUpload height="200px" control={control} />
                <div className={css.file__status}>
                  <p className='f__regular'>thumbnail.jpg</p>
                  <span className='img__remove' />
                </div>
              </div>
              <div className={css.list__item}>
                <p className='f__medium'>메인 색상</p>
                <ul className={css.color__item__wrap}>
                  {
                    ['rgb(255, 182, 59)', 'rgb(75, 135, 224)', 'rgb(75, 224, 149)'].map((color) => (
                      <li style={{ backgroundColor: color }} />
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section >
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div onClick={(e) => {
            sectionTitleClick(e);
          }} className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">프로필 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div className={`${css.section__content}`}>
            <div className='inner'>
              <div className={css.list__item}>
                <Controller
                  name="fakeName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="예명"
                      autoFocus
                      type="text"
                      // error={!!errors.userId}
                      // helperText={errors?.userId?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="이메일"
                      autoFocus
                      type="text"
                      // error={!!errors.userId}
                      // helperText={errors?.userId?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="전화번호"
                      autoFocus
                      type="text"
                      // error={!!errors.userId}
                      // helperText={errors?.userId?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      className="mb-24"
                      required
                      fullWidth
                      label="인사글"
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className={css.list__item}>
                <p className='f__medium'>프로필 이미지</p>
                <FileUpload height="150px" control={control} />
                <div className={css.file__status}>
                  <p className='f__regular'>profile.jpg</p>
                  <span className='img__remove' />
                </div>
              </div>
              <div className={css.list__item}>
                <p className='f__medium'>SNS 정보</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={`${css.detail__section} section__inner`}>
          <div onClick={(e) => {
            sectionTitleClick(e);
          }} className={`${css.title__bar} top line`}>
            <p className="f__medium normal__title">웹툰 정보</p>
            <span className={css.arrow__btn} />
          </div>
          <div className={`${css.section__content}`}>
            <div className='inner'>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
              <p>layout test</p>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}

export default PageManagement;
