import React from 'react';
import {connect} from 'react-redux';
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
  { series: ['👶 Spending', '🧑 Goal'] },
];

const GoalSpendingChart = props => {
  return (
    <div>
      <h1>Goal Spending Chart</h1>
      <Paper>
        <Chart
          data={props.budgetData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="👶 Cost"
            valueField="cost"
            argumentField="title"
          />
          <BarSeries
            name="🧑 Goal"
            valueField="cost"
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
    budgetData: state.budget.budgets
  }
}

export default connect(mapStateToProps)(GoalSpendingChart);