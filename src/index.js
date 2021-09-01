import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // react-redux의 Provider 임포트
import { store } from './helpers';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { configureFakeBackend } from './helpers';

configureFakeBackend();

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
