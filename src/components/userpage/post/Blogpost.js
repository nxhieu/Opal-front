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
import { getComment, postComment } from "../../../actions/commentAction";
import { connect } from "react-redux";

export class Blogpost extends Component {
  state = {
    create: false,
    post_id: this.props.postState._id
  };

  createEventHandler = () => {
    this.setState({ create: true });
  };

  cancelEventHandler = () => {
    this.setState({ create: false });
  };

  componentWillMount() {
    this.loadComment();
  }

  loadComment = () => {
    this.props.getComment(this.state.post_id);
    console.log(this.state.post_id);
  };

  render() {
    const { email, imageUrl, _user, _id } = this.props.post;
    return (
      <div className="blogpost-container">
        <div className="blogpost-header">
          {/* <div className> */}
          <p>{email}</p>
          <p id="date-post">26-Aug-2019</p>
          {/* </div> */}
          {/* <div className="blogpost-edit">
            <BlogpostEdit />
          </div> */}
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
              {this.state.create && (
                <Modal
                  onClose={this.cancelEventHandler}
                  onClick={this.loadComment}
                  post_id={this.props.post._id}
                ></Modal>
              )}

              <div className="first">
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
  commentState: state.comment,
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment }
)(Blogpost);
