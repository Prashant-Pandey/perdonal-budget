import React, { useState } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from 'react-redux';
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
import ProtectedPage from '../ProtectedPage/ProtectedPage';

function App() {

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <header>
          <Menu />
        </header>
        <main className="container center" id="main-container" role="main">
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
              <ProtectedPage>
                <DashboardPage />
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

export default App;
