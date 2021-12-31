import {
    GET_ALL_NETWORKS_REQUEST, GET_ALL_NETWORKS_SUCCESS, GET_ALL_NETWORKS_FAIL,
    DELETE_NETWORK_BY_ID_REQUEST, DELETE_NETWORK_BY_ID_SUCCESS, DELETE_NETWORK_BY_ID_FAIL,
    CHANGE_NETWORK_STATUS_REQUEST, CHANGE_NETWORK_STATUS_SUCCESS, CHANGE_NETWORK_STATUS_FAIL
} from "../constants/networkConstants.js";

function getAllNetworksReducer(state = {}, action) {
    console.log("get All Networks Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case GET_ALL_NETWORKS_REQUEST:
            return { message: "request" };
        case GET_ALL_NETWORKS_SUCCESS:
            return { message: "1", networks: action.payload };
        case GET_ALL_NETWORKS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

function deleteNetworkByIDReducer(state = {}, action) {
    console.log("deleteNetworkByIDReducer Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case DELETE_NETWORK_BY_ID_REQUEST:
            return { message: "request" };
        case DELETE_NETWORK_BY_ID_SUCCESS:
            return { message: action.payload };
        case DELETE_NETWORK_BY_ID_FAIL:
            return { message: action.payload };
        default:
            return state;
    }
}

function changeNetworkStatusReducer(state = {}, action) {
    console.log("deleteNetworkByIDReducer Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case CHANGE_NETWORK_STATUS_REQUEST:
            return { message: "request" };
        case CHANGE_NETWORK_STATUS_SUCCESS:
            return { message: action.payload };
        case CHANGE_NETWORK_STATUS_FAIL:
            return { message: action.payload };
        default:
            return state;
    }
}

export {
    getAllNetworksReducer,
    deleteNetworkByIDReducer,
    changeNetworkStatusReducer
}