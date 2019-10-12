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
  CLEARPOSTS_SUCCESS,
  EDITPOST_FAIL,
  EDITPOST_SUCCESS,
  CREATEPOST_SUCCESS
} from "./types";
import { postImage, editImage } from "./postImageAction";

export const createPost = file => async dispatch => {
  //Call utility function to post image to s3 . then create a post in the database with String Url
  postImage(file)(dispatch).then(async imageUrl => {
    const blogRes = await fetch(`${window.apiAddress}/post/upload`, {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });
    const createdpost = await blogRes.json();
    dispatch({ type: CREATEPOST_SUCCESS, payload: createdpost });
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
    }, 1000);
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL, payload: error.message });
    console.log(error);
  }
};
export const editPost = (file, post) => async dispatch => {
  try {
    editImage(post, file, "post")(dispatch).then(async imageUrl => {
      // edit imageUrl for the post model in database
      const blogRes = await fetch(`${window.apiAddress}/post/editPost`, {
        method: "POST",
        body: JSON.stringify({ post, imageUrl }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      });
      const createdpost = await blogRes.json();

      if (blogRes.status === 200) {
        dispatch({ type: EDITPOST_SUCCESS, payload: createdpost });
      } else {
        dispatch({ type: EDITPOST_FAIL });
      }
    });
  } catch (error) {
    dispatch({ type: EDITPOST_FAIL });
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
    if (res.status) dispatch({ type: DELETEPOST_SUCCESS, payload: post._id });
  } catch (error) {
    dispatch({ type: DELETEPOST_FAIL, payload: error.message });
  }
};

export const postEmoji = (emoji, post, userId, firstName) => async dispatch => {
  try {
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
      // console.log(emojiIndex);
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
  let copyPost = Object.assign({}, post);
  console.log(copyPost);
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
  console.log(emoji, copyPost, userId);
};

//Utility function

export const increasePage = () => dispatch => {
  dispatch({ type: GETPOSTS_ANOTHERPAGE });
};

export const clearPost = () => dispatch => {
  dispatch({ type: CLEARPOSTS_SUCCESS });
};
