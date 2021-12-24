import axios from "axios";

import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL,
    CHANGE_INSTANCE_STATUS_REQUEST, CHANGE_INSTANCE_STATUS_SUCCESS, CHANGE_INSTANCE_STATUS_FAIL,
    GET_INSTANCE_BY_ID_REQUEST, GET_INSTANCE_BY_ID_SUCCESS, GET_INSTANCE_BY_ID_FAIL,
    CREATE_NEW_INSTANCE_REQUEST, CREATE_NEW_INSTANCE_SUCCESS, CREATE_NEW_INSTANCE_FAIL
} from "../constants/computeConstants.js";

const listInstances = () => async (dispatch) => {
    console.log("listInstance action")
    dispatch({ type: INSTANCE_LIST_REQUEST, payload: {} });
    try {
        const { data } = await axios.get("http://localhost:8080/api/compute/getListInstances", {});
        console.log("action payload: ", data)
        dispatch({ type: INSTANCE_LIST_SUCCESS, payload: data.instances });
    } catch (error) {
        dispatch({ type: INSTANCE_LIST_FAIL, payload: error.message });
    }
}

const changeInstanceStatus = (_id, status) => async (dispatch) => {
    console.log("changeInstanceStatus action: ", _id, status)
    dispatch({ type: CHANGE_INSTANCE_STATUS_REQUEST, payload: {} });
    try {
        const { data } = await axios.post("http://localhost:8080/api/compute/changeInstanceStatus", {
            _id: _id,
            status: status
        });
        console.log("action payload: ", data)
        dispatch({ type: CHANGE_INSTANCE_STATUS_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: CHANGE_INSTANCE_STATUS_FAIL, payload: error.message });
    }
}

const getInstanceByID = (id) => async (dispatch) => {
    console.log("getInstanceByIDReducer action: ", id)
    dispatch({ type: GET_INSTANCE_BY_ID_REQUEST, payload: {} });
    try {
        const { data } = await axios.get(`http://localhost:8080/api/compute/getInstanceByID/${id}`);
        console.log("action payload: ", data)
        dispatch({ type: GET_INSTANCE_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_INSTANCE_BY_ID_FAIL, payload: error.message });
    }
}

const createInstance = (hostname, ownerID, networkID, disk, cpu, ram) => async (dispatch) => {
    console.log("create Instance action: ")
    dispatch({ type: CREATE_NEW_INSTANCE_REQUEST, payload: {} });
    try {
        const { data } = await axios.post("http://localhost:8080/api/compute/createInstance", {
            hostname: hostname,
            ownerID: ownerID,
            networkID: networkID,
            disk: disk,
            ram: ram,
            cpu: cpu
        });
        console.log("action payload: ", data)
        dispatch({ type: CREATE_NEW_INSTANCE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: CREATE_NEW_INSTANCE_FAIL, payload: error.message });
    }
}

export { 
    listInstances, 
    changeInstanceStatus, 
    getInstanceByID,
    createInstance
};