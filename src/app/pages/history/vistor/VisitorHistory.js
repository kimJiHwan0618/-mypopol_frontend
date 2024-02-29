import { DataGrid } from '@mui/x-data-grid';
import column from 'app/data/columns/vistoryHistory';
import css from 'assets/css/hisotry.module.css';
import { Button, TextField, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Search } from '@mui/icons-material';
import { selectUser } from 'app/store/userSlice';
import {
  selectPopols,
  selectVistors,
  selectSearchedFlag,
  getPopols,
  setSearchedFlag,
  setPopols,
  getVistors,
  setVistors,
} from 'app/pages/dashboard/templateDashboard/store/TemplateDashboardSlice';
import { toast } from 'react-toastify';

const VistorHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [popol, setPopol] = useState('전체');
  const popolSelector = useRef();
  const popols = useSelector(selectPopols);
  const vistors = useSelector(selectVistors);
  const searchedFlag = useSelector(selectSearchedFlag);
  const [startDate, setStartDate] = useState(dayjs().add(-24, 'hour'));
  const [startTime, setStartTime] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [filterData, setFilterData] = useState([]);

  const handleFilterClick = () => {
    console.log(vistors);
    console.log(popols);
  };

  const handleGetPopols = async () => {
    try {
      const { payload } = await dispatch(getPopols({ userKey: user.userKey }));
      if (payload.status === 200 && payload?.data) {
        await dispatch(setPopols(payload.data));
        await dispatch(setSearchedFlag({ popols: true }));
        await handleFilterClick();
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

  const handleGetVistors = async () => {
    try {
      const { payload } = await dispatch(getVistors({ userId: user.userId }));
      if (payload.status === 200 && payload?.data) {
        await dispatch(setVistors(payload.data));
        await dispatch(setSearchedFlag({ vistors: true }));
        await handleFilterClick();
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

  useEffect(() => {
    const { popols, works, vistors, mails } = searchedFlag;
    if (!popols) {
      handleGetPopols();
    }
    if (!vistors) {
      handleGetVistors();
    }
  }, []);

  return (
    <div className="section__grid__wrap content">
      <section className={`custom__section ${css.history__section}`}>
        <div className="search__wrap section__inner">
          <div className={`top ${css.history__title}`}>
            <p className="normal__title f__medium">조회 조건</p>
          </div>
          <div className="filter__list">
            <div className="selector__wrap">
              <TextField
                select
                className={`custom__selector ${css.selector__01}`}
                label="포트폴리오"
                variant="outlined"
                value={popol}
                ref={popolSelector}
                onChange={(e) => {
                  setPopol(e.target.value);
                }}>
                <MenuItem value="전체">전체</MenuItem>
                {/* {st.map((obj, idx) => (
                  <MenuItem key={obj.value} value={obj.value}>
                    {obj.name}
                  </MenuItem>
                ))} */}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  className={css.picker__wrap}
                  components={['DatePicker', 'TimePicker', 'DatePicker', 'TimePicker']}>
                  <DatePicker
                    className="custom__selector date__selector"
                    label="발생일"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <TimePicker
                    className="custom__selector"
                    label="발생시간"
                    value={startTime}
                    onChange={(time) => setStartTime(time)}
                  />
                  <span className="f__bold">~</span>
                  <DatePicker
                    className="custom__selector date__selector"
                    label="종료일"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                  <TimePicker
                    className="custom__selector"
                    label="종료시간"
                    value={endTime}
                    onChange={(time) => setEndTime(time)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                className={`custom__btn f__medium ${css.search__btn}`}
                variant="contained"
                type="button"
                size="large"
                onClick={(e) => {
                  handleFilterClick();
                }}>
                <span className="mx-8 text-white font-bold">조회</span>
                <Search />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={`custom__section ${css.history__section}`}>
        <div className="section__inner">
          <div className={`top ${css.history__title}`}>
            <p className="normal__title f__medium">방문자 이력</p>
          </div>
          <div className="common__content">
            <DataGrid
              rows={filterData}
              columns={column}
              pageSize={100}
              getRowId={(data) => data.countSeq}
              // onCellClick={}
              // onRowClick={}
              // loading
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VistorHistory;
