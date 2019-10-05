import {
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  DELETEPOST_FAIL,
  DELETEPOST_SUCCESS,
  GETPOSTS_REQUEST,
  GETPOSTS_ANOTHERPAGE,
  POSTEMOJI_SUCCESS,
  POSTEMOJI_FAIL,
  CLEARPOSTS_SUCCESS,
  EDITPOST_FAIL,
  EDITPOST_SUCCESS
} from "./types";

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
    dispatch({ type: GETPOSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETPOSTS_FAIL, payload: error.message });
    console.log(error);
  }
};
export const editPost = (file, post) => async dispatch => {
  try {
    // request to the back end to delete the current image and get new url (backend then call s3 and send back the presigned URl from S3 bucket)
    const res = await fetch(
      `${window.apiAddress}/post/editImage?type=${file.type}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json"
        }
      }
    );

    const awsUrl = await res.json();
    //post image to our bucket using our presigned URL
    await fetch(awsUrl.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    });
    // post imageUrl and post inf to backend and store in database
    const blogRes = await fetch(`${window.apiAddress}/post/editPost`, {
      method: "POST",
      body: JSON.stringify({ post, imageUrl: awsUrl.key }),
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
  } catch (error) {
    dispatch({ type: EDITPOST_FAIL });
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
    if (res.status) dispatch({ type: DELETEPOST_SUCCESS, payload: post._id });
  } catch (error) {
    dispatch({ type: DELETEPOST_FAIL, payload: error.message });
  }
};

export const postEmoji = (emoji, post, userId, firstName) => async dispatch => {
  try {
    if (post.emoji.length === 0) {
      post.emoji = [{ user: userId, firstName, emoji }];
    } else {
      console.log("here");
      let emojiIndex = post.emoji.findIndex(emoji => emoji.user === userId);
      post.emoji[emojiIndex].emoji = emoji;
    }
    const res = await fetch(`${window.apiAddress}/post/postEmoji`, {
      method: "POST",
      body: JSON.stringify({ emoji, postId: post._id, userId, firstName }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    });

    dispatch({ type: POSTEMOJI_SUCCESS, payload: post });
  } catch (error) {
    dispatch({ type: POSTEMOJI_FAIL, payload: error.message });
  }
};

export const increasePage = () => dispatch => {
  dispatch({ type: GETPOSTS_ANOTHERPAGE });
};

export const clearPost = () => dispatch => {
  dispatch({ type: CLEARPOSTS_SUCCESS });
};
