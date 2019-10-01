import React, { Component } from "react";
import Post from "./post";
import { getPosts } from "./../../actions/postAction";
import { connect } from "react-redux";

export class posts extends Component {

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.postState;
    
    return (
      <div>
        {posts.length !== 0
          ? posts.map(post => {
              return <Post key={post.id} post={post} />;
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(posts);
