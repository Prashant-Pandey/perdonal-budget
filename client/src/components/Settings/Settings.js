import React from 'react';
import {connect} from 'react-redux';
import CRUDBudgetType from '../BudgetType/CRUDBudgetType';

function Settings(props) {
  return (
    <div>
      <h1>Settings</h1>
      <CRUDBudgetType />
    </div>
  );
}


export default connect()(Settings);