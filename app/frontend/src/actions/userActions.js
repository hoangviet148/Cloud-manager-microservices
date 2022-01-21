import axios from "axios";
import Cookie from 'js-cookie';
import jwt from "jsonwebtoken";

import {
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  GET_USERS_BY_TIER_REQUEST, GET_USERS_BY_TIER_SUCCESS, GET_USERS_BY_TIER_FAIL,
  CHANGE_USER_STATUS_REQUEST, CHANGE_USER_STATUS_SUCCESS, CHANGE_USER_STATUS_FAIL,
  DELETE_USER_BY_ID_REQUEST, DELETE_USER_BY_ID_SUCCESS, DELETE_USER_BY_ID_FAIL,
  CHANGE_USER_TIER_REQUEST, CHANGE_USER_TIER_SUCCESS, CHANGE_USER_TIER_FAIL
} from "../constants/userConstants.js";

const register = (name, email, phone, tier, payment, password) => async (dispatch) => {
  console.log("register action: ", name)
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, phone, tier, payment, password } });
  try {
    const { data } = await axios.post("http://localhost:8080/api/auth/register", { name, email, phone, tier, payment, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  console.log("login action")
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("http://localhost:8080/api/auth/login", { email, password });
    let userInfo = jwt.verify(data.message, "secret")
    console.log("userInfo: ", userInfo)
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
    Cookie.set('userInfo', userInfo);
    Cookie.set('tier', userInfo.tier)
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const getUsersByTier = (tier) => async (dispatch) => {
  console.log("getUsersByTier action")
  dispatch({ type: GET_USERS_BY_TIER_REQUEST, payload: { tier } });
  try {
    const { data } = await axios.get(`http://localhost:8080/api/auth/getUserByTier/${tier}`);
    dispatch({ type: GET_USERS_BY_TIER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_BY_TIER_FAIL, payload: error.message });
  }
}

const changeUserStatus = (id) => async (dispatch) => {
  console.log("changeUserStatus action")
  dispatch({ type: CHANGE_USER_STATUS_REQUEST, payload: { id } });
  try {
    const { data } = await axios.get(`http://localhost:8080/api/auth/changeUserStatus/${id}`);
    dispatch({ type: CHANGE_USER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHANGE_USER_STATUS_FAIL, payload: error.message });
  }
}

const deleteUserByID = (tier, id) => async (dispatch) => {
  console.log("deleteUserByID action")
  dispatch({ type: DELETE_USER_BY_ID_REQUEST, payload: { id } });
  try {
    const { data } = await axios.get(`http://localhost:8080/api/auth/deleteUserByID/${id}`);
    await axios.post('http://localhost:8080/api/auth/updateTierUsers', {
      tier: tier,
      userID: id
    })
    dispatch({ type: DELETE_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_BY_ID_FAIL, payload: error.message });
  }
}

const changeUserTier = (tier, id) => async (dispatch) => {
  console.log("changeUserTier action")
  dispatch({ type: CHANGE_USER_TIER_REQUEST, payload: { id } });
  try {
    let data = await axios.post('http://localhost:8080/api/auth/changeUserTier', {
      tier: tier,
      userID: id
    })
    dispatch({ type: CHANGE_USER_TIER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHANGE_USER_TIER_FAIL, payload: error.message });
  }
}

export { register, signin, getUsersByTier, changeUserStatus, deleteUserByID, changeUserTier };