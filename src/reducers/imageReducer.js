import {
  GETURI_FAIL,
  GETURI_SUCCESS,
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS
} from "../actions/types";

const initialState = {
  message: "",
  posts: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETURI_SUCCESS:
      return {
        ...state,
        message: action.payload.url
      };
    case GETURI_FAIL:
      return {
        ...state
      };
    case GETPOSTS_FAIL:
      return {
        ...state,
        message: action.payload
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        message: "Get post success",
        posts: action.payload.posts
      };

    default:
      return state;
  }
};
