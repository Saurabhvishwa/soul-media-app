import {createStore , combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducers from './reducers/userReducers';
import dataReducers from './reducers/dataReducers';
import uiReducers from './reducers/uiReducers';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers ({
    user:userReducers,
    ui:uiReducers,
    data:dataReducers,
});

const store = createStore(rootReducer , initialState, 
    compose(
        applyMiddleware(...middleware) , 
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f));

export default store;