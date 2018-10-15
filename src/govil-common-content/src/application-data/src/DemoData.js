import { action, observable, computed } from 'mobx';

export class examples {

    @observable obsVal = false;

    @action.bound
    set_obsVal() {
        this.obsVal = !this.obsVal;
    }

}

export default new examples();