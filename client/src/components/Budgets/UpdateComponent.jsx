import {
  Button,
  TextField,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { Plugin, Template } from "@devexpress/dx-react-core";
import { TableEditRow } from "@devexpress/dx-react-grid-material-ui";
import React, { useState } from "react";
import { connect } from "react-redux";

const UpdateCommand = (props) => {
  console.log(props);
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
    console.log(e);
  };

  const cancelRowForm = (e) => {
    // props.cancelChanges();

    return false;
  };

  if (props.types.length == 0) {
    return (
      <tr className="edit-budget-row">
        <td className="edit-row-td">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={cancelRowForm}
          >
            Cancel
          </Button>
        </td>
        <td className="edit-row-cell"></td>
        <td className="edit-row-cell"></td>
        <td className="edit-row-cell">
          <h1>Please Create Budget Type before creating budget</h1>
        </td>
        <td className="edit-row-cell"></td>
        <td className="edit-row-cell"></td>
      </tr>
    );
  }

  const typesMapping = props.types.map((type) => (
    <MenuItem key={type.name + `${type.goal}`} value={type.name}>
      {type.name}
    </MenuItem>
  ));

  // console.log(props);
  return (
    <tr className="edit-budget-row">
      <td className="edit-row-td">
        <ButtonGroup size="small" aria-label="small outlined button group">
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
        </ButtonGroup>
      </td>
      <td className="edit-row-cell">
        <TableEditRow.Cell>
          <TextField
            error={titleError !== ""}
            type="text"
            label="Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </TableEditRow.Cell>
      </td>
      <td className="edit-row-cell">
        <TextField
          error={descriptionError !== ""}
          type="text"
          label="Description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </td>
      <td className="edit-row-cell">
        <FormControl>
          <InputLabel id="typeLabel">Type</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            value={type}
            onChange={handleTypeChange}
          >
            {typesMapping}
          </Select>
        </FormControl>
      </td>
      <td className="edit-row-cell">
        <TextField
          error={costError !== ""}
          helperText={costError}
          type="number"
          label="Cost"
          name="cost"
          value={cost}
          onChange={handleCostChange}
        />
      </td>
      <td className="edit-row-cell">
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
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types.budgetTypes,
  };
};

export default connect(mapStateToProps)(UpdateCommand);
