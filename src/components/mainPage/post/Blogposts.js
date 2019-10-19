/*
    Blogposts component displays a list of posts
    This component implement infinitescroll with debounce function. That deplays the loading to one second (avoid exhausting database)
    Each time user scrolls to the bottom, they will get 10 posts. 
    url: /
*/

import React, { Component } from "react";
import debounce from "lodash.debounce";
import { connect } from "react-redux";
import { getPosts, increasePage, clearPost } from "../../../actions/postAction";
import Blogpost from "./Blogpost";
import PropTypes from "prop-types";
import loading from "../../../img/UI/loading.gif";
import "../../../css/post.css";

class Blogposts extends Component {
  componentWillMount() {
    this.props.clearPost();
  }

  componentDidMount() {
    this.onScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    // Loads first 10 users on initial load
    this.loadPosts(1);
  }

  //remove event listener when component get unmounted
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.clearPost();
  }
  // only load posts each 1 second
  handleScroll = debounce(e => {
    const { error, isLoading, hasMore } = this.props.postState;
    if (error || isLoading || !hasMore) return;
    //loadpost when user scroll to bottoms
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 2
    ) {
      this.props.increasePage();
      this.loadPosts(this.props.postState.currentPage);
    }
  }, 1000);

  loadPosts = currentPage => {
    this.props.getPosts(currentPage);
  };

  render() {
    const { error, posts } = this.props.postState;

    return (
      <div className="blogposts">
        {posts.map(post => (
          <Blogpost key={post._id} post={post} userId={this.props.userId} />
        ))}

        {error && <div style={{ color: "#900" }}>{error}</div>}
        {this.props.postState.isLoading && (
          <div className="loading-post">
            <h4>Loading More Posts...</h4>
            <img alt="loading" src={loading} className="loading-post" />
          </div>
        )}
        {!this.props.postState.hasMore && <div>No more posts.</div>}
      </div>
    );
  }
}

Blogposts.propTypes = {
  userId: PropTypes.string,
  authState: PropTypes.object.isRequired,
  postState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, increasePage, clearPost }
)(Blogposts);
