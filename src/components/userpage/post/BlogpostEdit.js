import React, { Component } from "react";
import Downshift from "downshift";
import { connect } from "react-redux";
import HamburgerButton from "./HamburgerButton";
import { deletePost } from "../../../actions/postAction";

//https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36

export class BlogpostEdit extends Component {
  state = {
    file: null,
  };


  
  /*editPost = e => {
    e.preventDefault();
    const file = this.state.file;
    this.props.editPost(file);
  };*/

  delPost = e => {
    e.preventDefault();
    const file = this.state.file;
    this.props.deletePost(file);
  };


  render() {
    return (
      <Downshift>
        {({  
          getToggleButtonProps,
          isOpen,
          
        }) => (
          <div>
           
           <button {...getToggleButtonProps()} className="button-edit">
             <HamburgerButton/>
             </button>
            {isOpen ? (
              <ul className="menu">

                  <li classname ="item">
                    {/*<button type="edit" className="btn-item"  onClick={this.editPost} >Edit</button>*/}
                  </li>

                  <li classname ="item">
                   <button type="delete" className="btn-item" onClick={this.delPost} >Delete</button>
                </li>
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

const mapStateToProps = state => ({
  imageState: state.post,
  authState: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(BlogpostEdit);
