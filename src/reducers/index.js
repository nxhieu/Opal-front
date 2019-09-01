import { combineReducers } from "redux";
import authReducer from "./authReducer";
import imageReducer from "./imageReducer";

export default combineReducers({
  auth: authReducer,
  image: imageReducer
  //add your reducer here
});
