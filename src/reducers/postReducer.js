import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL,
  GETPOSTS_REQUEST,
  GETPOSTS_ANOTHERPAGE,
  POSTEMOJI_SUCCESS,
  CLEARPOSTS_SUCCESS,
  CREATEPOST_SUCCESS,
  EDITPOST_SUCCESS,
  EDITPOST_FAIL,
  DELETEEMOJI_SUCCESS
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
    case CLEARPOSTS_SUCCESS:
      return {
        ...state,
        posts: [],
        currentPage: 1
      };
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
    case CREATEPOST_SUCCESS:
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
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
    case EDITPOST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        )
      };
    case POSTEMOJI_SUCCESS:
    case DELETEEMOJI_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        )
      };
    case EDITPOST_FAIL:
    default:
      return state;
  }
};
