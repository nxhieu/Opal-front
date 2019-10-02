import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL
} from "../actions/types";
import { access } from "fs";

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
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};
