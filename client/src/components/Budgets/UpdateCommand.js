import { Button } from '@material-ui/core';
import React from 'react';

const UpdateCommand = ({
  onChange
}) => {
  return (
    <div>
      <Button id="Edit" onClick={onChange} title="Edit" centerRipple >Edit</Button>
      <Button id="Delete" title="Delete" centerRipple>Delete</Button>
    </div>
  );
};

export default UpdateCommand;