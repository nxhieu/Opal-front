//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
//import BlogpostPopup from "./components/layout/BlogpostPopup";
import "../../../dist/css/main.css";
import HamburgerMenu from "react-hamburger-menu";
import iconuser from "../../../img/blogpost/testavatars/muser.png";
import editpost from "../../../img/blogpost/feedback/editpost.png";
import BlogpostEdit from "./BlogpostEdit";
import Emojis from "../emoji/Emojis";

class Blogpost extends Component {
  state = {
    isShowEmoji: false
  };

  // componentWillMount() {
  // const post = this.props.post;
  // console.log(post.emoji.map( (user) => user.includes(this.props.authState._id));
  // }

  onShowEmoji = () => {
    this.setState({ isShowEmoji: !this.state.isShowEmoji });
  };

  onDeleteEmoji = () => {};

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
          {isShowEmoji ? (
            <Emojis onShowEmoji={this.onShowEmoji} post={this.props.post} />
          ) : null}
        </div>

        <div className="blogpost-footer">
          <ul>
            <li>
              <button className="btn-like" onClick={this.onShowEmoji}>
                <img src={require("../../../img/emoji/Cry.png")} />
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
  authState: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Blogpost);
