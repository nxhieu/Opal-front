//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
//import BlogpostPopup from "./components/layout/BlogpostPopup";
import "../../../dist/css/post.css";
import HamburgerMenu from "react-hamburger-menu";
import iconuser from "../../../img/blogpost/testavatars/muser.png";
import editpost from "../../../img/blogpost/feedback/editpost.png";
import BlogpostEdit from "./BlogpostEdit";
import Modal from "../../commentBoard/modal";
import { getComment, postComment } from "../../../actions/commentAction";
import { connect } from "react-redux";

export class Blogpost extends Component {
  state = {
    create: false
  };

  createEventHandler = () => {
    this.setState({ create: true });
  };

  cancelEventHandler = () => {
    this.setState({ create: false });
  };

  // componentWillMount() {
  //   this.loadComment();
  // }

  loadComment = () => {
    this.props.getComment(this.props.post._id);
    console.log(this.props.post._id);
  };

  render() {
    const { email, imageUrl, _user, _id } = this.props.post;
    const { isAuthenticated } = this.props.authState;
    return (
      <div className="blogpost-container">
        <div className="blogpost-header">
          <div className="blogpost-header-content">
            <p>{email}</p>
            <p id="date-post">26-Aug-2019</p>
          </div>
          {isAuthenticated ? <BlogpostEdit /> : null}
        </div>
        <div className="blogpost-body">
          <img
            src={`https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/${imageUrl}`}
          />
        </div>
        <div className="blogpost-footer">
          <div className="emojis">
            <button className="btn-like" />
            <p>+1000</p>
          </div>

          <div className="comments">
            {this.state.create && (
              <Modal
                onClose={this.cancelEventHandler}
                onClick={this.loadComment}
                post_id={this.props.post._id}
              ></Modal>
            )}
            {/* <div className="first"> */}
            <button
              className="btn-comment"
              onClick={this.createEventHandler}
            ></button>
            {/* </div> */}
            <p>300 Comments</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentState: state.comment,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { getComment, postComment }
)(Blogpost);
