import React from 'react';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import * as articleReducers from '../reducers/Article'
import thunk from 'redux-thunk';
const reducer = combineReducers({
  ...articleReducers,
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

export const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(thunk)
)

export const history = syncHistoryWithStore(browserHistory, store)
