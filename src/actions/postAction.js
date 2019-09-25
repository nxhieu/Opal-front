import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_FAIL,
  DELETEPOST_SUCCESS,
  GETPOSTS_REQUEST
} from "./types";

export const getPosts = (itemsPerPage, currentPage) => async dispatch => {
  try {
    //run the loading image
    dispatch({ type: GETPOSTS_REQUEST });
    const res = await fetch(
      `${window.apiAddress}/post/getPosts?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      }
    );
    const data = await res.json();
    dispatch({ type: GETPOSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL, payload: error.message });
    console.log(error);
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
