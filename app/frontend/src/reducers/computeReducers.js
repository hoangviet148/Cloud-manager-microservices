import {
    INSTANCE_LIST_REQUEST, INSTANCE_LIST_SUCCESS, INSTANCE_LIST_FAIL
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

export {
    instanceListReducer
}