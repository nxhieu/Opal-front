import { GETPOSTS_FAIL, GETPOSTS_SUCCESS } from "./types";

export const getPosts = () => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/post/getPosts`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();
    dispatch({ type: GETPOSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL });
  }
};
