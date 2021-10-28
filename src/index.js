import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'react-responsive-modal/styles.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducers from './redux/reducers/rootReducers';

const store = createStore(rootReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

