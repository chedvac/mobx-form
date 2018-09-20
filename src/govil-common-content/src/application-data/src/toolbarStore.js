import { action, observable } from 'mobx';
import { toolbarButtonsNames } from 'govil-common-content/forms-components/src/toolbarButtons'

class toolbarButtonsStore {

    constructor(toolbarButtonsNames) {
        Object.entries(toolbarButtonsNames).map((toolbarButton) => {
            const toolbarButtonName = toolbarButton[0];
            this.toolbarButtonsList[toolbarButtonName] = true;
        })
    }

    @observable toolbarButtonsList = {};

    @action
    changeToolbarButtonState = (toolbarButtonName, newState) => {
        this.toolbarButtonsList[toolbarButtonName] = newState;
    };
}

export default new toolbarButtonsStore(toolbarButtonsNames);