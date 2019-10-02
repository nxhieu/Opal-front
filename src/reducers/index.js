import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postImageReducer from "./postImageReducer";
import posts from "./postReducer";
import comments from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  postImage: postImageReducer,
  post: posts,
  comment: comments
  //add your reducer here
});
