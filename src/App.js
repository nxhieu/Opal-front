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
import Card from "./components/card/Card";
import PrivateRoute from "./route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";

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
                path="/Card"
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/login" />
                  ) : (
                    <Card />
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
