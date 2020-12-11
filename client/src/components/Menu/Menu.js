import React, { Component } from 'react';
import { connect } from "react-redux";
import './Menu.scss';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import Timer from '../Timer/Timer';

class Menu extends Component {
	logout = () => {
		this.props.logout();
		return (
			<Redirect to="/" />
		);
	}
	render() {
		return (
			<React.Fragment>
				<a href="#main-container" className="skip-to-main-content">Skip to main content</a>
				<nav className="menu" role="navigation"
					aria-label="Main menu">
					<ul>
						<li><Timer /></li>
						<li><Link to="/" title="Budget App Home">Home</Link></li>
						<li><Link to="/about" title="About Budget App">About</Link></li>
						{!this.props.isLoggedIn && <li><Link to="/login" title="Login">Login</Link></li>}
						{!this.props.isLoggedIn && <li><Link to="/signup" title="Signup">Signup</Link></li>}
						{this.props.isLoggedIn && <li><Link to="/dashboard" title="Dashboard">Dashboard</Link></li>}
						{this.props.isLoggedIn && <li><Link to="/settings" title="Settings">Settings</Link></li>}
						{this.props.isLoggedIn && <li><button className="logoutButton" title="Login" onClick={(e) => {
							e.preventDefault();
							this.logout();
							return false;
						}}>Logout</button></li>}
					</ul>
				</nav>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		ttl: state.auth.ttl
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			dispatch(logout());
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);