import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from './App';
import './index.css';
import Login from './Login'
import NotFound from './NotFound'
import Editor from './Editor'
import {store, history} from './store/global'
import GroupList from './GroupList'
import GroupAdd from './GroupAdd'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={GroupList}/>
        <Route path="edit" component={Editor}/>
        <Route path="login" component={Login}/>
        <Route path="group" component={GroupList}>
          <Route path="add" component={GroupAdd}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
