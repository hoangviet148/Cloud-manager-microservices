import axios from "axios";

import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL
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

export { listInstances };