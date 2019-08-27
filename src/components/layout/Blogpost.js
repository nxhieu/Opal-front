//Rendering the blog post
//https://cmichel.io/how-to-create-a-more-popup-menu-in-react-native it's like a jQuery pop-up menu!
import React, { Component } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
//import BlogpostPopup from "./components/layout/BlogpostPopup";
import "../../dist/css/main.css";
import iconuser from "../../img/blogpost/testavatars/muser.png";
import editpost from "../../img/blogpost/feedback/editpost.png";


class Blogpost extends Component {
    render(){

       return(
       
       <div className="blogpost-container">
           <div className="blogpost-header">
               <ul>
                    <li>
                        <img className="blogpost-user-img" src={iconuser} width="60" alt="Avatar"/>
                    </li>
                    <li>
                        <div>
                        <p>Administrator</p> 
                        <p className="blogpost-date-posted">on 26th Aug</p>
                        </div>
                        <div className="blogpost-edit">
                            <img src={editpost} width="25" alt="btnPostEdit"/> 
                        </div>
                    </li>
                </ul>
           </div>
           <div className="blogpost-body">

           <p><b>This is a first test template for website posts! There are some design features:</b></p>
           <ul>
               <li>
                    Header featuring username and user image!
               </li>
               <li>
                    Content box!
               </li>
               <li>
                    Comment and like button!
               </li>
           </ul>

           <p><b>And thats all for now.</b></p>
        

           </div>
           <div className="blogpost-footer">
                <ul>
                    <li>
                        <button className="btn-like"/>
                    </li>
                    <li>
                        <p>+1000</p>
                    </li>
                    
                    <li>
                        <button className="btn-comment"/>
                    </li>
                    <li>
                        <p>300 Comments</p>
                    </li>
                </ul>
           </div>
           
       </div>
       
       ) 
    }
       
}
export default Blogpost;