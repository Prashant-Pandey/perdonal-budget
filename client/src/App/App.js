import React from 'react';
import Menu from '../Menu/Menu';
import Hero from '../Hero/Hero';
import HomePage from '../HomePage/HomePage';
import Footer from '../Footer/Footer';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from "../DashboardPage/DashboardPage";

function App() {
  return (
    <Router>
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
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/">
            <Hero />
            <HomePage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
