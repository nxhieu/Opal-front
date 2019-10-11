import {
  GETURI_FAIL,
  GETURI_SUCCESS,
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL,
  CREATEPOST_SUCCESS
} from "./types";

export const postImage = file => async dispatch => {
  try {
    //get request to the back end (backend then call s3 and send back the presigned URl from S3 bucket)
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
    //post image to our bucket using our presigned URL
    await fetch(awsUrl.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    });
    return awsUrl.key;
  } catch (error) {
    dispatch({ type: GETURI_FAIL });
  }
};

export const deleteImage = data => async dispatch => {
  try {
    //post to backend to delete the post
    const res = await fetch(`${window.apiAddress}/post/deletePost`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();

    dispatch({ type: DELETEPOST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETEPOST_FAIL, payload: error });
  }
};
