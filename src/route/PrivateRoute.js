import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//create private route component
//rest operator+  take in component set to "Component"
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = this.props.authState;
  return (
    //passed in
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => ({
  authState: state.auth
});
export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
