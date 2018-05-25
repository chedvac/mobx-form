import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import LanguageStore from '../components/language/store'
import { types } from "mobx-state-tree";


import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/store'
//./components/PersonalInformation/store';
import {toJS} from 'mobx'

export default  class RootStore {
    constructor() {
        this.store={
            simpleFieldsTab: new PersonalInformation(),
            tablesTab: new TablesTab(),
            formlanguage: new LanguageStore()
        }
        console.log(this.model)
        
    }
    getStoreAsJSon=()=>{
        return toJS(this.model.getModel())
    }

}

