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
import Blogposts from "./components/userpage/post/Blogposts";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";
import BlogpostEdit from "./components/userpage/post/BlogpostEdit";

class App extends Component {
  constructor () {
    super();
    this.state = {
      date: new Date(),
      isEdit: false, //initial edit state
      isDelete: false, //initial delete state
  };
  this.handleClick = this.handleClick.bind(this);
}

  handleClick() {
    this.setState({
      open: !this.state.open,
      isEdit: !this.state.isEdit, //makes it global for replacing components OnClick()
      isDelete: !this.state.isDelete
    });
  }


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
