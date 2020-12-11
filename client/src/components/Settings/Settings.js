import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CRUDBudgetType from '../BudgetType/CRUDBudgetType.jsx';
import { logout, refresh } from "../../actions/authAction"
import { actions } from "../../actions/"
import "./Settings.scss";

function Settings(props) {
  let refreshedOnce = false;

  useEffect(() => {
    let interval;
    if (props.ttl > 0) {
      interval = setInterval(() => {
        if (props.ttl <= 0) {
          clearTimeout(interval);
          props.dispatch(logout())
        }

        props.dispatch({ type: actions.decreaseTTL })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, []);


  useEffect(() => {
    let interval;
    if (props.ttl > 0) {
      interval = setInterval(() => {

        if (props.ttl <= 0) {
          clearTimeout(interval);
          props.dispatch(logout())
        }

        props.dispatch({ type: actions.decreaseTTL })
      }, 1000)
    } else {
      if (!refreshedOnce) {
        props.dispatch(refresh());
        refreshedOnce = true;
      }

    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  });

  return (
    <div className="SettingsPage">
      <h1>Settings</h1>
      <div className="CRUDBudgetType">
        <CRUDBudgetType />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ttl: state.auth.ttl
  }
}


export default connect(mapStateToProps)(Settings);