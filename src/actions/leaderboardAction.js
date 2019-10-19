/*
    This file contains all actions related to Leaderboard feature. All these functions will return a function 
    with dispatch as an argument.  
 */

import { GET_RANK_REQUEST, GET_RANK_SUCCESS, GET_RANK_FAIL } from "./types";

// Get the user list and number of post for the leaderboard ranking
export const getRank = () => async dispatch => {
  try {
    dispatch({ type: GET_RANK_REQUEST });

    const res = await fetch(`${window.apiAddress}/leaderboard/getRank`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();

    dispatch({ type: GET_RANK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RANK_FAIL,
      payload: error
    });
  }
};
