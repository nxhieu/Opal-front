import {
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
        comments: [...state.comments, action.payload.comments]
      };
    case GET_COMMENT_REQUEST:
      return {
        ...state
      };
    default:
      return state;
  }
};
