import React, { Component } from 'react';
import { createBudget as create } from '../../actions/budgetAction'
import { Button, TextField } from '@material-ui/core';
import './CreateBudget.scss';
import { connect } from 'react-redux';

class CreateBudget extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {
	}

	createBudget = (e) => {
		// login attempt
		const budgetData = {
			'title': e.target.title.value,
			'type': e.target.type.value,
			'description': e.target.description.value,
			'cost': e.target.cost.value,
			'date': e.target.date.value
		};
		if (budgetData.title === '' || budgetData.type === '' || budgetData.cost === '' || budgetData.date === '') {
			this.setState({
				title: budgetData.title === '',
				type: budgetData.type === '',
				cost: budgetData.cost === '',
				date: budgetData.date === ''
			});
			return;
		}
		e.target.title.value = '';
		e.target.type.value = '';
		e.target.cost.value = '';
		e.target.date.value = '';
		this.props.dispatch(create(budgetData)).then(() => {
			this.setState({ ...this.state, budgetAdded: true });
		}).catch(() => {
			this.setState({ ...this.state, showError: true });
		});
	}
	render() {
		return (
			<div className="CreateBudget">
				<h4>Add Transactions</h4>
				<form id="budget-form" onSubmit={async (e) => {
					e.preventDefault();
					await this.createBudget(e);
					return false;
				}} noValidate autoComplete="on">
					<TextField
						error={this.state.title}
						type="text"
						label="Title"
						name="title"
					/>
					<TextField
						error={this.state.type}
						type="text"
						label="Type"
						name="type"
					/>
					<TextField
						error={this.state.description}
						type="text"
						label="Description"
						name="description"
					/>
					<TextField
						error={this.state.cost}
						label="Cost in $"
						type="number"
						name="cost"
					/>
					<TextField
						label="Date of Transaction"
						type="date"
						name="date"
						defaultValue={Date.now}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button type="submit" variant="contained" color="primary"> Sign-up </Button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		budgetData: state.budget.budgetData
	}
}

export default connect(mapStateToProps)(CreateBudget);