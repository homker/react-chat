import { createStore,applyMiddleware, combineReducers,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createlogger from 'redux-logger';
import rootReducer from '../reducer/reducer.js';
import {createHistory} from 'history';
import {reduxReactRouter} from 'redux-router'

const loggerMiddleware = createlogger();

const StoreWithMiddleWare = compose(
    applyMiddleware(
    thunkMiddleware,
    loggerMiddleware),
    reduxReactRouter({createHistory}))(createStore)(rootReducer);

export default function store(){
    return StoreWithMiddleWare;
}