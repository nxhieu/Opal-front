import React, { Component } from "react";
import Downshift from "downshift";
import HamburgerButton from "./HamburgerButton";

const items = ["Edit", "Delete"];

//https://medium.com/@AmyScript/downshift-the-answer-to-building-accessible-and-visually-flexible-custom-react-input-components-aed1553e1e36

export default class BlogpostEdit extends Component {
  render() {
    return (
      <Downshift>
        {({
          getItemProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <button {...getToggleButtonProps()} className="button-edit">
              <HamburgerButton />
            </button>
            {isOpen ? (
              <ul className="menu" {...getMenuProps()}>
                {items.map((item, index) => (
                  <li
                    className="item"
                    highlighted={highlightedIndex === index}
                    selected={selectedItem === item}
                    {...getItemProps({
                      key: item,
                      index,
                      item
                    })}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}
