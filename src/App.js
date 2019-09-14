import React, { Fragment, Component } from "react";
import Calendar from 'react-calendar';
import AnalogClock, { Themes } from 'react-analog-clock'; //https://github.com/zackargyle/react-analog-clock
//https://www.npmjs.com/package/react-hamburger-menu
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import About from "./components/navigation/about";
import UserSettingsPage from "./components/navigation/usersettingspage";
import Userpage from "./components/navigation/userpage";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import "./dist/css/main.css";
import Card from "./components/navigation/card";
//https://www.telerik.com/kendo-react-ui/components/dropdowns/dropdownlist/

class App extends Component {

  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })

  handleClick() {
    this.setState({
        open: !this.state.open
    });
}

  render() {
    return (
      <Provider store={store}>
        {console.log(store.getState().auth.isAuthenticated)}
        <Router basename={'/'} >
          <Fragment>
          <Redirect to="/about" component={About}/>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/userpage"  component={Userpage}
                  
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/login" />
                  ) : (
                    <About/>
                  )
                }
              />

            <Route
                exact
                path="/about" component={About}
                  
                render={() =>
                  !store.getState().auth.isAuthenticated ? (
                    <Redirect to="/about" />
                  ) : (
                    <About />
                  )
                }
              />

              <Route exact path="/Card" component={Card} /> 

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
        <Footer/>
      </Provider>
    );
  }
}

export default App;
