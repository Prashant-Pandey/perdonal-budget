import React, { Component } from 'react';
import './Menu.scss';
import {Link} from 'react-router-dom'

export default class Menu extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<a href="#main-container" className="hidden-visibility">Skip to main content</a>
				<nav className="menu" role="navigation"
				aria-label="Main menu">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/login">Login</Link></li>
					</ul>
				</nav>
			</React.Fragment>
		)
	}
}