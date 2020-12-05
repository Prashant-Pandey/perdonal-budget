import React, { Component } from 'react';
import { connect } from "react-redux";
import './Menu.scss';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/authAction';

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
				<a href="#main-container" className="hidden-visibility">Skip to main content</a>
				<nav className="menu" role="navigation"
					aria-label="Main menu">
					<ul>
						<li><Link to="/" >Home</Link></li>
						<li><Link to="/about">About</Link></li>
						{!this.props.isLoggedIn && <li><Link to="/login">Login</Link></li>}
						{!this.props.isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
						{this.props.isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
						{this.props.isLoggedIn && <li><Link to="/settings">Settings</Link></li>}
						{this.props.isLoggedIn && <li><button className="logoutButton" onClick={(e) => {
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
		isLoggedIn: state.auth.isLoggedIn
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