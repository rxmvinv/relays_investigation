import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storeFactory from './store';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App';

const store = storeFactory()

window.React = React;
window.store = store;

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <App store={store} />
      </Router>
    </Provider>
    ,
  document.getElementById('root')
);
