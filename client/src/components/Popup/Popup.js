import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiGrid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={6}>
            <FormGroup>
              <TextField
                margin="normal"
                name="title"
                label="Title"
                value={row.title || ''}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                name="description"
                label="description"
                value={row.description || ''}
                onChange={onChange}
              />
            </FormGroup>
          </MuiGrid>
        </MuiGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
      </Button>
        <Button onClick={onApplyChanges} color="primary">
          Save
      </Button>
      </DialogActions>
    </Dialog>
  );

export default Popup;