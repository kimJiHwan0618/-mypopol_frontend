// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import reportWebVitals from './reportWebVitals';

Modal.setAppElement('#root');

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
