import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";
import { connect } from "react-redux";
import { BlogpostEdit } from "./BlogpostEdit";
import { getPosts, increasePage } from "../../../actions/postAction";
import Blogpost from "./Blogpost";
import loading from "../../../img/UI/loading.gif";
import "../../../dist/css/main.css";

export class Blogposts extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    // this.state = {
    //   error: false,
    //   hasMore: true,
    //   isLoading: false,
    //   posts: []
    // };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const { error, isLoading, hasMore } = this.props.postState;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2
      ) {
        this.props.increasePage();
        this.loadPosts();
      }
    }, 1000);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadPosts();
  }

  loadPosts = () => {
    // this.setState({ isLoading: true }, () => {
    //   request
    //     .get("https://randomuser.me/api/?results=3")
    //     .then(results => {
    //       // Creates a messaged array of user data
    //       const nextPosts = results.body.results.map(post => ({}));

    //       // Merges the next users into our existing users
    //       this.setState({
    //         // Note: Depending on the API you're using, this value may
    //         // be returned as part of the payload to indicate that there
    //         // is no additional data to be loaded
    //         hasMore: this.state.posts.length < 4,
    //         isLoading: false,
    //         posts: [...this.state.posts, ...nextPosts]
    //       });
    //     })
    //     .catch(err => {
    //       this.setState({
    //         error: err.message,
    //         isLoading: false
    //       });
    //     });
    // });
    const { currentPage } = this.props.postState;
    this.props.getPosts(currentPage);
  };

  render() {
    const { error, hasMore, posts, isLoading } = this.props.postState;

    return (
      <div class="blogposts">
        {posts.map(post => (
          <Fragment>
            <Blogpost key={post._id} post={post} />
          </Fragment>
        ))}

        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && (
          <div className="loading">
            <h4>Loading More Posts...</h4>
            <img src={loading} width="80" />
          </div>
        )}
        {!hasMore && <div>No more posts.</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, increasePage }
)(Blogposts);
