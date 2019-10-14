/*
    This file contains all actions related to Comment feature. All these functions will return a function 
    with dispatch as an argument.  
 */

import {
  GETURI_SUCCESS,
  GETURI_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLOSE_COMMENT,
  POSTCOMMENT_SUCCESS,
  POSTCOMMENT_FAIL,
  CLEAR_COMMENT,
  EDITCOMMENT_FAIL
} from "./types";
import { postImage, editImage } from "./imageAction";

export const postComment = (postId, file, parentsId) => async dispatch => {
  try {
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
    dispatch({ type: GET_COMMENT_FAIL, payload: error.message });
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

export const editComment = (comment, file, postId) => async dispatch => {
  try {
    editImage(comment, file, "comment")(dispatch).then(async imageUrl => {
      await fetch(`${window.apiAddress}/comment/editComment`, {
        method: "POST",
        body: JSON.stringify({ comment, imageUrl }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      dispatch({ type: CLEAR_COMMENT });
      getComment(postId)(dispatch);
    });
  } catch (error) {
    dispatch({ type: EDITCOMMENT_FAIL, payload: error });
  }
};

export const closeComment = () => dispatch => {
  dispatch({ type: CLOSE_COMMENT });
};
