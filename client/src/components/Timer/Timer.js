import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
// import { logout } from '../../actions/authAction';

class Timer extends React.Component {
  
  render() {
    return (
      <span>Timer: {this.props.ttl}</span>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ttl: state.auth.ttl
  }
}

export default connect(mapStateToProps)(Timer);