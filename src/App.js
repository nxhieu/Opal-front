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
import Userpage from "./components/userpage/userpage";
import About from "./components/about/about";
import { Provider } from "react-redux";
import { loaduser } from "./actions/authAction";
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
              <Route exact path="/" component={Userpage} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/login"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
