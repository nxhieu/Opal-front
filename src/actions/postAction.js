import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_FAIL,
  DELETEPOST_SUCCESS
} from "./types";

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
    dispatch({ type: GETPOSTS_FAIL, payload: error.message });
  }
};

export const deletePost = post => async dispatch => {
  try {
    const res = await fetch(`${window.apiAddress}/post/deletePost`, {
      method: "DELETE",
      body: JSON.stringify(post),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });

    const data = await res.json();

    dispatch({ type: DELETEPOST_SUCCESS, payload: post._id });
  } catch (error) {
    dispatch({ type: DELETEPOST_FAIL, payload: error.message });
  }
};
