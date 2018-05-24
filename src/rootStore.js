import PersonalInformation from './components/PersonalInformation/store';

import {toJS} from 'mobx'

export default  class RootStore {
    constructor() {
        this.store={
          userDetails : new PersonalInformation()
        }
      console.log(this.model)
    }
    getStoreAsJSon=()=>{
        return toJS(this.model.getModel())
    }
}