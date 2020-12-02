import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './ChartJSComponent.scss';
export default function ChartJSComponent({ budgets }) {
	let chartJSData = {
		datasets: [{
			data: [],
			backgroundColor: []
		}],
		labels: []
	};

	for (const budget of budgets) {
		chartJSData.labels.push(budget['title']);
		chartJSData.datasets[0].backgroundColor.push(`rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`);
		chartJSData.datasets[0].data.push(+budget['cost']);
	}


	return (
		<Doughnut data={chartJSData} height={300} width={500} />
	)
}