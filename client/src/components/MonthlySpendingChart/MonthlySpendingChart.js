import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Tooltip,
  Legend,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import { HoverState, EventTracker } from '@devexpress/dx-react-chart';

const MonthlySpendingChart = props => {
  return (
      <Paper>
        <Chart
          data={props.budgets}>
          <PieSeries
            valueField="cost"
            argumentField="title"
          />

          <EventTracker />
          <HoverState />
          <Tooltip />

          <Legend />
          <Title text="Monthly Spending Chart" />

        </Chart>
      </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    budgets: state.budget.budgets
  }
}
export default connect(mapStateToProps)(MonthlySpendingChart);