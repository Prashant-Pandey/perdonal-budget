import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  EditingState, PagingState, IntegratedPaging, SortingState,
  IntegratedSorting,
  TableInlineCellEditing
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import { connect } from 'react-redux';
import { Snackbar, IconButton, Button, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { createBudget, deleteBudget, updateBudget } from '../../actions/budgetAction';
import { setMessage } from '../../actions/messageAction'


function CRUDBudgets(props) {
  const columns = [
    { name: 'title', title: 'Title' },
    { name: 'description', title: 'Description' },
    { name: 'type', title: 'Type' },
    { name: 'cost', title: 'Cost' },
    { name: 'date', title: 'Date' }
  ];


  const [showMessage, setShowMessage] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateString = (str) => {
    return !str || typeof str !== 'string' || str === '' || str.trim() === '';
  }

  const validateCost = (cost) => {
    return !cost || typeof +cost !== 'number' || cost < 0;
  }

  const validateDate = (date) => {
    const tmp = new Date(date);
    return !tmp || tmp == 'Invalid Date' || tmp === new Date(0, 0, 0, 0);
  }

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const budgetData = added[0];
      if (validateString(budgetData.title) || validateString(budgetData.description) || validateCost(budgetData.cost) || validateDate(budgetData.date)) {
        showMessageToast('error', 'Please validate inputs');
        return false;
      }
      props.dispatch(createBudget(budgetData)).then(() => {
        showMessageToast('success', 'Added Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      });
    }
    if (changed) {
      const key = Object.keys(changed)[0];
      const budgetData = changed[key];
      if (!budgetData) {
        return false;
      }
      if (budgetData.title && validateString(budgetData.title)) {
        showMessageToast('error', 'Please Validate Title');
        return false;
      }
      if (budgetData.description && validateString(budgetData.description)) {
        showMessageToast('error', 'Please Validate Description');
        return false;
      }
      if (budgetData.cost && validateCost(budgetData.cost)) {
        showMessageToast('error', 'Please Validate Cost');
        return false;
      }
      if (budgetData.date && validateDate(budgetData.date)) {
        showMessageToast('error', 'Please Validate the date');
        return false;
      }

      props.dispatch(updateBudget(key, budgetData)).then(() => {
        showMessageToast('success', 'Updated Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      });
    }
    if (deleted) {
      props.dispatch(deleteBudget(deleted[0])).then(() => {
        showMessageToast('success', 'Deleted Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      });
    }
  };

  const showMessageToast = (type, txt) => {
    if (type === 'error') {
      props.dispatch(setMessage({
        message: txt,
        error: true
      }))
    }

    if (type === 'success') {
      props.dispatch(setMessage({
        message: txt,
        success: true
      }))
    }
  }

  const dismissMessage = () => {
    setShowMessage(false);
    setError('');
    setSuccess('');
  };

  return (
    <>
      <Snackbar
        open={showMessage} autoHideDuration={600}>
        <MuiAlert elevation={10}
          autohideduration={6000} severity={error !== '' ? 'error' : 'success'}>
          <div>
            {error !== '' ? error : success}
            <IconButton size="small" aria-label="close" color="inherit" onClick={dismissMessage}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        </MuiAlert>
      </Snackbar>
      <Paper>
        <Grid
          rows={props.budgets}
          columns={columns}
          getRowId={(row) => row._id}>
          <EditingState onCommitChanges={commitChanges} />
          <PagingState defaultPageSize={10} />
          <IntegratedPaging />
          <SortingState
            defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
          <PagingPanel />
        </Grid>
      </Paper>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    budgets: state.budget.budgets
  }
}
export default connect(mapStateToProps)(CRUDBudgets);