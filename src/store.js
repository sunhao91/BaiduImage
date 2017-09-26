import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk';
import main from './reducers/main';
import search from './reducers/search';

const identity = x => x;

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, __DEV__ ? logger : identity)(createStore);

const reducer = combineReducers({ main, search});

export default () => createStoreWithMiddleware(reducer);
