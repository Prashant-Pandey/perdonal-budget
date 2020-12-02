import React, { Component } from 'react';
import './AboutPage.scss';

export default class AboutPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="AboutPage page-area" role="presentation">
				<div>
					<div className="page-row">
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Stay on track</h1>
							<p itemProp="value">
								Do you know where you are spending your money? If you really stop to track it down,
								you would get surprised! Proper budget management depends on real data... and this
								app will help you with that!
					</p>
						</article>
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Alerts</h1>
							<p itemProp="value">
								What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
					</p>
						</article>
					</div>
					<div className="page-row">
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Results</h1>
							<p itemProp="value">
								People who stick to a financial plan, budgeting every expense, get out of debt faster!
								Also, they to live happier lives... since they expend without guilt or fear...
								because they know it is all good and accounted for.
					</p>
						</article>
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Free</h1>
							<p itemProp="value">
								This app is free!!! And you are the only one holding your data!
					</p>
						</article>
					</div>
					<div className="page-row">
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Stay on track</h1>
							<p itemProp="value">
								Do you know where you are spending your money? If you really stop to track it down,
								you would get surprised! Proper budget management depends on real data... and this
								app will help you with that!
					</p>
						</article>
						<article className="text-box" itemProp="additionalProperty" itemScope
							itemType="https://schema.org/PropertyValue">
							<h1 itemProp="name">Alerts</h1>
							<p itemProp="value">
								What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
					</p>
						</article>
					</div>

				</div>
			</div>
		)
	}
}