import { action, observable } from "mobx";
import toolbarButtons from 'govil-common-content/forms-components/src/toolbarButtons'

class toolbarButtonsStore {

    constructor(toolbarButtons) {
        Object.entries(toolbarButtons).map((toolbarButton) => {
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

export default new toolbarButtonsStore(toolbarButtons);