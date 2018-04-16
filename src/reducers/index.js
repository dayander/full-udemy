"use strict";
import {combineReducers} from 'redux';

//import Reducers


import {booksReducer} from './bookReducers'
import {cartReducer} from './cartReducers'




// combine reducers


export default combineReducers({
    books: booksReducer,
    cart: cartReducer,
})