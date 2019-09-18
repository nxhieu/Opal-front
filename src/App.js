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
import PostImage from "./components/postImage/postImage";
import Posts from "./components/posts/posts";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/post"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <div>
                      <Posts/>
                    </div>
                  ) : (
                    <div>
                      <PostImage />
                      <Posts />
                    </div>
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
