import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL,
    CHANGE_INSTANCE_STATUS_REQUEST, CHANGE_INSTANCE_STATUS_SUCCESS, CHANGE_INSTANCE_STATUS_FAIL,
    GET_INSTANCE_BY_ID_REQUEST, GET_INSTANCE_BY_ID_SUCCESS, GET_INSTANCE_BY_ID_FAIL,
    CREATE_NEW_INSTANCE_REQUEST, CREATE_NEW_INSTANCE_SUCCESS, CREATE_NEW_INSTANCE_FAIL,
    DELETE_INSTANCE_REQUEST, DELETE_INSTANCE_SUCCESS, DELETE_INSTANCE_FAIL
} from "../constants/computeConstants.js";

function instanceListReducer(state = {}, action) {
    console.log("instance list reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case INSTANCE_LIST_REQUEST:
            return { loading: true };
        case INSTANCE_LIST_SUCCESS:
            return { loading: false, instances: action.payload };
        case INSTANCE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function changeInstanceStatusReducer(state = {}, action) {
    console.log("change Instance Status Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case CHANGE_INSTANCE_STATUS_REQUEST:
            return { message: "request" };
        case CHANGE_INSTANCE_STATUS_SUCCESS:
            return { message: action.payload };
        case CHANGE_INSTANCE_STATUS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

function createInstance(state = {}, action) {
    console.log("createInstance Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case CREATE_NEW_INSTANCE_REQUEST:
            return { message: "request" };
        case CREATE_NEW_INSTANCE_SUCCESS:
            return { message: action.payload };
        case CREATE_NEW_INSTANCE_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

function getInstanceByIDReducer(state = {}, action) {
    console.log("getInstanceByIDReducer Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case GET_INSTANCE_BY_ID_REQUEST:
            return { message: "request" };
        case GET_INSTANCE_BY_ID_SUCCESS:
            return { instance: action.payload };
        case GET_INSTANCE_BY_ID_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

function deleteInstanceReducer(state = {}, action) {
    console.log("delete Instance Reducer Reducer")
    console.log("reducer action:", action)
    switch (action.type) {
        case DELETE_INSTANCE_REQUEST:
            return { message: "request" };
        case DELETE_INSTANCE_SUCCESS:
            return action.payload ;
        case DELETE_INSTANCE_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}

export {
    instanceListReducer,
    changeInstanceStatusReducer,
    getInstanceByIDReducer,
    createInstance,
    deleteInstanceReducer
}