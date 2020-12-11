import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { connect } from 'react-redux';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import EditPlugin from '../EditPlugin/EditPlugin';
import UpdateCommand from './UpdateCommand.jsx';
import { getBudgetTypes, createBudgetTypes, updateBudgetType, deleteBudgetTypes } from '../../actions/budgetTypeAction'


function CRUDBudgetType(props) {
  const columns = [{ name: 'name', title: 'Name' }, { name: 'goal', title: 'Goal' }];

  useEffect(()=>{
    if(props.budgetTypes.length===0){
      props.dispatch(getBudgetTypes());
    }
  }, [])

  const [showMessage, setShowMessage] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkDuplicateType = (budgetObj) => {
    if (!budgetObj || !budgetObj.name) return true;
    for (const type of props.budgetTypes) {
      if (budgetObj.name === type.name) return true;
    }
    return budgetObj.name === '' || budgetObj.name.trim() === '';
  }

  const isGoalInvalid = (budgetObj) => {
    return !budgetObj || !budgetObj.goal || typeof +budgetObj.goal !== 'number';
  }

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const budgetObj = added[0];
      if (checkDuplicateType(budgetObj) && isGoalInvalid(budgetObj)) {
        showMessageToast('error', 'invalid inputs');
        return false;
      }

      props.dispatch(createBudgetTypes(budgetObj)).then(() => {
        showMessageToast('success', 'Added Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      });
    }
    if (changed) {
      const key = Object.keys(changed)[0];

      if (changed[key].name) {
        if (checkDuplicateType(changed[key])) {
          showMessageToast('error', 'Budget type already exists');
          return false;
        }
      }

      if (changed[key].goal) {
        if (isGoalInvalid(changed[key])) {
          showMessageToast('error', 'Please input valid goal amount');
          return false;
        }
      }
      props.dispatch(updateBudgetType(key, changed[key])).then(() => {
        showMessageToast('success', 'Updated Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      })
    }
    if (deleted) {
      props.dispatch(deleteBudgetTypes(deleted[0])).then(() => {
        showMessageToast('success', 'Deleted Successfully')
      }).catch((e = 'Check your connection') => {
        showMessageToast('error', `${e}`);
      });
    }
  };

  const showMessageToast = (type, txt) => {
    setShowMessage(true);
    if (type === 'error') {
      setError(txt);
      setSuccess('');
    }

    if (type === 'success') {
      setError('');
      setSuccess(txt);
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
          rows={props.budgetTypes}
          columns={columns}
          getRowId={(row) => row._id}>
          <EditingState
            onCommitChanges={commitChanges}
          />
          <Table />
          <TableHeaderRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
          <EditPlugin EditComponent={UpdateCommand} />
        </Grid>
      </Paper>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    budgetTypes: state.types.budgetTypes
  }
}
export default connect(mapStateToProps)(CRUDBudgetType);