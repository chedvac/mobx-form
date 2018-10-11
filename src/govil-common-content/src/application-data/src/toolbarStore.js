import { action, observable, computed } from 'mobx';
import { toolbarButtonsNames } from 'govil-common-content/forms-components/src/toolbarButtons'
import fp from 'lodash/fp';
//TODO Toolbar
class ToolbarButtonsStore {

    constructor(toolbarButtonsState = {}) {
        fp.entriesIn(toolbarButtonsNames).map((toolbarButton) => {
            const toolbarButtonName = toolbarButton[0];
            this.toolbarButtonsList[toolbarButtonName] = toolbarButtonsState[toolbarButtonName] !== undefined ? toolbarButtonsState[toolbarButtonName] : true;
        })
    }

    @observable toolbarButtonsList = {};

    @action.bound
    changeToolbarButtonState = (toolbarButtonName, newState) => {
        this.toolbarButtonsList[toolbarButtonName] = newState;
    };
}

export default ToolbarButtonsStore;