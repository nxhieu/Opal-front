import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL,
  GETPOSTS_REQUEST,
  GETPOSTS_ANOTHERPAGE,
  GET_SORTEDRANK_SUCCESS,
  GET_RANK_FAIL
} from "./../actions/types";
import { access } from "fs";

const initialState = {
  message: "",
  posts: [],
  isLoading: false,
  hasMore: true,
  currentPage: 1,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETPOSTS_ANOTHERPAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case GETPOSTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GETPOSTS_FAIL:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
        error: true
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        hasMore: action.payload.posts.length >= 10,
        posts: [...state.posts, ...action.payload.posts],
        isLoading: false
      };
    case DELETEPOST_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        posts: state.posts.filter(post => post._id !== action.payload),
        isLoading: false
      };
    case DELETEPOST_FAIL:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
