import {
    TIER_LIST_REQUEST, TIER_LIST_SUCCESS, TIER_LIST_FAIL,
} from "../constants/tierConstants.js";

function tierListReducer(state = {}, action) {
    console.log("tier list reducer")
    console.log("action:", action)
    switch (action.type) {
        case TIER_LIST_REQUEST:
            return { loading: true };
        case TIER_LIST_SUCCESS:
            return { loading: false, tiers: action.payload };
        case TIER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    tierListReducer
}