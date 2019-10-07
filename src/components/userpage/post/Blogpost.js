//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { deleteEmoji } from "../../../actions/postAction";
import { getComment, closeComment } from "../../../actions/commentAction";
//import BlogpostPopup from "./components/layout/BlogpostPopup";

import "../../../dist/css/emoji.css";
import "../../../dist/css/post.css";
import HamburgerMenu from "react-hamburger-menu";
import iconuser from "../../../img/blogpost/testavatars/muser.png";
import editpost from "../../../img/blogpost/feedback/editpost.png";

import BlogpostEdit from "./BlogpostEdit";
import Emojis from "../emoji/Emojis";
import Modal from "../../commentBoard/modal";

class Blogpost extends Component {
  state = {
    isShowEmoji: false,
    emoji: "Thumb",
    isReact: false,
    initialEmoji: null
  };

  componentDidMount() {
    //check whether has reacted to a post
    const post = this.props.post;
    const userId = this.props.userId;
    const emoji = post.emoji.find(emoji => emoji.user === userId);
    if (emoji) {
      this.setState({
        emoji: emoji.emoji,
        isReact: true,
        initialEmoji: emoji.emoji
      });
    }
  }

  onCloseEmoji = () => {
    this.setState({ isShowEmoji: false });
  };

  onShowEmoji = emoji => {
    //use call back to prevent asynchrounous error
    this.setState(
      () => ({ isShowEmoji: !this.state.isShowEmoji }),
      () => {
        if (
          this.state.isReact &&
          this.state.emoji !== "Thumb" &&
          this.state.isShowEmoji === false
        ) {
          this.props.deleteEmoji(
            this.state.emoji,
            this.props.post,
            this.props.authState.userId
          );
          this.setState({ emoji: "Thumb" });
        }
      }
    );
  };

  onChangeEmoji = emoji => {
    this.setState(() => ({ emoji: emoji, isReact: true }));
  };

  createEventHandler = () => {
    this.setState({ create: true });
  };
  cancelEventHandler = () => {
    this.setState({ create: false });
  };
  loadComment = () => {
    this.props.getComment(this.props.post._id);
    console.log(this.props.post._id);
  };

  render() {
    const { email, imageUrl, createdAt, user, _id } = this.props.post;
    const { isAuthenticated } = this.props.authState;
    const { isShowEmoji } = this.state;
    return (
      <div className="blogpost-container">
        <div className="blogpost-header">
          <div className="blogpost-header-content">
            <p>{email}</p>
            <p id="date-post">on {createdAt.substring(0, 10)}</p>
          </div>
          {isAuthenticated ? (
            <BlogpostEdit key={this.props.post} post={this.props.post} />
          ) : null}
        </div>
        <div className="blogpost-body">
          <img
            src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
          />
        </div>
        <div className="blogpost-footer">
          <div className="emojis">
            <button className="btn-like" onClick={this.onShowEmoji}>
              <img
                src={require(`../../../img/emoji/${this.state.emoji}.png`)}
                onClick={this.onShowEmoji}
              />

              <div className="emoji-cont">
                {isShowEmoji ? (
                  <Emojis
                    onChangeEmoji={this.onChangeEmoji}
                    onCloseEmoji={this.onCloseEmoji}
                    onShowEmoji={this.onShowEmoji}
                    post={this.props.post}
                  />
                ) : null}
              </div>
            </button>
            <p>{this.props.post.emoji.length}</p>
          </div>
          <div className="comments">
            {this.state.openModal && (
              <Modal
                onClose={this.cancelEventHandler}
                onClick={this.loadComment}
                post_id={this.props.post._id}
              ></Modal>
            )}

            <button
              className="btn-comment"
              onClick={this.createEventHandler}
            ></button>
            <p>{this.props.post.emoji.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentState: state.comment,
  authState: state.auth,
  postState: state.post
});

export default connect(
  mapStateToProps,
  { getComment, closeComment, deleteEmoji }
)(Blogpost);

{
  /* <button className="btn-like">
<img
  src={require(`../../../img/emoji/${this.state.emoji}.png`)}
  onClick={this.onShowEmoji}
/>

<div className="emoji-cont">
  {isShowEmoji ? (
    <Emojis
      onChangeEmoji={this.onChangeEmoji}
      onCloseEmoji={this.onCloseEmoji}
      onShowEmoji={this.onShowEmoji}
      post={this.props.post}
    />
  ) : null}
</div>
</button> */
}
