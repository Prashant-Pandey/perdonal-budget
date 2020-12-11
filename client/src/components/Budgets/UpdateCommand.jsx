import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UpdateCommand = (props) => {

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [costError, setCostError] = useState("");


  const handleTitleChange = (e) => {
    // setTitle(e.target.value);
    props.onChange(e);
  };

  const handleDescriptionChange = (e) => {
    props.onChange(e);
  };
  const handleTypeChange = (e) => {
    props.onChange(e);
  };
  const handleCostChange = (e) => {
    const val = e.target.value;
    if (val !== "" && `${val}`.match(/[A-Z,a-z]/)) {
      setCostError("Please enter valid number.");
      return;
    }
    props.onChange(e);
    setCostError("");
  };

  const handleDateChange = (e) => {
    props.onChange(e);
  };

  const submitRowForm = async (e) => {
    props.onApplyChanges();
  };

  const cancelRowForm = (e) => {
    e.preventDefault();
    props.onCancelChanges();
    return false;
  };
  const typesMapping = props.types.map((type) => (
    <MenuItem key={type.name + `${type.goal}`} value={type.name}>
      {type.name}
    </MenuItem>
  ));

  if (props.open && props.types.length === 0) {
    return (
      <Dialog open={props.open} onClose={cancelRowForm}
        aria-labelledby="Create Transaction type before adding any transaction"
        aria-describedby="Please add type of transactions by going to settings">
        <DialogTitle id="form-dialog-title">Create Types before adding transactions</DialogTitle>
        <DialogContent className="addOrChangeElem">
          <p>Please add type of transactions by going to <Link title="Go to settings" to="/settings">settings</Link></p>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={cancelRowForm}
          >
            OKAY
        </Button>
        </DialogActions>
      </Dialog>);
  }

  return (
    <Dialog open={props.open} onClose={cancelRowForm} 
    aria-labelledby="Input Transaction Data"
    aria-describedby="Add or update the transaction data">
      <DialogTitle id="form-dialog-title">Enter Transaction</DialogTitle>
      <DialogContent className="addOrChangeElem">
        <TextField
          error={titleError !== ""}
          type="text"
          label="Title"
          defaultValue={props.row.title}
          name="title"
          onChange={handleTitleChange}
        />
        <TextField
          error={descriptionError !== ""}
          type="text"
          label="Description"
          name="description"
          defaultValue={props.row.description}
          onChange={handleDescriptionChange}
        />
        <FormControl>
          <InputLabel id="typeLabel">Type</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            name="type"
            defaultValue={props.row.type}
            onChange={handleTypeChange}
          >
            {typesMapping}
          </Select>
        </FormControl>
        <TextField
          error={costError !== ""}
          helperText={costError}
          type="number"
          label="Cost"
          name="cost"
          defaultValue={props.row.cost}
          onChange={handleCostChange}
        />
        <TextField
          id="date"
          name="date"
          label="Start Date"
          type="date"
          defaultValue={props.row.date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateChange}
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
