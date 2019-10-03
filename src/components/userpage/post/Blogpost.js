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
import logo from "../../../img/UI/logo.png";
import Modal from "../../commentBoard/modal";
import { getComment, closeComment } from "../../../actions/commentAction";
import { connect } from "react-redux";

export class Blogpost extends Component {
  state = {
    openModal: false,
    post_id: this.props.post._id
  };

  createEventHandler = () => {
    this.setState({ openModal: true });
    this.props.getComment(this.state.post_id);
  };

  cancelEventHandler = () => {
    this.setState({ openModal: false });
    this.props.closeComment();
  };

  render() {
    const { email, imageUrl, _user, _id } = this.props.post;
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
              <button className="btn-like" />
            </li>
            <li>
              <p>+1000</p>
            </li>

            <li>
              {this.state.openModal && (
                <Modal
                  onClose={this.cancelEventHandler}
                  onClick={this.loadComment}
                  post_id={this.props.post._id}
                ></Modal>
              )}

              <div>
                <button
                  className="btn-comment"
                  onClick={this.createEventHandler}
                ></button>
              </div>
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
  commentState: state.comment
});

export default connect(
  mapStateToProps,
  { getComment, closeComment }
)(Blogpost);
