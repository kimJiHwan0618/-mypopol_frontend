import AppContext from 'app/AppContext';
import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';

function CommonPageCom() {

  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    useRoutes(routes)
  )

}

export default CommonPageCom;