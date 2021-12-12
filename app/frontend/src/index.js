import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import SideBar from './SideBar';
import store from './store';

ReactDOM.render(
  <Provider store = {store}>
    <SideBar />
  </Provider>, document.getElementById('root')
);

reportWebVitals();
