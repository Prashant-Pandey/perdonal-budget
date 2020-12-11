import React, { useEffect, useRef } from 'react';
import CRUDBudgets from '../Budgets/CRUDBudgets.jsx';
import './DashboardPage.scss';
import { connect } from 'react-redux';
import { getBudgetTypes } from '../../actions/budgetTypeAction';
import { getAllBudgets } from '../../actions/budgetAction';
import GoalSpendingChart from "../GoalSpendingChart/GoalSpendingChart";
import MonthlySpendingChart from "../MonthlySpendingChart/MonthlySpendingChart";
import { actions } from '../../actions';
import { logout, refresh } from "../../actions/authAction"

function DashboardPage(props) {
	let refreshedOnce = false;
	const formatDate = (dateObj) => {
		return dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
	}

	useEffect(() => {
		const endDate = formatDate(new Date()), startDate = formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
		props.dispatch(getAllBudgets(startDate, endDate));
		props.dispatch(getBudgetTypes());
		let interval;
		if (props.ttl > 0) {
			interval = setInterval(() => {
				if (props.ttl <= 0) {
					clearTimeout(interval);
					props.dispatch(logout())
				}

				props.dispatch({ type: actions.decreaseTTL })
			}, 1000)
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		}
	}, [])

	useEffect(() => {
		let interval;
		if (props.ttl > 0 ) {
			interval = setInterval(() => {

				if (props.ttl <= 0) {
					clearTimeout(interval);
					props.dispatch(logout())
				}

				props.dispatch({ type: actions.decreaseTTL })
			}, 1000)
		}else{
			if(!refreshedOnce){
				props.dispatch(refresh());
				refreshedOnce = true;
			}
			
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		}
	});

	return (
		<div className="DashboardPage">
			<h1>Dashboard</h1>
			<div className="monthly-stats">
				<GoalSpendingChart />
				<MonthlySpendingChart />
			</div>
			<div className="transactions-area">
				<CRUDBudgets />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		budgetData: state.budget.budgetData,
		ttl: state.auth.ttl
	}
}

export default connect(mapStateToProps)(DashboardPage);