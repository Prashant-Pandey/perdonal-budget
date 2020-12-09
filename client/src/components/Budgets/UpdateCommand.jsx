import {
  Button,
  TextField,
  ButtonGroup,
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

const UpdateCommand = (props) => {
  // console.log(props);
  const [title, setTitle] = useState(props.row.title || "");
  const [description, setDescription] = useState(props.row.description || "");
  const [type, setType] = useState(props.row.type || "");
  const [cost, setCost] = useState(props.row.cost || "");
  const [date, setDate] = useState(
    props.row.date || new Date(Date.now()).toISOString().split("T")[0]
  );

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [costError, setCostError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleCostChange = (e) => {
    const val = e.target.value;
    if (val != "" && `${val}`.match(/[A-Z,a-z]/)) {
      setCostError("Please enter valid number.");
      return;
    }
    setCost(val);
    setCostError("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const submitRowForm = (e) => {
    // e.preventDefaukt
    if (title === '' || type === '' || cost === '') {
      setTitleError(title === '' ? 'Title cannot be empty' : '');
      // setDescriptionError(description===''?'Description cannot be empty')
      setCostError(cost === '' ? 'Transaction must involve a cost' : '');
      return;
    }

    props.onApplyChanges({ title, description, cost, type, date }, true);

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

  if (!props.open) {
    return ('');
  }

  const defaultSelectValue = props.types[0].name;
  // console.log(defaultSelectValue);
  {/* <h1>Please Create Budget Type before creating budget</h1> */ }
  return (
    <Dialog open={props.open} onClose={cancelRowForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
      <DialogContent className="addOrChangeElem">
        <TextField
          error={titleError !== ""}
          type="text"
          label="Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          error={descriptionError !== ""}
          type="text"
          label="Description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl>
          <InputLabel id="typeLabel">Type</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            value={type}
            defaultValue={defaultSelectValue}
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
          value={cost}
          onChange={handleCostChange}
        />
        <TextField
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          defaultValue={date}
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
          onClick={props.onApplyChanges}
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
