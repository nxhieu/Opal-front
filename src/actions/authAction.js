/*
    This file contains all actions related to Authentication feature. All these functions will return a function 
    with dispatch as an argument.  
 */

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_FORM,
  CLEAR_ERRORS,
  USERLOADED_FAIL
} from "./types";

// REGISTER USER
export const register = formData => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/auth/register`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    });

    const data = await res.json();

    if (res.status !== 200 && res.status !== 201) {
      dispatch({ type: REGISTER_FAIL, payload: data });
    } else {
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("here");
    console.log(error);
  }
};

// LOG IN USER
export const login = formData => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await res.json();
    if (res.status !== 200) {
      dispatch({ type: LOGIN_FAIL, payload: "error" });
    } else {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

// LOG OUT USER
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// LOAD USER IF THERE IS A VALID TOKEN
export const loaduser = () => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/auth/loaduser`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: USER_LOADED, payload: data });
    } else {
      dispatch({ type: USERLOADED_FAIL });
    }
  } catch (error) {
    dispatch({ type: USERLOADED_FAIL, payload: error.message });
  }
};

export const reset = () => async dispatch => {
  try {
    dispatch({ type: RESET_FORM });
  } catch (error) {
    console.log(error);
  }
};
