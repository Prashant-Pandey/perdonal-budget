import React, { Component } from 'react';
import { connect } from "react-redux";
import './Menu.scss';
import { Link, Route } from 'react-router-dom'

class Menu extends Component {
	render() {
		console.log(this.props)
		return (
			<React.Fragment>
				<a href="#main-container" className="hidden-visibility">Skip to main content</a>
				<nav className="menu" role="navigation"
					aria-label="Main menu">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/logout">Logout</Link></li>
					</ul>
				</nav>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) =>{
  return{
    isLoggedIn: state.isLoggedIn
  }
}


export default connect(mapStateToProps)(Menu);