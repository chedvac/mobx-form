import PersonalInformation from "./containers/PersonalInformation/store";
class SimpleFieldsTab {
    constructor(){
        this.model={
            userDetails: new PersonalInformation()
        }
    }
}

export default SimpleFieldsTab;


