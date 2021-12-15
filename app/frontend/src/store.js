import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { productListReducer, productDetailsReducer, productDeleteReducer, productSaveReducer, productReviewSaveReducer } from './reducer/productReducers';
import Cookie from 'js-cookie';
//import { cartReducer } from './reducer/cartReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer'
//import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducer/orderReducers';

// const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {};
const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;