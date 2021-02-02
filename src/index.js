import 'jquery';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import bent from 'bent';
import './index.scss';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

const state = store.getState();

// Fetch stylesheet from CDN
function loadTheme() {
  return new Promise(resolve => {
    const url = `https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/${state.theme.theme}/bootstrap.min.css`;
    const request = bent('string', 200);
    request(url)
      .then(css => resolve(<style>{css}</style>))
      .catch(() => {
        import(`bootswatch/dist/${state.theme.theme}/bootstrap.min.css`);
        resolve([]);
      });
  });
}

loadTheme().then(theme => ReactDOM.render(
  <React.StrictMode>
    {theme}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
