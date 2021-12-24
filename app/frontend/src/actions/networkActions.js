import axios from "axios";
import {
    GET_ALL_NETWORKS_REQUEST, GET_ALL_NETWORKS_SUCCESS, GET_ALL_NETWORKS_FAIL,
} from "../constants/networkConstants.js";

const getAllNetworks = () => async (dispatch) => {
    console.log("listInstance action")
    dispatch({ type: GET_ALL_NETWORKS_REQUEST, payload: {} });
    try {
        const { data } = await axios.get("http://localhost:8080/api/network/getAllNetworks", {});
        console.log("action payload: ", data)
        dispatch({ type: GET_ALL_NETWORKS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_NETWORKS_FAIL, payload: error.message });
    }
}

export { 
    getAllNetworks
};