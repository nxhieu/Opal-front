// UI for blogpost, also formerly known as Infinite Scroll featur during the development. 
// Initially UI and Infinite scroll was separated, but we merged it together because it's a better programming practice, because it's better when component has UI and as well as some fuctionality.
// And not just UI, it looses scalability and performance this way.
// Tutorial taken from: https://alligator.io/react/react-infinite-scroll/


import React, { Component, Fragment } from "react";
import debounce from "lodash.debounce";
import { connect } from "react-redux";
import { getPosts, increasePage, clearPost } from "../../../actions/postAction";
import Blogpost from "./Blogpost";
import loading from "../../../img/UI/loading.gif";
import "../../../dist/css/post.css";

export class Blogposts extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.clearPost();
  }

  componentDidMount() {
    this.onScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);

    // Loads some initial posts
    this.loadPosts(1);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.clearPost();
  }

  //debounce is used  here to improve performance, it limits the rate of when this function decides to fire.
  //documentation and explanation how this works can be found here: https://www.geeksforgeeks.org/debouncing-in-javascript/
  handleScroll = debounce(e => {
    const { error, isLoading, hasMore } = this.props.postState;
    if (error || isLoading || !hasMore) return;
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
    const { error, hasMore, posts, isLoading } = this.props.postState;

    return (
      <div className="blogposts">
        {posts.map(post => (
          <Blogpost key={post._id} post={post} userId={this.props.userId} />
        ))}

        {error && <div style={{ color: "#900" }}>{error}</div>}
        {this.props.postState.isLoading && (
          <div className="loading-post">
            <h4>Loading More Posts...</h4>
            <img src={loading} className="loading-post" />
          </div>
        )}
        {!this.props.postState.hasMore && <div>No more posts.</div>}
      </div>
    );
  }
}

//mapping the fuctions responsible getting the posts, post clearing and gives the corresponding resolution depending on your computer screen.
const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, increasePage, clearPost }
)(Blogposts);
