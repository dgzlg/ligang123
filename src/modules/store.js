/* global window */
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {chunkMiddleware, createRouteCallback} from "./common/utils/reduxMiddleware";
import history from './history';
import reducers from './reducer.index';
import routeCallback from './routeCallback';

/* redux-devtool */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* route callback */
const routeCallbackMiddleware = createRouteCallback(routeCallback);

export default createStore(
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  }),
  composeEnhancers(
    applyMiddleware(
      chunkMiddleware,
      routerMiddleware(history),
      routeCallbackMiddleware,
    )
  )
);
