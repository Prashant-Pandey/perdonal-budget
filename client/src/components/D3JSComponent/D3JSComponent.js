import React from 'react';
import * as d3 from 'd3';
import './D3JSComponent.scss';

export default class D3JSComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			d3JSData: []
		}
		this.chartRef = React.createRef();
		this.createD3Chart = this.createD3Chart.bind(this);
		this.setD3JSData = this.setD3JSData.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (this.state !== {}&&this.state.d3JSData.length === 0) {
			this.setD3JSData(newProps.budgets);
		}
	}

	async setD3JSData(budgets) {
		let d3JSData = this.state.d3JSData;
		for (const budget of budgets) {
			d3JSData.push(
				{ label: budget.title, value: budget.budget, color: `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, 1)` }
			);
		}

		this.setState({
			d3JSData: d3JSData
		});
	}

	async componentWillUpdate() {
		this.createD3Chart();
	}

	createD3Chart() {
		const svg = d3.select(this.chartRef.current);
		const width = +svg.attr("width"),
			height = +svg.attr("height");
		const radius = Math.min(width, height) / 2;
		const mainSvgGrp = svg.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		const pie = d3.pie()
			.sort(null)
			.value((d) => parseInt(d.value));

		const data_ready = pie(this.state.d3JSData);
		const arc = d3.arc()
			.innerRadius(radius * 0.4)
			.outerRadius(radius * 0.8)

		const outerArc = d3.arc()
			.innerRadius(radius * 0.9)
			.outerRadius(radius * 0.9)

		mainSvgGrp.selectAll('.arcs')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('class', 'arcs')
			.attr('fill', d => d.data.color)
			.attr('stroke', 'white')
			.attr('stroke-width', '2px');

		mainSvgGrp.selectAll('.polyline')
			.data(data_ready)
			.enter()
			.append('polyline')
			.attr("stroke", "black")
			.style("fill", "none")
			.attr('class', 'polyline')
			.attr("stroke-width", 1)
			.attr('points', function (d) {
				var posA = arc.centroid(d)
				var posB = outerArc.centroid(d)
				var posC = outerArc.centroid(d);
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
				posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
				return [posA, posB, posC]
			});

		mainSvgGrp
			.selectAll('.text')
			.data(data_ready)
			.enter()
			.append('text')
			.text(d => d.data.label)
			.attr('class', 'text')
			.attr('transform', function (d) {
				var pos = outerArc.centroid(d);
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
				pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
				return 'translate(' + pos + ')';
			})
			.style('text-anchor', function (d) {
				var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
				return (midangle < Math.PI ? 'start' : 'end')
			});
	}

	render() {
		return (
			<>
				<svg ref={this.chartRef} height="300" width="500" />
			</>
		)
	}
}