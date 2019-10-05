import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../actions/types";

const initialState = {
  token: null,
  userId: null,
  email: null,
  firstName: null,
  isAuthenticated: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        email: action.payload.email,
        firstName: action.payload.firstName,
        isAuthenticated: true
      };
    case USER_LOADED:
      return {
        ...state,
        userId: action.payload.userId,
        email: action.payload.email,
        firstName: action.payload.firstName,
        isAuthenticated: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //REMOVE THE TOKEN FROM STORAGE
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userId: null,
        firstName: null,
        email: null,
        error: action.payload
      };
    default:
      return state;
  }
};
