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

//Register a user
export const register = formData => async dispatch => {
  //Need content type header whenever u make a post request
  //put your
  try {
    const res = await fetch("http://localhost:8080/auth/register", {
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
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// Log in user
export const login = formData => async dispatch => {
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    });
    if ((res.status !== 200) | (res.status !== 201)) {
    }
    const data = await res.json();

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.message
    });
  }
};
// log out user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
