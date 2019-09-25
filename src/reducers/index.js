import { combineReducers } from "redux";
import authReducer from "./authReducer";
<<<<<<< HEAD
import imageReducer from "./imageReducer";

export default combineReducers({
  auth: authReducer,
  image: imageReducer
=======
import postImageReducer from "./postImageReducer";
import posts from "./postReducer";

export default combineReducers({
  auth: authReducer,
  postImage: postImageReducer,
  post: posts
>>>>>>> 6c0fbd2b77beddcac7476ae63f8e9e431a275f64
  //add your reducer here
});
