import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
const stacks = [
  { series: ['Spending', 'Goal'] },
];

const selectBudgetTypeWiseSum = (budgets, types) => {
  const chartData = [];
  const budgetSum = {};
  budgets.forEach(budget => {
    if (budgetSum[budget["type"]]) {
      budgetSum[budget["type"]] += budget["cost"]
    } else {
      budgetSum[budget["type"]] = budget["cost"]
    }
  });

  types.forEach((type) => {
    chartData.push({
      goal: type["goal"],
      spending: budgetSum[type["name"]],
      name: type["name"]
    })
  });

  return chartData;
}

const GoalSpendingChart = ({ budgetTypeWiseSum }) => {
  return (
    <Paper>
      <Chart
        data={budgetTypeWiseSum}
      >
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          name="Spending"
          valueField="spending"
          argumentField="name"
        />
        <BarSeries
          name="Goal"
          valueField="goal"
          argumentField="name"
        />
        <Stack />
        <Title text="Spending Habits" />
        <Legend />
      </Chart>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.types.budgetTypes);
  return {
    budgetTypeWiseSum: selectBudgetTypeWiseSum(state.budget.budgets, state.types.budgetTypes)
  }
}

export default connect(mapStateToProps)(GoalSpendingChart);