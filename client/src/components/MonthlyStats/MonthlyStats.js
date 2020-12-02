import React, { useEffect } from 'react';
import { getBudgetBetweenDates } from '../../actions/budgetAction';
import DateRangeBudget from '../DateRangeBudget/DateRangeBudget';
import './MonthlyStats.scss';
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux';

function MonthlyStats(props) {

  const getBugetData = (startDate, endDate) => {
    const start = (new Date(startDate)).toISOString().split('T')[0];
    const end = (new Date(endDate)).toISOString().split('T')[0];
    props.dispatch(getBudgetBetweenDates(start, end));
  }

  useEffect(() => {
    const endDate = Date.now(), startDate = endDate - 30 * 24 * 60 * 60 * 1000;
    getBugetData(startDate, endDate)
  }, []);

  return (
    <div className="monthly-stats">
      <div className="chart">
        {(props.budgetData && props.budgetData.length !== 0) ? (<DateRangeBudget budgets={props.budgetData} />) : (<span className="no-data-available">No information available</span>)}
      </div>
      <form noValidate onSubmit={(e)=>{e.preventDefault(); 
        getBugetData(e.target.startDate.value, e.target.endDate.value); 
        return false;}} className="startDate-endDate-container">
        <TextField
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          defaultValue={
            (new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="endDate"
          name="endDate"
          label="End Date"
          type="date"
          defaultValue={(new Date(Date.now())).toISOString().split('T')[0]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="secondary"> Submit </Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    budgetData: state.budget.budgetData
  }
}

export default connect(mapStateToProps)(MonthlyStats);