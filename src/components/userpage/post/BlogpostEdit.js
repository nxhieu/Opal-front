//Blogpostedit is the versing of a regular Blogpost interface in the edit mode.
// I used downshift feature which can be found here: //https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36
// donwshift allows the dropdown menu upon clicking on the button
// in my case it's the hamburger button which is mentioned as a separate component inside downshift. 

import React, { Component } from "react";
import Downshift from "downshift";
import EditModal from "./editpost/editmodal";
import { connect } from "react-redux";
import HamburgerButton from "./HamburgerButton";
import { deletePost } from "../../../actions/postAction";



export class BlogpostEdit extends Component {
  state = {
    create: false
  };
  createEventHandler = () => {
    this.setState({ create: !this.state.create });
  };

  //delete button method
  delPost = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post);
  };

  render() {
    return (
      <Downshift>
        {({ getToggleButtonProps, isOpen }) => (
          <div className="blogpost-edit">
            <button
              {...getToggleButtonProps()}
              className="blogpost-edit-button"
            >
              <HamburgerButton />
            </button>
            {this.state.create && (
              <EditModal
                key={this.props.post}
                onClose={this.createEventHandler}
                post={this.props.post}
              />
            )}
            {isOpen && this.props.authState.userId === this.props.post._user ? (
              <ul className="edit-button-menu" >
                <li onClick={this.createEventHandler}>Edit</li>

                <li onClick={this.delPost}>Delete</li>
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

//mapping the function from action/postAction.js
const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});


export default connect(
  mapStateToProps,
  { deletePost }
)(BlogpostEdit);
