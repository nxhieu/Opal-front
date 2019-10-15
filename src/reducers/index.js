/*
    Combine all reducers from all features to a single reducer function and pass to the createStore
*/

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postImageReducer from "./ImageReducer";
import posts from "./postReducer";
import comments from "./commentReducer";
import leaderboards from "./leaderboardReducer";

export default combineReducers({
  auth: authReducer,
  postImage: postImageReducer,
  post: posts,
  comment: comments,
  leaderboard: leaderboards
});
