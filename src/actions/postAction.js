/*
    This file contains all actions related the post (which include emoji) features. All these functions will return a function 
    with dispatch as an argument.  
 */
import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_FAIL,
  DELETEPOST_SUCCESS,
  GETPOSTS_REQUEST,
  GETPOSTS_ANOTHERPAGE,
  POSTEMOJI_SUCCESS,
  POSTEMOJI_FAIL,
  DELETEEMOJI_SUCCESS,
  DELETEEMOJI_FAIL,
  CLEARPOSTS_SUCCESS,
  EDITPOST_FAIL,
  EDITPOST_SUCCESS,
  CREATEPOST_SUCCESS,
  CREATEPOST_FAIL
} from "./types";
import { postImage, editImage } from "./postImageAction";

//Create post

export const createPost = file => async dispatch => {
  //Call utility function to post image to s3 . then create a post in the database with String Url
  postImage(file)(dispatch).then(async imageUrl => {
    try {
      const blogRes = await fetch(`${window.apiAddress}/post/createPost`, {
        method: "POST",
        body: JSON.stringify({ imageUrl }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      const createdpost = await blogRes.json();
      dispatch({ type: CREATEPOST_SUCCESS, payload: createdpost });
    } catch (error) {
      dispatch({ type: CREATEPOST_FAIL, payload: error.message });
    }
  });
};

export const getPosts = currentPage => async dispatch => {
  try {
    //run the loading image
    dispatch({ type: GETPOSTS_REQUEST });

    const res = await fetch(
      `${window.apiAddress}/post/getPosts?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    const data = await res.json();
    //delay loading to avoid async error.
    setTimeout(() => {
      dispatch({ type: GETPOSTS_SUCCESS, payload: data });
    }, 500);
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL, payload: error.message });
  }
};
export const editPost = (file, post) => async dispatch => {
  try {
    editImage(post, file, "post")(dispatch).then(async imageUrl => {
      const blogRes = await fetch(`${window.apiAddress}/post/editPost`, {
        method: "POST",
        body: JSON.stringify({ post, imageUrl }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      const createdpost = await blogRes.json();

      dispatch({ type: EDITPOST_SUCCESS, payload: createdpost });
    });
  } catch (error) {
    dispatch({ type: EDITPOST_FAIL, payload: error.message });
  }
};

//Delete a post

export const deletePost = post => async dispatch => {
  try {
    await fetch(`${window.apiAddress}/post/deletePost`, {
      method: "DELETE",
      body: JSON.stringify(post),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });

    dispatch({ type: DELETEPOST_SUCCESS, payload: post._id });
  } catch (error) {
    dispatch({ type: DELETEPOST_FAIL, payload: error.message });
  }
};

//Create or Edit current emoji

export const postEmoji = (emoji, post, userId, firstName) => async dispatch => {
  try {
    //assign post to a new object to avoid mutating the state
    let copyPost = Object.assign({}, post);
    //check if post has any emoji react yet
    if (copyPost.emoji.length === 0) {
      copyPost.emoji.push({ user: userId, firstName, emoji });
      await fetch(`${window.apiAddress}/post/postEmoji`, {
        method: "POST",
        body: JSON.stringify({ emoji, postId: post._id, userId, firstName }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      dispatch({ type: POSTEMOJI_SUCCESS, payload: copyPost });
    } else {
      //find poition of emoji in the emoji array (return a number if found, return -1 if not found)
      let emojiIndex = copyPost.emoji.findIndex(emoji => emoji.user === userId);
      // an Emoji from the user was found . change it and called the backend to change the document
      if (emojiIndex >= 0) {
        if (copyPost.emoji[emojiIndex].emoji !== emoji) {
          copyPost.emoji[emojiIndex].emoji = emoji;
          await fetch(`${window.apiAddress}/post/postEmoji`, {
            method: "POST",
            body: JSON.stringify({
              emoji,
              postId: post._id,
              userId,
              firstName
            }),
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-type": "application/json"
            }
          });
          dispatch({ type: POSTEMOJI_SUCCESS, payload: copyPost });
        }
        //if no Emoji belong to the user was found. Create a new one.
      } else {
        copyPost.emoji.push({ user: userId, firstName, emoji });
        await fetch(`${window.apiAddress}/post/postEmoji`, {
          method: "POST",
          body: JSON.stringify({ emoji, postId: post._id, userId, firstName }),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-type": "application/json"
          }
        });
        dispatch({ type: POSTEMOJI_SUCCESS, payload: copyPost });
      }
    }
  } catch (error) {
    dispatch({ type: POSTEMOJI_FAIL, payload: error.message });
  }
};

//Delete Emoji

export const deleteEmoji = (emoji, post, userId) => async dispatch => {
  try {
    let copyPost = Object.assign({}, post);

    if (copyPost.emoji.length > 0) {
      let emojiIndex = copyPost.emoji.findIndex(emoji => emoji.user === userId);
      if (emojiIndex => 0 && copyPost.emoji[emojiIndex].emoji === emoji) {
        copyPost.emoji.splice(emojiIndex, 1);

        await fetch(`${window.apiAddress}/post/deleteEmoji`, {
          method: "DELETE",
          body: JSON.stringify({ postId: post._id, userId }),
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-type": "application/json"
          }
        });

        dispatch({ type: DELETEEMOJI_SUCCESS, payload: copyPost });
      }
    }
  } catch (error) {
    dispatch({ type: DELETEEMOJI_FAIL, payload: error.message });
  }
};

//Increase the current page number when user scrolled down to bottom

export const increasePage = () => dispatch => {
  dispatch({ type: GETPOSTS_ANOTHERPAGE });
};

//Clear all the post when user goes to another page or reload the component

export const clearPost = () => dispatch => {
  dispatch({ type: CLEARPOSTS_SUCCESS });
};
