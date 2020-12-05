import React, { Component } from 'react';
import CRUDBudgets from '../Budgets/CRUDBudgets';
import './DashboardPage.scss';
import { connect } from 'react-redux';

class DashboardPage extends Component {
	render() {
		return (
			<div className="DashboardPage">
				<h1>Dashboard</h1>
				<div className="stats-area">
					<CRUDBudgets />
				</div>
				{/* <CreateBudget/> */}
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