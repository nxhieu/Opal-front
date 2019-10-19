/*
    This file contains all actions related to Comment feature. All these functions will return a function 
    with dispatch as an argument.  
 */

import {
  GETURI_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  CLOSE_COMMENT,
  CLEAR_COMMENT,
  DELETECOMMENT_SUCCESS,
  EDITCOMMENT_FAIL,
  EDITCOMMENT_SUCCESS,
  CREATECOMMENT_SUCCESS,
  COMMENT_FAIL
} from "./types";
import store from "../../src/store";
import { postImage, editImage } from "./imageAction";

//post the comment to backend
export const postComment = (postId, file, parentsId) => async dispatch => {
  try {
    postImage(file)(dispatch).then(async imageUrl => {
      //create new comment
      const res = await fetch(`${window.apiAddress}/comment/comment`, {
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
      const data = await res.json();

      if (res.status !== 200) {
        dispatch({ type: COMMENT_FAIL, payload: data });
      } else {
        //get new commentlist
        const newCommentlist = createCommentObject(data.comment);
        dispatch({ type: CREATECOMMENT_SUCCESS, payload: newCommentlist });
      }
    });
  } catch (error) {
    dispatch({ type: GETURI_FAIL, payload: error });
  }
};

//get the comment list from backend by providing the postId to backend
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
    if (res.status !== 200) {
      dispatch({ type: COMMENT_FAIL, payload: data });
    } else {
      dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: error });
  }
};

//send the commentId to backend to delete the comment
export const deleteComment = commentId => async dispatch => {
  try {
    const res = await fetch(
      `${window.apiAddress}/comment/deleteComment?commentId=${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    const data = await res.json();
    if (res.status !== 201) {
      dispatch({ type: COMMENT_FAIL, payload: data });
    } else {
      //get new commentlist
      const deletedComment = deleleCommentObject(commentId);
      dispatch({ type: DELETECOMMENT_SUCCESS, payload: deletedComment });
    }
  } catch (error) {
    dispatch({ type: GETURI_FAIL, payload: error });
  }
};

export const editComment = (comment, file) => async dispatch => {
  try {
    //edit image on s3 . use the new imageUrl to edit a new comment
    editImage(comment, file, "comment")(dispatch).then(async imageUrl => {
      const res = await fetch(`${window.apiAddress}/comment/editComment`, {
        method: "POST",
        body: JSON.stringify({ comment, imageUrl }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      const data = await res.json();
      if (res.status !== 201) {
        dispatch({ type: COMMENT_FAIL, payload: data });
      } else {
        //get new commentlist
        const updatedComments = editCommentObject(data.comment);
        dispatch({ type: CLEAR_COMMENT });
        dispatch({ type: EDITCOMMENT_SUCCESS, payload: updatedComments });
      }
    });
  } catch (error) {
    dispatch({ type: EDITCOMMENT_FAIL, payload: error });
  }
};

export const closeComment = () => dispatch => {
  dispatch({ type: CLOSE_COMMENT });
};

//Delete Comments on the store
const deleleCommentObject = commentId => {
  const comments = store.getState().comment.comments;

  let copyComment = Object.assign([], comments);
  // recursively loop through comment array and child comment.
  function removeComment(commentId, copyComment) {
    for (let i in copyComment) {
      //delete  comment if a comment with that id was found
      if (copyComment[i]._id === commentId) {
        copyComment.splice(i, 1);
        return copyComment;
      }
      //if child field exist and an array exist function call it self again.
      if (copyComment[i].child && copyComment[i].child.length) {
        removeComment(commentId, copyComment[i].child);
      }
    }
  }
  removeComment(commentId, copyComment);
  return copyComment;
};

//Edit imageUrl on specific comment on the store when user edit comment.
const editCommentObject = updatedComment => {
  const comments = store.getState().comment.comments;

  let copyComment = Object.assign([], comments);
  // recursively loop through comment array and child comment.
  function editComment(commentId, copyComment) {
    for (let i in copyComment) {
      //replace new imageUrl if comment was found
      if (copyComment[i]._id === commentId) {
        copyComment[i].imageUrl = updatedComment.imageUrl;
        return copyComment;
      }
      //if child field exist and an array exist function call it self again.
      if (copyComment[i].child && copyComment[i].child.length) {
        editComment(commentId, copyComment[i].child);
      }
    }
  }
  editComment(updatedComment._id, copyComment);
  return copyComment;
};
// add newly created comment to the correct position on comment array

const createCommentObject = newComment => {
  const comments = store.getState().comment.comments;

  let copyComment = Object.assign([], comments);

  function addComment(parentsID, copyComment) {
    //if parentsId is null => add to the outer comment array
    if (parentsID === null) {
      copyComment.push(newComment);
      return copyComment;
    }
    // recursively loop through comment array and child comment
    for (let i in copyComment) {
      //if a comment with id equal to parentID of the newly created comment, push to the child array of that comment.
      if (copyComment[i]._id === parentsID) {
        copyComment[i].child.push(newComment);
        return copyComment;
      }
      //if child field exist and an array exist function call it self again.
      if (copyComment[i].child && copyComment[i].child.length) {
        addComment(parentsID, copyComment[i].child);
      }
    }
  }
  addComment(newComment.parentsID, copyComment);
  return copyComment;
};
