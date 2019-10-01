import React, { Component} from "react";

import { Link } from "react-router-dom";
import Downshift from "downshift";
import HamburgerButton from "./HamburgerButton";
import Blogpost from "./Blogpost";
import BlogpostDelete from "./BlogpostDelete";


//https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36

export default class BlogpostEdit extends Component {

  
  render () 
  {
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
                    <button type="edit" className="btn-item" onClick={this.props.handleClick} edit={this.props.isEdit}>Edit</button>
                  </li>

                  <li classname ="item">
                   <button type="delete" className="btn-item" onClick={this.props.handleClick} delete={this.props.isDelete}>Delete</button>
                   { this.state.isDel ? <p>THIS IS EXTRA PART THAT NEEDS TO BE DELETED</p> : null }
                </li>
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
  
  );

  }
}

