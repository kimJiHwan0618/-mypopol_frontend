import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getNavigation } from 'app/store/common/navigationSlice';

function MainTitleBar() {
  const navigation = useSelector(getNavigation);
  const location = useLocation();
  const [mainPage, setMainPage] = useState('');
  const [subNav, setSubNav] = useState([]);

  useEffect(() => {
    const param = location.state;
    const arr = [];
    for (let i = 0; i < navigation.length; i += 1) {
      for (let j = 0; j < navigation[i].children.length; j += 1) {
        if (location.pathname.substring(1).includes(navigation[i].children[j].url)) {
          arr.push({ title: navigation[i].title });
          arr.push({
            title: navigation[i].children[j].title,
            url: navigation[i].children[j].url,
          });
          setMainPage(navigation[i].children[j].title);
          if (param !== null) {
            if (param.detailLink) {
              arr.push({
                title: param.detailLink.title,
                url: param.detailLink.link,
              });
              if (param.detailLink.detailSubLink) {
                arr.push({
                  title: param.detailLink.detailSubLink.title,
                  url: param.detailLink.detailSubLink.link,
                });
              }
            }
          }
          setSubNav(arr);
        }
      }
    }
  }, [location.pathname, navigation]);

  return (
    <div id="pageTitleWrap">
      <h2 className="f__bold">{mainPage}</h2>
      <ul>
        {subNav.map((obj, idx) => (
          <li key={idx} className="f__medium">
            <NavLink to={obj.url}>{obj.title}</NavLink>
            <span>&gt;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainTitleBar;
