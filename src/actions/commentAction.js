import {
  GETURI_SUCCESS,
  GETURI_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLOSE_COMMENT,
  POSTCOMMENT_SUCCESS,
  POSTCOMMENT_FAIL,
  CLEAR_COMMENT
} from "./types";
import { postImage } from "./postImageAction";

export const postComment = (postId, file, parentsId) => async dispatch => {
  try {
    // const res = await fetch(
    //   `${window.apiAddress}/post/getUri?type=${file.type}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token")
    //     }
    //   }
    // );
    // const awsUrl = await res.json();

    // await fetch(awsUrl.url, {
    //   method: "PUT",
    //   body: file,
    //   headers: {
    //     "Content-Type": file.type
    //   }
    // });
    postImage(file)(dispatch).then(async imageUrl => {
      //create new comment
      await fetch(`${window.apiAddress}/comment/comment`, {
        method: "POST",
        body: JSON.stringify({
          imageUrl,
          postId: postId,
          parentsId: parentsId
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });

      //Clear the current comments inside the post
      dispatch({ type: CLEAR_COMMENT });
      //get all comments of a post back
      getComment(postId)(dispatch);
    });
  } catch (error) {
    dispatch({ type: GETURI_FAIL });
  }
};

export const getComment = postId => async dispatch => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    const res = await fetch(
      `${window.apiAddress}/comment/getCommentList?postId=${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    const data = await res.json();
    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: "fail" });
  }
};

export const deleteComment = (commentId, postId) => async dispatch => {
  try {
    await fetch(
      `${window.apiAddress}/comment/deleteComment?commentId=${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    dispatch({ type: CLEAR_COMMENT });
    getComment(postId)(dispatch);
  } catch (error) {
    dispatch({ type: GETURI_FAIL });
  }
};

export const closeComment = () => dispatch => {
  dispatch({ type: CLOSE_COMMENT });
};
