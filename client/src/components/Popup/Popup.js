import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiGrid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {actions} from '../../actions/index';
import {refresh} from '../../actions/authAction'

const Popup = (props) => (
  <Dialog open={props.open} onClose={props.close} 
  aria-labelledby="Continue Login Session"
  aria-describedby="Click Refresh to continue to log in, press cancel of leave it, it'll logout automatically due to inactivity">
    <DialogTitle id="form-dialog-title">Continue Login Session</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <p>Session is about to end, Do you wish to continue?</p>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.close} color="primary">
        Cancel
      </Button>
      <Button onClick={props.refreshToken} color="primary">
        Continue session
      </Button>
    </DialogActions>
  </Dialog>
);
const mapStateToProps = (state) => {
  return {
    open: state.auth.popup
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch({type: actions.closePopup})
    },
    refreshToken: () => {
      dispatch(refresh())
      dispatch({type: actions.closePopup})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Popup);