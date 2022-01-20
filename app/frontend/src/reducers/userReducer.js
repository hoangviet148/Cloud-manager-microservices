import {
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT,
  GET_USERS_BY_TIER_REQUEST, GET_USERS_BY_TIER_SUCCESS, GET_USERS_BY_TIER_FAIL,
  CHANGE_USER_STATUS_REQUEST, CHANGE_USER_STATUS_SUCCESS, CHANGE_USER_STATUS_FAIL,
  DELETE_USER_BY_ID_REQUEST, DELETE_USER_BY_ID_SUCCESS, DELETE_USER_BY_ID_FAIL,
  CHANGE_USER_TIER_REQUEST, CHANGE_USER_TIER_SUCCESS, CHANGE_USER_TIER_FAIL
} from "../constants/userConstants";


function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userSigninReducer(state = {}, action) {
  console.log("login reducer: ", action)
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function getUsersByTierReducer(state = {}, action) {
  console.log("getUsersByTierReducer reducer: ", action)
  switch (action.type) {
    case GET_USERS_BY_TIER_REQUEST:
      return { loading: true };
    case GET_USERS_BY_TIER_SUCCESS:
      return action.payload;
    case GET_USERS_BY_TIER_FAIL:
      return { error: action.payload };
    default: return state;
  }
}

function changeUserStatusReducer(state = {}, action) {
  console.log("changeUserStatusReducer reducer: ", action)
  switch (action.type) {
    case CHANGE_USER_STATUS_REQUEST:
      return { loading: true };
    case CHANGE_USER_STATUS_SUCCESS:
      return action.payload;
    case CHANGE_USER_STATUS_FAIL:
      return { error: action.payload };
    default: return state;
  }
}

function deleteUserByIDReducer(state = {}, action) {
  console.log("deleteUserByIDReducer reducer: ", action)
  switch (action.type) {
    case DELETE_USER_BY_ID_REQUEST:
      return { loading: true };
    case DELETE_USER_BY_ID_SUCCESS:
      return action.payload;
    case DELETE_USER_BY_ID_FAIL:
      return { error: action.payload };
    default: return state;
  }
}

function changeUserTierReducer(state = {}, action) {
  console.log("changeUserTier reducer: ", action)
  switch (action.type) {
    case CHANGE_USER_TIER_REQUEST:
      return { loading: true };
    case CHANGE_USER_TIER_SUCCESS:
      return action.payload;
    case CHANGE_USER_TIER_FAIL:
      return { error: action.payload };
    default: return state;
  }
}

export {
  userRegisterReducer,
  userSigninReducer,
  getUsersByTierReducer,
  changeUserStatusReducer,
  deleteUserByIDReducer,
  changeUserTierReducer
}