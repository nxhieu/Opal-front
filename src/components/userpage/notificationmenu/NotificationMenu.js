import React, { Component } from "react";
import Downshift from "downshift";


const items = ["No Posts yet"];

export default class NotificationMenu extends Component {
    render(){
        return( 
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
           
           <button {...getToggleButtonProps()} className="notification-bell">

             </button>
            {isOpen ? (
              <ul className="notification-menu"{...getMenuProps()}>
                {items.map((item, index) => (
                  <li classname ="item"
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