import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import { tierListReducer } from './reducers/tierReducers';
import {
    userRegisterReducer,
    userSigninReducer,
    getUsersByTierReducer,
    changeUserStatusReducer,
    deleteUserByIDReducer
} from './reducers/userReducer'
import {
    instanceListReducer,
    changeInstanceStatusReducer,
    getInstanceByIDReducer,
    deleteInstanceReducer
} from './reducers/computeReducers';
import {
    getAllNetworksReducer
} from './reducers/networkReducers';


const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: { userInfo } };

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    tierList: tierListReducer,
    instanceList: instanceListReducer,
    changeInstanceStatus: changeInstanceStatusReducer,
    InstanceByID: getInstanceByIDReducer,
    AllNetworks: getAllNetworksReducer,
    deleteInstance: deleteInstanceReducer,
    getUsersByTier: getUsersByTierReducer,
    changeUserStatus: changeUserStatusReducer,
    deleteUserByID: deleteUserByIDReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;