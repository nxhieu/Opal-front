/*
    Reducer for leaderboard feature: dispatch to redux store
*/


import {
  GET_RANK_REQUEST,
  GET_RANK_SUCCESS,
  GET_RANK_FAIL
} from "../actions/types";

const initialState = {
  count: [],
  users: [],
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RANK_REQUEST:
      return {
        ...state,
        count: [],
        users: []
      };
    case GET_RANK_SUCCESS:
      return {
        ...state,
        count: [...state.count, ...action.payload.count],
        users: [...state.users, ...action.payload.users]
      };
    case GET_RANK_FAIL:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
