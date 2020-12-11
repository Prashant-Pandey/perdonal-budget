import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";

const UpdateCommand = (props) => {
  const [nameError, setNameError] = useState("");
  const [goalError, setGoalError] = useState("");

  const handleNameChange = (e) => {
    props.onChange(e);
  };

  const handleGoalChange = (e) => {
    const val = e.target.value;
    if (val != "" && `${val}`.match(/[A-Z,a-z]/)) {
      setGoalError("Please enter valid number.");
      return;
    }
    props.onChange(e);
    setGoalError("");
  };

  const submitRowForm = async (e) => {
    props.onApplyChanges();
  };

  const cancelRowForm = (e) => {
    e.preventDefault();
    props.onCancelChanges();
    return false;
  };

  if (!props.open) {
    return ('');
  }

  return (
    <Dialog open={props.open} onClose={cancelRowForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent className="addOrChangeElem">
        <TextField
          error={nameError !== ""}
          type="text"
          label="Name"
          defaultValue={props.row.name}
          name="name"
          onChange={handleNameChange}
        />
        <TextField
          error={goalError !== ""}
          helperText={goalError}
          type="number"
          label="Goal"
          name="goal"
          defaultValue={props.row.goal}
          onChange={handleGoalChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={cancelRowForm}
        >
          Cancel
          </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitRowForm}
        >
          {props.row.title ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

const mapStateToProps = (state) => {
  return {
    types: state.types.budgetTypes,
  };
};

export default connect(mapStateToProps)(UpdateCommand);
