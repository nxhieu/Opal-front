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
import Mainpage from "./components/mainPage/mainpage";
import { Provider } from "react-redux";
import store from "./store";
import "./css/main.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Mainpage} />
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
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
