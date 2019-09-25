import React, { Component } from "react";
import "../../dist/comment/comment.css";

const Comment = props => {
  return (
    <div>
      <table>
        <td>
          <tr>
            <td>Comment as {props.userName}</td>
          </tr>
          <tr>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={props.onUpload}
            />
          </tr>
          <tr>
            <div>
              <img src={props.image} height="100" />
            </div>
          </tr>
          <tr>
            <td>
              <button>comment</button>
            </td>
          </tr>
        </td>
      </table>
    </div>
  );
};

export default Comment;
