import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Theme from "../../commons/Theme";
import Menu from '../Menu/Menu';
import Hero from '../Hero/Hero';
import HomePage from '../HomePage/HomePage';
import Footer from '../Footer/Footer';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import DashboardPage from "../DashboardPage/DashboardPage";
import Settings from "../Settings/Settings";
import ProtectedPage from '../ProtectedPage/ProtectedPage';

import Timer from '../Timer/Timer';
import { actions } from '../../actions';

function App(props) {

  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // get budget types action

  }, []);


  const dismissMessage = () => {
    setShowMessage(false);
    setError('');
  };

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <header>
          <Menu />
        </header>
        <main className="container center" id="main-container" role="main">
          <Snackbar
            open={props.message !== ''} autoHideDuration={600}>
            <MuiAlert elevation={10}
              autohideduration={6000} severity={props.isError ? 'error' : props.isSuccess ? 'success' : 'warning'}>
              <div>
                {props.message}
                <IconButton size="small" aria-label="close" color="inherit" onClick={props.clearMessage}>
                  <Close fontSize="small" />
                </IconButton>
              </div>
            </MuiAlert>
          </Snackbar>

          <Switch>
            <Route path="/about">
              <Hero />
              <AboutPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/dashboard" >
              <ProtectedPage setShowMessage={setShowMessage} setError={setShowMessage}>
                <DashboardPage />
              </ProtectedPage>
            </Route>
            <Route path="/settings" >
              <ProtectedPage setShowMessage={setShowMessage} setError={setShowMessage}>
                <Settings />
              </ProtectedPage>
            </Route>
            <Route path="/">
              <Hero />
              <HomePage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </ThemeProvider>
    </Router >
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.msg.message,
    isError: state.msg.error,
    isSuccess: state.msg.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => {
      dispatch(actions.clearMessage)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
