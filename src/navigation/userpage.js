import React, { Fragment, Component } from "react";
import Calendar from 'react-calendar';
import AnalogClock, { Themes } from 'react-analog-clock'; //https://github.com/zackargyle/react-analog-clock

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Posts from "./components/post/posts";
import Blogpost from "./components/layout/Blogpost";
import Leaderboard from "./components/layout/Leaderboard";
import PrivateRoute from "./route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";

class App extends Component {

  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })

  render() {
    return (
      <Provider store={store}>
        {console.log(store.getState().auth.isAuthenticated)}
        <Router basename={'/navigation/'}>
          <Fragment>
            <Navbar />  
            <div className = "blogpost-column">
              <Blogpost />
              <Blogpost />
              <Blogpost />
              
              </div>
            <div className ="leaderboard-column">
              <Leaderboard />
              <div className="analog-clock"><AnalogClock theme={Themes.navy}  /> </div>
              <div className="calendar"><Calendar /></div>
              </div>
            <Switch>
              <Route
                exact
                path="/post"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/login" />
                  ) : (
                    <Posts />
                  )
                }
              />
              {/* <Route exact path="/Card" component={Card} /> */}

              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/login"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/Card" />
                  )
                }
              />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
