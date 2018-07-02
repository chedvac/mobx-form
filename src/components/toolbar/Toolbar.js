import React from "react";
import ToolbarAction from "./ToolbarAction";
import actionsSettings from "./actionsSettings";
import actionsDefaultState from "./actionsDefaultState";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
@observer
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const toolbarButtons = Object.assign(
      {},
      actionsDefaultState,
      this.props.avaliableActions
    );

    return (
      <div className="toolbar-menue">
        <ul className="actions-list">
          {actionsSettings.map(
            (action, index) => (
              //if(toolbarButtons[action.name] === true){
              <ToolbarAction key={index} actionSettings={action} />
            )
            //}
          )}
        </ul>
      </div>
    );
  }
}

export default Toolbar;
