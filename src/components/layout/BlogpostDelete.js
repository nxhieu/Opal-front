
import React, { Component} from "react";
import Blogpost from "./Blogpost";

/* const errors = require("./errors");
const tracker = require("./tracker");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost: 27017/ubc", {useNewUrlParser: true, useCreateIndex: true});

const Blogpost = mongoose.model ("Blogpost", {
    /* name:
    group: */
//});

//const express = require("express");
//const app = express();

//import Blogpost from "../Blogpost"

//app.post('/delete', async (req, res) => {
    //try {
        //let fromBlogpost = await Blogpost.findOne({name: {$eq: req.body.from}});
        //Abort if we can't find source of the blogpost.
        //if (!fromBlogpost)
        //return res.json({success: false, error: errors.BLOGPOST_NOT_FOUND});
        //await toBlogpost.save();
    //}
    
    //return res.json ({success: true, balance: fromBlogpost.delete});
//}

//catch {
   // return res.json ({success: false, error: errors.UNEXPECTED_ERROR});
//} 



export default class BlogpostDelete extends Component {

    getInitialState() {
        return { showResults: false };
    }
    
    onClick() {
        this.setState({ showResults: true });
    }

    render () {
 
      return (
    
            <div>
            <input type="submit" value="Search" onClick={this.onClick} />
            { this.state.showResults ? <Blogpost /> : null }
                    </div>
                
        
        );
  
    }
  }
  