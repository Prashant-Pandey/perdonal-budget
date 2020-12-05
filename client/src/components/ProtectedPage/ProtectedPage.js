import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getBudgetTypes } from '../../actions/budgetTypeAction';
import { getAllBudgets } from '../../actions/budgetAction';
const ProtectedPage = ({ isLoggedIn, children, setShowMessage, setError, dispatch, ...rest }) => {
  const formatDate = (dateObj) => {
    return dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
  }

  useEffect(() => {
    try {
      const endDate = formatDate(new Date()), startDate = formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
      dispatch(getAllBudgets(startDate, endDate));
      dispatch(getBudgetTypes());
    } catch (error) {
      setShowMessage(true);
      setError("Failed to fetch Budget types");
    }
  }, [])
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