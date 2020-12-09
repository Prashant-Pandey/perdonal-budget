import React from "react";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import UpdateCommand from './UpdateCommand.jsx';
const pluginDependencies = [{ name: "TableEditColumn" }];

class EditPlugin extends React.PureComponent {
  render() {
    return (
      <Plugin dependencies={pluginDependencies}>
        <Template name="editRow">
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
            ) => {
              const isNew = addedRows.length > 0;
              let editedRow;
              let rowId;
              if (isNew) {
                rowId = 0;
                editedRow = addedRows[rowId];
              } else {
                [rowId] = editingRowIds;
                const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
                editedRow = { ...targetRow, ...rowChanges[rowId] };
              }

              const processValueChange = ({ target: { name, value } }) => {
                const changeArgs = {
                  rowId,
                  change: createRowChange(editedRow, value, name),
                };
                if (isNew) {
                  changeAddedRow(changeArgs);
                } else {
                  changeRow(changeArgs);
                }
              };
              const rowIds = isNew ? [0] : editingRowIds;
              const applyChanges = () => {
                if (isNew) {
                  commitAddedRows({rowIds});
                } else {
                  stopEditRows({ rowIds });
                  commitChangedRows({ rowIds });
                }
              };
              const cancelChanges = () => {
                if (isNew) {
                  cancelAddedRows({ rowIds });
                } else {
                  stopEditRows({ rowIds });
                  cancelChangedRows({ rowIds });
                }
              };

              const open = editingRowIds.length > 0 || isNew;

              return (
                <UpdateCommand
                  open={open}
                  row={editedRow}
                  onChange={processValueChange}
                  onApplyChanges={applyChanges}
                  onCancelChanges={cancelChanges}
                />
              )
            }}
          </TemplateConnector>
        </Template>
        <Template name="root">
          <TemplatePlaceholder />
          <TemplatePlaceholder name="editRow" />
        </Template>
      </Plugin>
    );
  }
}

export default EditPlugin;
