import React, { Component } from 'react';
import { createBudgetTypes } from '../../actions/budgetTypeAction'
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

class CreateBudgetType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			budgetType: ''
		}
	}
	createBudgetType = (e) => {
		// budget Type
		const budgetType = {
			'name': e.target.budget_type.value,
		};
		this.props.budgetTypes.forEach((val) => {
			if (val.name === budgetType.name) {
				this.setState({
					invalid_type: true,
					error: "Budget type already exists, try different name"
				});
				return;
			}
		})

		if (budgetType.name === '' || !budgetType.name) {
			this.setState({
				invalid_type: true,
				error: "Budget type already exists, try different name"
			});
			return;
		}
		e.target.budget_type.value = '';
		this.props.dispatch(createBudgetTypes(budgetType)).then(() => {
			this.setState({
				...this.state,
				invalid_type: false,
				error: ''
			});
			
		}).catch(() => {
			this.setState({ ...this.state, invalid_type: true, error: "Budget type already exists, try different name" });
		});
	}
	render() {
		return (
			<div className="CreateBudgetTypes">
				<h4>Add Budget Category</h4>
				<form id="budget-form" onSubmit={async (e) => {
					e.preventDefault();
					await this.createBudgetType(e);
					return false;
				}} noValidate autoComplete="on">
					<TextField
						error={this.state.invalid_type}
						helperText={this.state.error}
						type="text"
						label="Category Name"
						name="budget_type"
					/>
					<Button type="submit" variant="contained" color="primary"> Add </Button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		budgetTypes: state.types.budgetTypes
	}
}

export default connect(mapStateToProps)(CreateBudgetType);