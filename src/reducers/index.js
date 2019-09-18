import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postImageReducer from "./postImageReducer";
import posts from "./postReducer";

export default combineReducers({
  auth: authReducer,
  postImage: postImageReducer,
  post: posts
  //add your reducer here
});
