import React, { Component } from 'react';
import './HomePage.scss';

export default class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			budgets: []
		}
	}

	render() {
		return (
			<div className="HomePage">
				<section className="homePageSection1">
					<h1>
						The Budgeting App That Changes Lives
					</h1>
					<p>
						Cliché and over-dramatic? Normally, we might agree with you, but this is the kind of feedback we hear from our customers every day.
					</p>
				</section>
				<section className="homePageSection2">
					<h1>
						You Need A Budget is different from anything you’ve tried before.
					</h1>
					<p>
						We won’t promise you it will be effortless. We aren’t interested in helping you “trick” yourself into saving. We will never try to dictate how or where you should spend your money.

						Instead, YNAB will teach you how to prioritize and plan, so you have money for the things that are most important to you—whatever they are.
					</p>
				</section>
			</div>
		)
	}
}