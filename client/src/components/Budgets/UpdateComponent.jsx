import { Button, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, {useState} from "react";

const UpdateCommand = (props) => {
  console.log(props);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // { name: 'title', title: 'Title' },
  //   { name: 'description', title: 'Description' },
  //   { name: 'type', title: 'Type' },
  //   { name: 'cost', title: 'Cost' },
  //   { name: 'date', title: 'Date' }
  return (
    <div>
      <TextField error={true} type="text" label="Title" name="title" />
      <TextField error={true} type="text" label="Title" name="title" />
      <TextField error={true} type="text" label="Title" name="title" />
      <TextField error={true} type="text" label="Title" name="title" />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default UpdateCommand;
