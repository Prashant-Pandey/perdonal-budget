import React from "react";
import {
  Plugin,
  Getter,
  Template,
  TemplateConnector,
} from "@devexpress/dx-react-core";
const pluginDependencies = [{ name: "TableEditRow" }];

class EditPlugin extends React.PureComponent {
  render() {
    return (
      <Plugin dependencies={pluginDependencies} name="TableEditRow">
        <Template name="TableEditRow">
          <TemplateConnector>
            {(
              {
                rows,
                getRowId,
                addedRows,
                editingRowIds,
                createRowChange,
                rowChanges,
              },
              {
                changeRow,
                changeAddedRow,
                commitChangedRows,
                commitAddedRows,
                stopEditRows,
                cancelAddedRows,
                cancelChangedRows,
              }
            ) => {}}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export default EditPlugin;
