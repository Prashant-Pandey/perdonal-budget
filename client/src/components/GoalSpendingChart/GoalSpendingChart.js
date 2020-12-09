import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { Stack } from '@devexpress/dx-react-chart';

const stacks = [
  { series: ['Spending', 'Goal'] },
];

const GoalSpendingChart = props => {
  let budgetData = {}
  if (props.budgets) {
    const types = {};
    props.types.forEach((type) => {
      types[type["name"]] = type["goal"];
    });
    budgetData = props.budgets.forEach((budget) => {
      budget['goal'] = types[budget["type"]];
      return budget;
    });
  }
  return (
    <div>
      <h1>Goal Spending Chart</h1>
      <Paper>
        <Chart
          data={budgetData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Cost"
            valueField="cost"
            argumentField="title"
          />
          <BarSeries
            name="Goal"
            valueField="goal"
            argumentField="title"
          />
          <Stack
            stacks={stacks}
          />
          <Legend />
        </Chart>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    budgets: state.budget.budgets,
    types: state.types.budgetTypes
  }
}

export default connect(mapStateToProps)(GoalSpendingChart);