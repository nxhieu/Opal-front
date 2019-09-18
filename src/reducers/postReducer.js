import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL
} from "./../actions/types";

const initialState = {
  message: "",
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETPOSTS_FAIL:
      return {
        ...state,
        message: action.payload.message
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        posts: action.payload.posts
      };
    case DELETEPOST_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case DELETEPOST_FAIL:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};
