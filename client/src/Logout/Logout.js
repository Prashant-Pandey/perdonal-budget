import Axios from 'axios';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const Logout = () => {
  this.props.logout()
  return (
    <Redirect to="/" />
  );
};

function mapStateToProps(state){
  return {
    isLoggedIn: state.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () =>{
      dispatch({type:'CHANGE_LOGIN_STATUS', isLoggedIn: false});
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);