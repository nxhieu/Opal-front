import {
  COMMENT_SUCCESS,
  COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  message: "",
  comments: [],
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        comments: [...state.comments, ...action.payload.comments]
      };
    default:
      return state;
  }
};
