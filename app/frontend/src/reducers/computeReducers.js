import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL,
    CHANGE_INSTANCE_STATUS_REQUEST, CHANGE_INSTANCE_STATUS_SUCCESS, CHANGE_INSTANCE_STATUS_FAIL
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

export {
    instanceListReducer,
    changeInstanceStatusReducer
}