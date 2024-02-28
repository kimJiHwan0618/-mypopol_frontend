import { DataGrid } from '@mui/x-data-grid';
import column from 'app/data/columns/vistoryHistory'
import css from 'assets/css/hisotry.module.css'

const VistorHistory = () => {
  return (
    <div className="section__grid__wrap content">
      <section className={`custom__section ${css.history__section}`}>
        <div className='section__inner'>
          <div className={`top ${css.history__title}`}>
            <p className="normal__title f__medium">조회 조건</p>
          </div>
        </div>
      </section>
      <section className={`custom__section ${css.history__section}`}>
        <div className='section__inner'>
          <div className={`top ${css.history__title}`}>
            <p className="normal__title f__medium">방문자 이력</p>
          </div>
          <div className='common__content'>
            <DataGrid
              rows={[]}
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
  )
}

export default VistorHistory;