import React, { Component } from 'react';
import MonthlyStats from '../MonthlyStats/MonthlyStats';
import './DashboardPage.scss';
import CreateBudget from '../CreateBudget/CreateBudget';
import { connect } from 'react-redux';

class DashboardPage extends Component {
	render() {
		return (
			<div className="DashboardPage">
				<h1>Dashboard</h1>
				<div className="stats-area">
					<MonthlyStats />
				</div>
				<div className="data-input-area">
					<CreateBudget />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		budgetData: state.budget.budgetData
	}
}

export default connect(mapStateToProps)(DashboardPage);