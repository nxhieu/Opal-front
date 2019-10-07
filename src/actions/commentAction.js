import {
  GETURI_SUCCESS,
  GETURI_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLOSE_COMMENT
} from "./types";

export const postComment = (postId, file, parentsId) => async dispatch => {
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

    await fetch(`${window.apiAddress}/comment/comment`, {
      method: "POST",
      body: JSON.stringify({
        imageUrl: awsUrl.key,
        postId: postId,
        parentsId: parentsId
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    dispatch({ type: GETURI_SUCCESS, payload: awsUrl });
    console.log("comsucc");
  } catch (error) {
    console.log("commfail");
    dispatch({ type: GETURI_FAIL });
  }
};

export const getComment = postId => async dispatch => {
  try {
    console.log("action");
    dispatch({ type: GET_COMMENT_REQUEST });
    console.log("afteractionreq");
    const res = await fetch(
      `${window.apiAddress}/comment/getCommentList?postId=${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      }
    );
    const data = await res.json();
    console.log("after action");
    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: "fail" });
  }
};

export const closeComment = () => async dispatch => {
  dispatch({ type: CLOSE_COMMENT });
};
