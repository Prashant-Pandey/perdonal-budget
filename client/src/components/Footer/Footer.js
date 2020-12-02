import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer className="bottom">
				<div className="center" aria-label="Copyright">
					All rights reserved &copy; Prashant Pandey
        </div>
			</footer>
		)
	}
}