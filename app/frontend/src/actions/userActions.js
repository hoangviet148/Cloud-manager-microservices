import axios from "axios";
import Cookie from 'js-cookie';

import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL
} from "../constants/userConstants.js";

const register = (name, email, phone, tier, payment, password) => async (dispatch) => {
    console.log("register action")
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, phone, tier, payment, password } });
    try {
        const { data } = await axios.post("http://localhost:8080/api/auth/register", { name, email, phone, tier, payment, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

export { register };