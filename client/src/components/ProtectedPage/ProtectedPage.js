import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedPage = ({ isLoggedIn, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(ProtectedPage);