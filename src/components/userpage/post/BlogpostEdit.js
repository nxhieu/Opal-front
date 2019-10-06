import React, { Component } from "react";
import Downshift from "downshift";
import EditModal from "./editpost/editmodal";
import { connect } from "react-redux";
import HamburgerButton from "./HamburgerButton";
import { deletePost } from "../../../actions/postAction";

//https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36

export class BlogpostEdit extends Component {
  state = {
    create: false
  };
  createEventHandler = () => {
    this.setState({ create: !this.state.create });
  };

  delPost = e => {
    e.preventDefault();
    this.props.deletePost(this.props.post);
  };

  render() {
    return (
      <Downshift>
        {({ getToggleButtonProps, isOpen }) => (
          <div>
            <button {...getToggleButtonProps()} className="button-edit">
              <HamburgerButton />
            </button>
            {isOpen && this.props.authState.userId === this.props.post._user ? (
              <ul className="menu">
                <div>
                  <li classname="item">
                    {this.state.create && (
                      <EditModal
                        key={this.props.post}
                        onClose={this.createEventHandler}
                        post={this.props.post}
                      ></EditModal>
                    )}
                    <button
                      type="edit"
                      className="btn-item"
                      onClick={this.createEventHandler}
                    >
                      Edit
                    </button>
                  </li>

                  <li classname="item">
                    <button
                      type="delete"
                      className="btn-item"
                      onClick={this.delPost}
                    >
                      Delete
                    </button>
                  </li>
                </div>
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(BlogpostEdit);
