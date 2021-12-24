import {
    GET_ALL_NETWORKS_REQUEST, GET_ALL_NETWORKS_SUCCESS, GET_ALL_NETWORKS_FAIL,
} from "../constants/networkConstants.js";

function getAllNetworksReducer(state = {}, action) {
    console.log("get All Networks Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case GET_ALL_NETWORKS_REQUEST:
            return { message: "request" };
        case GET_ALL_NETWORKS_SUCCESS:
            return { network: action.payload };
        case GET_ALL_NETWORKS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

export {
    getAllNetworksReducer
}