import {
  GETURI_SUCCESS,
  GETURI_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL
} from "./types";

export const postComment = (postId, file) => async dispatch => {
  try {
    const res = await fetch(
      `${window.apiAddress}/post/getUri?type=${file.type}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    const awsUrl = await res.json();

    await fetch(awsUrl.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    });
    console.log(post_id);
    await fetch(`${window.apiAddress}/comment/comment`, {
      method: "POST",
      body: JSON.stringify({ imageUrl: awsUrl.key, postId: postId }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    dispatch({ type: COMMENT_SUCCESS, payload: awsUrl });
    console.log("comsucc");
  } catch (error) {
    console.log("commfail");
    dispatch({ type: COMMENT_FAIL });
  }
};

export const getComment = postId => async dispatch => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    const res = await fetch(`${window.apiAddress}/comment/getCommentList`, {
      method: "GET",
      body: JSON.stringify({ postId: postId }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    const data = await res.json();
    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: error });
    console.log(error);
  }
};
