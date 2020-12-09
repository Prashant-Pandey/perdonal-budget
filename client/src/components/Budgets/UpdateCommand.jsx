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
import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

const UpdateCommand = (props) => {
  // console.log(props.row);
  // const [title, setTitle] = useState(props.row.title || "");
  // const [description, setDescription] = useState(props.row.description || "");
  // const [type, setType] = useState(props.row.type || "");
  // const [cost, setCost] = useState(props.row.cost || "");
  // const [date, setDate] = useState(
  //   props.row.date || new Date(Date.now()).toISOString().split("T")[0]
  // );

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [costError, setCostError] = useState("");

  // const setAllValues = async () =>{
  //   props.onChange({target:{name:'title', value:title}});
  //   props.onChange({target:{name:'description', value:description}});
  //   props.onChange({target:{name:'type', value:type}});
  //   props.onChange({target:{name:'cost', value:cost}});
  //   props.onChange({target:{name:'date', value:date}});
  // };
  
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
    if (val != "" && `${val}`.match(/[A-Z,a-z]/)) {
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
