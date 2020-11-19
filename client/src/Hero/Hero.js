import React, { Component } from 'react';
import './Hero.scss';
import {Link} from 'react-router-dom'

export default class Hero extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="hero" itemScope itemType="https://schema.org/Product" role="heading">
				<h1 itemProp="name"><Link to='/'>Gain Total Control of Your Money</Link></h1>
				<h2 itemProp="description">Stop living paycheck-to-paycheck, get out of debt, and save more money.</h2>
			</section>
		)
	}
}