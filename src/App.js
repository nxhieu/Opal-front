import React, { Fragment, Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";
import Comment from "./components/comment/creatComment";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {console.log(store.getState().auth.isAuthenticated)}
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/Comment"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/login" />
                  ) : (
                    <Comment />
                  )
                }
              />
              {/* <Route exact path="/Card" component={Card} /> */}

              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
