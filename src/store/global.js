import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import * as articleReducers from '../reducers/Article'
import * as groupReducers from '../reducers/Group'
import thunk from 'redux-thunk';
const reducer = combineReducers({
  ...articleReducers,
  ...groupReducers,
  routing: routerReducer
})

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export const history = syncHistoryWithStore(browserHistory, store)
