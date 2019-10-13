import { GETURI_FAIL } from "./types";

/*
  This file content all utility action functions used to interact with AWS s3 bucket. These actions
  include POST, EDIT, DELETE  image in s3 bucket. 
  */

export const postImage = file => async dispatch => {
  try {
    //get request to the back end (backend then call s3 and send back the presigned URl from S3 bucket)
    const res = await fetch(
      `${window.apiAddress}/image/getUri?type=${file.type}`,
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

export const editImage = (model, file, modelType) => async dispatch => {
  try {
    // request to the back end to delete the current image and get a new url (backend then call s3 and send back the presigned URl from S3 buckets)
    const res = await fetch(
      `${window.apiAddress}/image/editUri?type=${file.type}&model=${modelType}`,
      {
        method: "POST",
        body: JSON.stringify(model),
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
    return awsUrl.key;
  } catch (error) {
    dispatch({ type: GETURI_FAIL });
  }
};
