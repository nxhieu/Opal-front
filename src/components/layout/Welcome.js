import React, { Component } from "react";
import "../../dist/css/main.css";

//WELCOME BOARD TUTORIALS TAKEN FROM
//https://www.youtube.com/watch?v=ZKwrOXl5TDI
//https://stackoverflow.com/questions/52933997/adding-a-greeting-to-a-react-app-based-on-the-time-of-day



    const date = new Date();
    const hours = date.getHours()
    let timeOfDay;

    if (hours < 12) {
      timeOfDay = "morning"
     }
    
     else if (hours >= 12 && hours < 17) {
      timeOfDay = "afternoon"
    }
    else {
      timeOfDay = "night"
    }



 class Welcome extends Component {

  constructor(props) { //saves the state, so data doesn't dissapear.
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
    }
  }

  componentDidMount() { //runs off the render menthod
    fetch("https://swapi.co/api/people/1")
      .then(res => res.json()) //turns into javascript object.
      .then(data => {
          this.setState({
            isLoaded: true,
            users: data,

          })
      });
  }

  


    render() {

      var {isLoaded, users} = this.state;
      

      if (isLoaded, users) {
        return <h3>Good {timeOfDay}, {this.state.users.name}</h3>;//when dada hasn't been loaded.
      }

      else {
         //displays when data is loaded.
         return <h3>Loading...</h3> 
      }
    
    }
  }

  export default Welcome;