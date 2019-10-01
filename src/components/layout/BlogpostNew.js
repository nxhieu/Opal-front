import React, { Component } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
//import BlogpostPopup from "./components/layout/BlogpostPopup";
import "../../dist/css/main.css";
import HamburgerMenu from 'react-hamburger-menu';
import iconuser from "../../img/blogpost/testavatars/muser.png";
import editpost from "../../img/blogpost/feedback/editpost.png";
import BlogpostEdit  from "./BlogpostEdit";
import FieldLabel from "./FieldLabel";
import UserSettingsPage from "../navigation/usersettingspage";


class BlogpostNew extends Component {


    constructor(props) {
        super(props);
    
        this.state = { userInput: '', output: '', showImage:false, showStatus:false,};
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitBlogpost = this.submitBlogpost.bind(this);
        this.addImage = this.addImage.bind(this);

          
  delPost = () => {
    this.setState({showBlogpost:false});
    alert("Blogpost deleted!");
  }

  editPost =() =>{
    this.setState({editClicked:true});
    alert("Blogpost edit enabled!");
  }
        
      }

      handleUserInput(e) {
        if (e.key === 'Enter') {
            this.setState({output: e.target.value});
        }
        
      }

      handleChange(e) {
        this.setState({userInput: e.target.value});
      }


  submitBlogpost = (e) => {
    alert('Blogpost submitted!');
    this.setState({userInput: e.target.value});
    this.setState({showStatus:true});
        
  }

  addImage = (e) => { 
    alert('Choose the image!');
    this.setState({showImage:true});
   
  }


   
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
                        </div>
                        <div className="blogpost-edit">
                            <BlogpostEdit/>
                        </div>
                    </li>
                </ul>
           </div>
           <div className="blogpost-body">
               
           {/*<FieldLabel
                id={1}
                predicted=""
                locked={false}
                active={false}
            >
                <div>
                    Type some text.
                </div>
           </FieldLabel>*/}

            <input 
            className="field"
            type="i" 
            value={this.state.userInput}
            onKeyPress={this.handleUserInput} // Only for "Enter" purpose
            onChange={this.handleChange}
           />
          <h3>Preview: {this.state.output}</h3>
          { this.state.showImage ?  <UserSettingsPage/> : null }
          <h2 className="status">{ this.state.showStatus ?  "Post submitted successfully!" : null }</h2>
         
           </div>
           <div className="blogpost-footer">

                <ul>
                    <li>
                        <button className="btn-image" onClick={this.addImage}/>
                        
                    </li>
                    <li>
                        <button className="btn-submit"  onClick={this.submitBlogpost}>Submit</button>
                    </li>
                    
                </ul>
                      

           </div>
                
       </div>
       
       ) 
    }
       
}
export default BlogpostNew;
