import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { logout } from '../../actions/authAction';

const Timer = ({ ttl, dispatch }) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (ttl < 20) {
  //       // open
  //     }

  //     if (ttl < -10) {
  //       // logout
  //       // dispatch(logout());
  //     }

  //     dispatch({ type: actions.changeRefresh, payload: ttl - 1 })
  //   }, 1000);
  //   return () => {
  //     clearTimeout(interval)
  //   };
  // })
  return (
    <div>
      Timer: {ttl}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ttl: state.auth.ttl
  }
}

export default connect(mapStateToProps)(Timer);