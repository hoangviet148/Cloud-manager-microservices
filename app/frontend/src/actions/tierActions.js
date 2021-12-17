import axios from "axios";

import {
    TIER_LIST_REQUEST, TIER_LIST_SUCCESS, TIER_LIST_FAIL,
} from "../constants/tierConstants.js";

const listTiers = () => async (dispatch) => {
    console.log("listTier action")
    dispatch({ type: TIER_LIST_REQUEST, payload: {} });
    try {
        const { data } = await axios.get("http://localhost:8080/api/auth/getListTiers", {});
        console.log(data.tiers)
        dispatch({ type: TIER_LIST_SUCCESS, payload: data.tiers });
    } catch (error) {
        dispatch({ type: TIER_LIST_FAIL, payload: error.message });
    }
}

export { listTiers };