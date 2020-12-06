import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { HoverState, EventTracker } from '@devexpress/dx-react-chart';

const MonthlySpendingChart = props => {
  return (
    <div>
      <h1>Monthly Spending Chart</h1>
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
          
        </Chart>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    budgets: state.budget.budgets
  }
}
export default connect(mapStateToProps)(MonthlySpendingChart);