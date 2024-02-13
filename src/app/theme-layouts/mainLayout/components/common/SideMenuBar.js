/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { getNavigation } from 'app/store/common/navigationSlice';
import { selectUser } from 'app/store/userSlice';

function SideMenuBar({ menuBarStatus, menuBarToggle }) {
  const navigation = useSelector(getNavigation);
  const user = useSelector(selectUser);
  const location = useLocation();

  const menuHideClick = () => {
    menuBarToggle('hide');
  };

  const [activeNav, setActiveNav] = useState([]);
  const [basePath, setBasePath] = useState();

  useEffect(() => {
    setBasePath(location.pathname.split('/')[1]);
  }, [location.pathname]);

  return (
    <nav className={menuBarStatus === 'hide' ? 'main__nav shadow-5 hide' : 'main__nav shadow-5'}>
      <div className="nav__inner">
        <div className="top">
          <div>
            <h1 className="f__medium">Mypopol</h1>
            <p className="f__medium">Mypopol 관리자 시스템</p>
          </div>
          <button id="menuOff" onClick={menuHideClick}>
            <svg viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="bottom vertical__scroll">
          <div className="profile__box">
            <div className="img__wrap">
              <img src={require('assets/img/profile.jpg')} alt="테스트 프로필 이미지" />
            </div>
            <p className="name f__medium">{user.username}</p>
            <p className="email">{user.userId}</p>
          </div>
          <div className="menu__list">
            {/* <!-- Sub Menu List --> */}
            {navigation.length > 0 &&
              navigation?.map((obj, idx) => (
                <div
                  key={obj.id}
                  className={classnames('list__item sub', [
                    {
                      active: activeNav.indexOf(idx + 1) !== -1,
                    },
                    { page__active: basePath === obj.children[0].url.split('/')[0] },
                  ])}
                  onClick={(e) => {
                    // const el = e.target.closest('.list__item');
                    // el.classList.toggle('active');
                    const clone = activeNav.slice();
                    const filterArr = clone.filter((el) => el !== idx + 1);
                    switch (clone.indexOf(idx + 1) !== -1) {
                      case true:
                        setActiveNav(filterArr);
                        break;
                      case false:
                        clone.push(idx + 1);
                        setActiveNav(clone);
                        break;
                      default:
                    }
                  }}>
                  <div className="sub__title">
                    {/* 아이콘 */}
                    <span className="icon">
                      {/* <svg viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        />
                      </svg> */}
                      <svg
                        size="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100">
                        <use
                          href={`${process.env.PUBLIC_URL}/images/icon/heroicons-outline.svg#${obj.icon}`}
                        />
                      </svg>
                    </span>
                    {/* // 아이콘 */}
                    <p className="f__medium txt">{obj.title}</p>
                    <button className="arrow__btn">
                      <svg viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={`sub__menu__list size${obj.children.length}`}>
                    <div>
                      <ul>
                        {obj.children.map((obj2) => (
                          <li
                            key={obj2.id}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}>
                            <NavLink to={obj2.url}>
                              <p className="f__medium">{obj2.title}</p>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            {/* <!-- // Sub Menu List --> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideMenuBar;
