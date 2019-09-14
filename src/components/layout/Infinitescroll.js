import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";
import { BlogpostEdit } from "./BlogpostEdit";
import Blogpost from "./Blogpost";
import loading from "../../img/UI/loading.gif";
import "../../dist/css/main.css";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      posts: [],
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadPosts,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadPosts();
      }
    }, 4);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadPosts();
  }

  loadPosts = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get('https://randomuser.me/api/?results=3')
        .then((results) => {
          // Creates a massaged array of user data
          const nextPosts = results.body.results.map(post => ({
            
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.posts.length < 4),
            isLoading: false,
            posts: [
              ...this.state.posts,
              ...nextPosts,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      posts,
      isLoading,
    } = this.state;

    return (
      <div>
        {posts.map(post => (
          <Fragment key={post.username}>
           
            <div style={{ display: 'flex' }}>
          
              <div>
                <Blogpost/>
              </div>
             
            </div>
          </Fragment>
          
        ))}
      
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div className="loading">
            <h4>Loading More Posts...</h4>
            <img src={loading} width="80" />
           </div>
        }
        {!hasMore &&
          <div>No more posts.</div>
        }
      </div>
    );
  }
}
