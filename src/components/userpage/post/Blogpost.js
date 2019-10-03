//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
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

  onShowEmoji = () => {
    this.setState({ isShowEmoji: !this.state.isShowEmoji });
  };

  render() {
    const { email, imageUrl, _user } = this.props.post;
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
            <li>
              <div className="blogpost-edit">
                <BlogpostEdit />
              </div>
            </li>
          </ul>
        </div>
        <div className="blogpost-body">
          <img
            src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
          />
        </div>
        <div className="blogpost-footer">
          <ul>
            <li>
              <button className="btn-like" onClick={this.onShowEmoji} />
            </li>
            <li>{isShowEmoji ? <Emojis /> : null}</li>
            <li>
              <p>+1000</p>
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
export default Blogpost;
