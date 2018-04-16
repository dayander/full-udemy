"use strict"
// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// REACT-ROUTER
import {BrowserRouter} from 'react-router-dom';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
// STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);
// WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

import routes from './route'
const Routes = (
    <Provider store={store}>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </Provider>
)

ReactDOM.hydrate(
    Routes, document.getElementById('app')
);