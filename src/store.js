import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];
//apply composeWithDevTools to view state in chrome 
//middleware thunk to allow action to return a function which get passed in dispatch method. So that we could use dispatch method to call the reducer.
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
