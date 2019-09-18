import React, { Fragment, Component } from "react";
//https://github.com/zackargyle/react-analog-clock

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "../layout/Navbar";
import Register from "../auth/Register";
import Login from "../auth/Login";
import UserSettingsPAge, { UserSettingsPage } from "./usersettingspage";
import { Provider } from "react-redux";
import store from "../../store";
import "../../dist/css/main.css";
import Card from "./card";

class Home extends Component {

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
            <div className="about-page-content">
              <h2>Welcome to Opal Forums!</h2>
              <br/>
              <p>This page was designed to post questions regarding opal card management as well as collecting user feedback about customer service.</p>
              <p>Log in to the forums to access our recent newsletter, user questionaries, FAQ and see the leaderboards. </p>
              <h3>Why OPAL forums?</h3>
              <br/>
              <p>This website is an experiment and we think it might be successful in finding an answer to user-related enquiries.</p>
              <p>Joining is for free! Feel free to add your contribution to this forum :)</p>
              <h3>Visit our official website</h3>
              <p>Opal NSW</p>
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
                    <UserSettingsPage />
                  ) : (
                    <Redirect to="/Card" component={Card}/>
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

export default Home;