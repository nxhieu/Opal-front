import React, { Component } from "react";

export class post extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <h2>{post.email}</h2>
        <img
          src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${post.imageUrl}`}
        />
        <h2>{post.createdAt}</h2>
      </div>
    );
  }
}

export default post;