import axios from "axios";
import {
    GET_ALL_NETWORKS_REQUEST, GET_ALL_NETWORKS_SUCCESS, GET_ALL_NETWORKS_FAIL,
    DELETE_NETWORK_BY_ID_REQUEST, DELETE_NETWORK_BY_ID_SUCCESS, DELETE_NETWORK_BY_ID_FAIL,
    CHANGE_NETWORK_STATUS_REQUEST, CHANGE_NETWORK_STATUS_SUCCESS, CHANGE_NETWORK_STATUS_FAIL
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

const deleteNetworkByID = (id) => async (dispatch) => {
    console.log("deleteNetworkByID action: ", id)
    dispatch({ type: DELETE_NETWORK_BY_ID_REQUEST, payload: {} });
    try {
        const { data } = await axios.get(`http://localhost:8080/api/network/deleteNetworkByID/${id}`, {});
        console.log("action payload: ", data)
        dispatch({ type: DELETE_NETWORK_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_NETWORK_BY_ID_FAIL, payload: error.message });
    }
}

const changeNetworkStatus = (id) => async (dispatch) => {
    console.log("changeNetworkStatus action: ", id)
    dispatch({ type: CHANGE_NETWORK_STATUS_REQUEST, payload: {} });
    try {
        const { data } = await axios.get(`http://localhost:8080/api/network/changeNetworkStatus/${id}`, {});
        console.log("action payload: ", data)
        dispatch({ type: CHANGE_NETWORK_STATUS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHANGE_NETWORK_STATUS_FAIL, payload: error.message });
    }
}


export { 
    getAllNetworks,
    deleteNetworkByID,
    changeNetworkStatus
};