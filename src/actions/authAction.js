import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "./types";

// Due to the use of the use of redux-thunk in middleware, function get passed in method dispatch.
//When a function contains api call. we will have to use async function (OR USE PROMISE)
export const register = formData => async dispatch => {
  //put request to the backend (api call). We have to use
  try {
    const res = await fetch(`${window.apiAddress}/auth/register`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    });

    if (res.status !== 200 && res.status !== 201) {
      console.log("error");
    }
    const data = await res.json();
    //after api calls, method dispatch get called and dispatch user data to reducer
    //dispatch to reducer (the type here is just a string to specify condition, the payload is data from api calls)
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// Log in user
export const login = formData => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (res.status !== 200) {
      dispatch({ type: LOGIN_FAIL, payload: "error" });
    } else {
      const data = await res.json();
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.message
    });
  }
};
// log out user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

//have not implemented yet. load user when there is a valid token
export const loaduser = () => async dispatch => {
  try {
    //
    const res = await fetch(`${window.apiAddress}/auth/loaduser`, {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();
    dispatch({ type: USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
