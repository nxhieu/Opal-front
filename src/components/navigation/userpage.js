import React, { Fragment, Component } from "react";
import Calendar from 'react-calendar';
import AnalogClock, { Themes } from 'react-analog-clock'; //https://github.com/zackargyle/react-analog-clock
import FlipClock from '../layout/Flipclock';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "../layout/Navbar";
import Register from "../auth/Register";
import Login from "../auth/Login";
import UserSettingsPage  from "./usersettingspage";
import Blogpost from "../layout/Blogpost";
import Newpost from "../layout/Newpost";
import Leaderboard from "../layout/Leaderboard";
import PrivateRoute from "../../route/PrivateRoute";
import { Provider } from "react-redux";
import store from "../../store";
import InfiniteScroll from "../layout/Infinitescroll";
import "../../dist/css/main.css";
import Welcome from "../layout/Welcome";
class Userpage extends Component {

  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
  

  

  render() {
    return (
      <Provider store={store}>
        {console.log(store.getState().auth.isAuthenticated)}
        <Router basename={'/'}>
          <Fragment>
            <Navbar />  
            <div className = "blogpost-column">
              <Newpost />
              <InfiniteScroll/>
              
              
              </div>
            <div className ="leaderboard-column">
              <div className="welcome"><Welcome/></div>
              <Leaderboard/>
              <FlipClock/>
              <div className="calendar"><Calendar /></div>
              </div>
            <Switch>
              <Route
                exact
                path="/usersettings"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/login" />
                  ) : (
                    <UserSettingsPage />
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

export default Userpage;
