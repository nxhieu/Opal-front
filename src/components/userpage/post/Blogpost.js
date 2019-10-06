//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { deleteEmoji } from "../../../actions/postAction";
//import BlogpostPopup from "./components/layout/BlogpostPopup";
import "../../../dist/css/main.css";
import "../../../dist/css/emoji.css";
import HamburgerMenu from "react-hamburger-menu";
import iconuser from "../../../img/blogpost/testavatars/muser.png";
import editpost from "../../../img/blogpost/feedback/editpost.png";
import BlogpostEdit from "./BlogpostEdit";
import Emojis from "../emoji/Emojis";

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
    // ["Cry", "EyeRoll", "HeartEyes", "Smile", "Thinking", "VeryAngry"]
    // if ((emoji !== this.state.initialEmoji) & (emoji === ""))
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
    this.setState(
      () => ({ emoji: emoji, isReact: true }),
      () => {
        //check if the emoji clicked on was the one has been chosen before
        // if (this.state.isReact && this.state.emoji !== "Thumb") {
        //   this.props.deleteEmoji(
        //     this.state.emoji,
        //     this.props.post,
        //     this.props.authState.userId
        //   );
        // }
      }
    );
  };

  render() {
    const { email, imageUrl, _user, _id } = this.props.post;
    const { isShowEmoji } = this.state;
    return (
      <div className="blogpost-container">
        <div className="blogpost-header">
          <ul>
            <li>
              <img
                className="blogpost-user-img"
                src={iconuser}
                width="50"
                alt="Avatar"
              />
            </li>
            <li>
              <div>
                <p>{email}</p>
                <p className="blogpost-date-posted">on 26th Aug</p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="blogpost-edit">
                <BlogpostEdit key={this.props.post} post={this.props.post} />
              </div>
            </li>
          </ul>
        </div>
        <div className="blogpost-body">
          <img
            className="blogpost-image"
            src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
          />
        </div>

        <div className="blogpost-footer">
          <ul>
            <li>
              <button className="btn-like">
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
            </li>
            <li></li>
            <li>
              <p>{this.props.post.emoji.length}</p>
            </li>

            <li>
              <button className="btn-comment" />
            </li>
            <li>
              <p>300 Comments</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth,
  postState: state.post
});

export default connect(
  mapStateToProps,
  { deleteEmoji }
)(Blogpost);
