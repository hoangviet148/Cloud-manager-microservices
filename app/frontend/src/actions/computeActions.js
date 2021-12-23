import axios from "axios";

import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL,
    CHANGE_INSTANCE_STATUS_REQUEST, CHANGE_INSTANCE_STATUS_SUCCESS, CHANGE_INSTANCE_STATUS_FAIL
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
export { listInstances, changeInstanceStatus };