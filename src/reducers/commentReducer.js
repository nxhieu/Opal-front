/*
    Reducer for comment feature: dispatch to redux store
*/

import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLOSE_COMMENT,
  CLEAR_COMMENT,
  COMMENT_FAIL
} from "../actions/types";

const initialState = {
  message: "",
  comments: [],
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return {
        ...state
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        comments: [...state.comments, ...action.payload.comments]
      };
    case GET_COMMENT_FAIL:
    case COMMENT_FAIL:
      return {
        ...state,
        message: action.payload.message
      };
    case CLOSE_COMMENT:
    case CLEAR_COMMENT:
      return {
        ...state,
        comments: []
      };
    default:
      return state;
  }
};
