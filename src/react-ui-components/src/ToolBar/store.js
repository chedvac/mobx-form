import { action, observable } from "mobx";
import ComplexType from 'core/complexType';
import modelProp from 'core/modelProp';

class ToolBarStore extends ComplexType {

    constructor() {
        super();
        this.open = false;
    };
    @observable
    open;

    @action
    handleDrawerClose = () => {
        this.open = false;
    };
    @action
    handleDrawerOpen = () => {
        this.open = true;
    };
}

export default ToolBarStore;