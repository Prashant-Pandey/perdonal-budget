import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function DateRangeBudget({ budgets }) {

	const columns = [
		{ key: '_id', hide: true},
		{ key: 'title', name: 'Title' },
		{ key: 'description', name: 'Description' },
		{ key: 'cost', name: 'Cost' },
		{ key: 'date', name: 'Date' }
	];
	// console.log(budgets);
	// let chartJSData = {
	// 	datasets: [{
	// 		data: [],
	// 		backgroundColor: []
	// 	}],
	// 	labels: []
	// };
	// for (const budget of budgets) {
	// 	chartJSData.labels.push(budget['title']);
	// 	chartJSData.datasets[0].backgroundColor.push(`rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`);
	// 	chartJSData.datasets[0].data.push(+budget['cost']);
	// }

	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align="right">Type</TableCell>
						<TableCell align="right">Description</TableCell>
						<TableCell align="right">Cost</TableCell>
						<TableCell align="right">Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{budgets.map((budget) => (
						<TableRow key={budget._id}>
							<TableCell component="th" scope="row">
								{budget.title}
							</TableCell>
							<TableCell align="right">{budget.type}</TableCell>
							<TableCell align="right">{budget.description}</TableCell>
							<TableCell align="right">{budget.cost}</TableCell>
							<TableCell align="right">{budget.date.split('T')[0]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}