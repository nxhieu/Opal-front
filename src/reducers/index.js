import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postImageReducer from "./postImageReducer";
import posts from "./postReducer";
import comments from "./commentReducer";
import leaderboards from "./leaderboardReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  auth: authReducer,
  postImage: postImageReducer,
  post: posts,
  comment: comments,
  leaderboard: leaderboards,
  form: reduxForm
  //add your reducer here
});
