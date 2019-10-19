/*
    Blogpostdropdownlist component displays a drop down button at blogpost component allow authorised user to edit or delete their post.
    url: /
    Reference: https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import Downshift from "downshift";
import EditModal from "./editpost/editmodal";
import Blogpostdropdown from "./Blogpostdropdown";
import { deletePost } from "../../../actions/postAction";
import PropTypes from "prop-types";

class Blogpostdropdownlist extends Component {
  state = {
    create: false
  };
  //open edit modal
  createEventHandler = () => {
    this.setState({ create: !this.state.create });
  };

  deletePost = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post);
  };

  render() {
    return (
      <Downshift>
        {({ getMenuProps, getToggleButtonProps, isOpen }) => (
          <div className="blogpost-edit">
            <button
              {...getToggleButtonProps()}
              className="blogpost-edit-button"
            >
              <Blogpostdropdown />
            </button>
            {this.state.create && (
              <EditModal
                key={this.props.post}
                onClose={this.createEventHandler}
                post={this.props.post}
              ></EditModal>
            )}
            {isOpen && this.props.authState.userId === this.props.post._user ? (
              <ul className="edit-button-menu" {...getMenuProps()}>
                <li onClick={this.createEventHandler}>Edit</li>

                <li onClick={this.deletePost}>Delete</li>
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

Blogpostdropdownlist.propTypes = {
  post: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(Blogpostdropdownlist);
