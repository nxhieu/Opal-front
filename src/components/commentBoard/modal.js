import React, { Component } from "react";
import "../../dist/comment/modal.css";

const Modal = props => {
  return (
    <React.Fragment>
      <div className="background">
        <div className="modal">
          <span class="close" onClick={props.onClose}>
            &times;
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
